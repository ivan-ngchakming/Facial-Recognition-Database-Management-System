import logging

from ariadne import QueryType, convert_kwargs_to_snake_case

from ..models import *
from ..faces.arcface import face_app
from ..faces.arcface.utils import cosine_similarity_batch
from ..utils.dev import runtime
from ..utils.image import decode_img

logger = logging.getLogger(__name__)

query = QueryType()


@query.field("photo")
@convert_kwargs_to_snake_case
def resolve_photo(_, info, photo_id):
    with runtime(f"Query photo id:{photo_id}", logger):
        photo = Photo.query.get(photo_id)
    return photo


@query.field("profile")
@convert_kwargs_to_snake_case
def resolve_profile(_, info, profile_id):
    with runtime(f"Query profile id:{profile_id}", logger):
        profile = Profile.query.get(profile_id)
    return profile


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


@query.field("photos")
def resolve_photos(_, info):
    return Photo.query.all()

