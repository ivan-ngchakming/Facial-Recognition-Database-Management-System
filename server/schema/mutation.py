import logging

from ariadne import MutationType, convert_kwargs_to_snake_case

from ..models import Photo, Face, Profile
from ..database import db
from ..utils.dev import runtime
from ..utils.image import decode_img

logger = logging.getLogger(__name__)

mutation = MutationType()



@mutation.field("photo")
def resolve_photo(_, info, rbytes):
    image = decode_img(rbytes)
    image = image.convert('RGB')
    
    with runtime(f"Resolved photo mutation", logger):
        photo = Photo(image)
        db.session.add(photo)
        db.session.commit()
    return photo


@mutation.field("identifyFace")
@convert_kwargs_to_snake_case
def resolve_identify_face(_, info, face_id):
    from ..tasks import face_identify
    logger.debug(f"Starting identify face task")
    task_id = f'face-identify-{face_id}'
    
    task = face_identify.AsyncResult(task_id)
    if task.state == 'SUCCESS':
        logger.debug("Task already succeeded, skipping")
        data = {
        'id': task.id,
        'current': task.info.get('current', 0),
        'total': task.info.get('total', 1),
        'status': task.state,
        'result': task.info.get('result', None)
        }
        return data
    else:
        task = face_identify.apply_async((face_id,), task_id=task_id)
        logger.debug(f"Started task id:{task.id} with state:{task.state}")
        return {
            'id': task.id,
            'current': 0,
            'total': 1,
            'status': task.state,
        }


@mutation.field("assignFaceToProfile")
@convert_kwargs_to_snake_case
def resolve_assign_face_to_profile(_, info, face_id, profile_id):
    logger.debug(f"Appending face id:{face_id} to profile id:{profile_id}")
    face = Face.query.get(face_id)
    profile = Profile.query.get(profile_id)
    
    profile.faces.append(face)
    db.session.commit()

    return face
