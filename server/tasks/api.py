import logging
import os

from flask import Blueprint, jsonify, request

from .controllers import Task, TaskCollection, manager
from .tasks import example_task, face_identify

tasks = Blueprint("tasks", __name__)

logger = logging.getLogger(__name__)


@tasks.route("/start", methods=["POST", "GET"])
def start():
    if request.method == "POST":
        n = int(request.form["n"])
        t = float(request.form["t"])
        priority = int(request.form["priority"])

        collection = TaskCollection()
        for _ in range(n):
            Task(collection, example_task, t, priority=priority)
        manager.add_task_collection(collection)

        return jsonify({"Status": "Success", "task_collection_id": collection.id})

    else:
        return """<form action="" method="POST">
                    <input type="number" name="n">
                    <input type="number" name="t">
                    <input type="number" name="priority" value=5>
                    <input type="submit" value="Submit">
                </form>"""


@tasks.route("/face-rec", methods=["POST", "GET"])
def face_rec():
    if request.method == "POST":
        dirpath = request.form["dir"]
        priority = int(request.form["priority"])

        logger.debug(f"Creating batch rec task for {dirpath} with priority {priority}")

        filepaths = [
            os.path.join(dirpath, filename) for filename in os.listdir(dirpath)
        ]

        collection = TaskCollection()

        for filepath in filepaths:
            Task(collection, face_identify, filepath, tolerace=0.5, priority=priority)

        manager.add_task_collection(collection)
        return jsonify({"task_collection_id": collection.id})

    else:
        return """<form action="" method="POST">
                    <input type="text" name="dir">
                    <input type="number" name="priority" value=5>
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
                "task_collection_id": task_collection_id,
                "status": status,
                "progress": progress,
            }
        )
