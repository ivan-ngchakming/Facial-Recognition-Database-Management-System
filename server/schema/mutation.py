import logging

from ariadne import MutationType

from ..models import Photo, Face
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
def resolve_identify_face(_, info, faceId):
    from ..tasks import face_identify
    logger.debug(f"Starting identify face task")
    task_id = f'face-identify-{faceId}'
    
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
        task = face_identify.apply_async((faceId,), task_id=task_id)
        logger.debug(f"Started task id:{task.id} with state:{task.state}")
        return {
            'id': task.id,
            'current': 0,
            'total': 1,
            'status': task.state,
        }
