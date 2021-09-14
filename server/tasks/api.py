import logging

from flask import Blueprint, jsonify, request

from .controllers import manager, TaskCollection, Task


tasks = Blueprint("tasks", __name__)

logger = logging.getLogger(__name__)


import time


def long_task():
    time.sleep(10)


def short_task():
    time.sleep(0.1)


@tasks.route("/start")
def start():
    collection = TaskCollection()
    for _ in range(100):
        Task(collection, short_task)
    manager.add_task_collection(collection)

    return jsonify({"Status": "Success", "task_collection_id": collection.id})


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
