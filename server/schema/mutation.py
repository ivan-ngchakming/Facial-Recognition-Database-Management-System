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
    image = image.convert("RGB")

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


@mutation.field("profile")
@convert_kwargs_to_snake_case
def resolve_assign_face_to_profile(
    _, info, _id=None, face_ids=None, thumbnail_id=None, **kwargs
):
    logger.debug(f"Modifying profile id:{_id}")

    modified = False
    if _id is None:
        profile = Profile(**kwargs)
        db.session.add(profile)
    else:
        profile = Profile.query.get(_id)

    if profile is None:
        logger.warning(f"Profile id:{_id} not found, creating new...")
        profile = Profile(**kwargs)
        db.session.add(profile)
        modified = True
    else:
        for key, value in kwargs.items():
            if value is not None:
                logger.debug(
                    f"Updating profile {key} {getattr(profile, key)} to {value}"
                )
                setattr(profile, key, value)
                modified = True

    if face_ids is not None:
        for face_id in face_ids:
            face = Face.query.get(face_id)
            if face is not None:
                profile.faces.append(face)
                modified = True

    if thumbnail_id is not None:
        thumbnail = Face.query.get(thumbnail_id)
        if thumbnail is not None:
            profile.thumbnail = thumbnail

    if modified:
        logger.debug(f"Commiting modifications made to profile id:{_id}")
        db.session.commit()
    return profile
