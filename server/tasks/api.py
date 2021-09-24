import logging
import os
import time

from flask import Blueprint, jsonify, request, redirect
from PIL import Image
from server.database import db
from server.faces.arcface.utils import cosine_similarity_batch
from server.models import Photo, Profile

from .controllers import Task, TaskCollection, manager

tasks = Blueprint("tasks", __name__)

logger = logging.getLogger(__name__)


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


def short_task(task):
    time.sleep(0.1)


@tasks.route("/start")
def start():
    collection = TaskCollection()
    for _ in range(100):
        Task(collection, short_task)
    manager.add_task_collection(collection)

    return jsonify({"Status": "Success", "task_collection_id": collection.id})


@tasks.route("/face-rec", methods=["POST", "GET"])
def face_rec():
    if request.method == "POST":
        dirpath = request.form["dir"]
        filepaths = [
            os.path.join(dirpath, filename) for filename in os.listdir(dirpath)
        ]

        collection = TaskCollection()

        for filepath in filepaths:
            Task(collection, face_identify, filepath, tolerace=0.5)

        manager.add_task_collection(collection)
        # return jsonify({"task_collection_id": collection.id})
        return redirect(f"/api/tasks/status?id={collection.id}")

    else:
        return """<form action="" method="POST">
                    <input type="text" name="dir">
                    <input type="submit" value="Submit">
                </form>"""


@tasks.route("/status")
def status():
    task_collection_id = request.args.get("id")

    if task_collection_id is None:
        results = manager.status()
        return jsonify(results)
    else:
        status, progress = manager.status(task_collection_id)
        return jsonify(
            {
                "Task collection ID": task_collection_id,
                "Status": status,
                "Progress": progress,
            }
        )
