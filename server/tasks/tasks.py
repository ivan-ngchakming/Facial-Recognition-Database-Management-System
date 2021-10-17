import time
import logging

import numpy as np
from PIL import Image
from server.database import db
from server.faces.arcface.utils import cosine_similarity_batch
from server.models import Photo, Profile, Face


logger = logging.getLogger(__name__)


def example_task(task, t):
    logger.info(f"Starting task {task.id}")
    time.sleep(t)


def face_identify(task, filepath, tolerace=0.7):

    logger.info(f"Starting task {task.id}")

    # Create Photo object
    image = Image.open(filepath)
    photo = Photo(image)
    db.session.add(photo)

    # Identify face
    profiles = Profile.query.all()
    unknown_face_objs = photo.faces

    logger.debug(f"{task.id}: {len(unknown_face_objs)} faces found")

    results = []
    for unknown_face_obj in unknown_face_objs:  # face objects in target image
        encoding_to_check = unknown_face_obj.encoding
        scores = []

        for profile in profiles:
            if len(profile.faces) > 0:
                known_encodings = [face.encoding for face in profile.faces]
                distances = cosine_similarity_batch(encoding_to_check, known_encodings)
                score = sum(distances) / len(distances)
                scores.append({"profile": profile, "score": score})

        scores.sort(key=lambda x: x["score"])  # Sort by score
        scores = scores[::-1]
        logger.debug(f"All profiles compared, final score: {scores}")

        # add face to profile
        best_match = scores[0]
        if best_match["score"] > tolerace:
            best_match["profile"].faces.append(unknown_face_obj)
            logger.debug(
                f"Face {unknown_face_obj.id} matched to profile {best_match['profile'].name}"
            )
        else:
            logger.debug(f"No match for face {unknown_face_obj.id}")
            saved_face = face_verification(unknown_face_obj, tolerace)
            profile = Profile(name=f"Unknown")
            profile.thumbnail = unknown_face_obj
            profile.faces.append(saved_face)
            profile.faces.append(unknown_face_obj)
            db.session.add(profile)

        # Store face matching result and return later
        results.append({"face": unknown_face_obj, "scores": scores})

    # Commit all changes
    db.session.commit()

    return results


def face_verification(unknown_face, tolerace=0.7):
    logger.debug(f"Running face against other faces with no profiles")
    face_objs = Face.query.filter(Face.profile == None).all()

    similarities = cosine_similarity_batch(
        unknown_face.encoding, [face_obj.encoding for face_obj in face_objs]
    )

    max_score = np.max(similarities)
    if max_score > tolerace:
        return face_objs[np.where(similarities == max_score)[0][0]]
