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


@mutation.field("assignFaceToProfile")
@convert_kwargs_to_snake_case
def resolve_assign_face_to_profile(_, info, face_id, profile_id):
    logger.debug(f"Appending face id:{face_id} to profile id:{profile_id}")
    face = Face.query.get(face_id)
    profile = Profile.query.get(profile_id)
    
    profile.faces.append(face)
    db.session.commit()

    return face
