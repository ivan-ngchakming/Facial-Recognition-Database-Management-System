import os
import logging

from ariadne import MutationType, convert_kwargs_to_snake_case

from server.taskmanager import manager

from .controllers import Task, TaskCollection
from .tasks import face_identify


logger = logging.getLogger(__name__)

mutation = MutationType()


@mutation.field("batchFaceRec")
@convert_kwargs_to_snake_case
def resolve_batch_face_rec(_, info, dirpath, priority=5):
    logger.debug(f"Creating batch rec task for {dirpath} with priority {priority}")

    filepaths = [os.path.join(dirpath, filename) for filename in os.listdir(dirpath)]

    collection = TaskCollection()

    for filepath in filepaths:
        # TODO: Allow user to customize tolerance
        Task(collection, face_identify, filepath, tolerace=0.5, priority=priority)

    return manager.add_task_collection(collection)
