import time
import logging

from PIL import Image
from server.database import db
from server.faces.arcface.utils import cosine_similarity_batch
from server.models import Photo, Profile


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
    face_objs = photo.faces

    logger.debug(f"{task.id}: {len(face_objs)} faces found")

    results = []
    for face_obj in face_objs:
        encoding_to_check = face_obj.encoding
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
            best_match["profile"].faces.append(face_obj)
            logger.debug(
                f"Face {face_obj.id} matched to profile {best_match['profile'].name}"
            )
        else:
            logger.debug(f"No match for face {face_obj.id}")

        # Store face matching result and return later
        results.append({"face": face_obj, "scores": scores})

    # Commit all changes
    db.session.commit()

    return results
