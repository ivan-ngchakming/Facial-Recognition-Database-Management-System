import logging
import math

from ariadne import QueryType, convert_kwargs_to_snake_case

from ..models import *
from ..faces.arcface.utils import cosine_similarity_batch
from ..utils.dev import runtime

logger = logging.getLogger(__name__)

query = QueryType()

IMAGES_PER_PAGE = 20


@query.field("image")
@convert_kwargs_to_snake_case
def resolve_image(_, info, image_id):
    return Image.query.get(image_id)


@query.field("images")
@convert_kwargs_to_snake_case
def resolve_images(_, info, page=None, profile_id=None):
    query = Image.query

    if profile_id is not None:
        query = query.join(Image.faces)
        query = query.filter(Face.profile_id == profile_id)

    if page is None:
        return {"images": query.all()}
    else:
        count = query.count()
        pages = math.ceil(count / IMAGES_PER_PAGE)
        if page > pages and pages != 0:
            raise Exception(f"Page {page} out of range, there are only {pages} pages.")
        images = query.offset((page - 1) * IMAGES_PER_PAGE).limit(IMAGES_PER_PAGE).all()
        return {"pages": pages, "count": count, "images": images}


@query.field("profile")
@convert_kwargs_to_snake_case
def resolve_profile(_, info, profile_id):
    return Profile.query.get(profile_id)


@query.field("profiles")
@convert_kwargs_to_snake_case
def resolve_profiles(_, info, page=None, per_page=10):
    logger.debug(f"Querying profiles page {page} with {per_page} per page")
    query = Profile.query

    if page is None:
        return {"profiles": query.all()}
    else:
        count = query.count()
        pages = math.ceil(count / per_page)
        if page > pages:
            raise Exception(f"Page {page} out of range, there are only {pages} pages.")
        profiles = query.offset((page) * per_page).limit(per_page).all()
        logger.debug(f"{len(profiles)=}")
        return {"pages": pages, "count": count, "profiles": profiles}


@query.field("identifyFace")
@convert_kwargs_to_snake_case
def resolve_identify_face(_, info, face_id):
    with runtime(f"Query profile id:{face_id}", logger):
        profiles = Profile.query.all()
        face_obj = Face.query.get(face_id)
        encoding_to_check = face_obj.encoding
        scores = []

        for profile in profiles:
            if len(profile.faces) > 0:
                known_encodings = [face.encoding for face in profile.faces]
                distances = cosine_similarity_batch(encoding_to_check, known_encodings)
                score = sum(distances) / len(distances)
                scores.append({"id": profile.id, "score": score})

        scores.sort(key=lambda x: x["score"])  # Sort by score
        scores = scores[::-1]
        logger.info(f"All profiles compared, final score: {scores}")

    return scores
