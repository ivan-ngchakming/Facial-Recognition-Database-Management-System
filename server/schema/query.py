import logging
import math

from ariadne import QueryType, convert_kwargs_to_snake_case

from ..models import *
from ..faces.arcface.utils import cosine_similarity_batch
from ..utils.dev import runtime

logger = logging.getLogger(__name__)

query = QueryType()

PHOTOS_PER_PAGE = 20

@query.field("photo")
@convert_kwargs_to_snake_case
def resolve_photo(_, info, photo_id):
    return Photo.query.get(photo_id)


@query.field("photos")
def resolve_photos(_, info, page=None):
    query = Photo.query

    if page is None:
        return {'photos': query.all()}
    else:
        count = query.count()
        pages = math.ceil(count / PHOTOS_PER_PAGE)
        if page > pages:
            raise Exception(f"Page {page} out of range, there are only {pages} pages.")
        photos = query.offset((page-1)*PHOTOS_PER_PAGE).limit(PHOTOS_PER_PAGE).all()
        return {'pages': pages, 'count': count, 'photos': photos}


@query.field("profile")
@convert_kwargs_to_snake_case
def resolve_profile(_, info, profile_id):
    return Profile.query.get(profile_id)


@query.field("profiles")
@convert_kwargs_to_snake_case
def resolve_profiles(_, info, page=None, per_page=10):
    query = Profile.query

    if page is None:
        return {'profiles': query.all()}
    else:
        count = query.count()
        pages = math.ceil(count / per_page)
        if page > pages:
            raise Exception(f"Page {page} out of range, there are only {pages} pages.")
        photos = query.offset((page-1)*per_page).limit(per_page).all()
        return {'pages': pages, 'count': count, 'profiles': photos}


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
                score =  sum(distances) / len(distances)
                scores.append({'id': profile.id, 'score': score})

        scores.sort(key=lambda x: x['score'])  # Sort by score
        scores = scores[::-1]
        logger.info(f"All profiles compared, final score: {scores}")

    return scores
