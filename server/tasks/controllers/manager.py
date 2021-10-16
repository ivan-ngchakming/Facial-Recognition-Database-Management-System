import logging

from server.config import Config
from .worker import Worker
from .queue import PriorityQueue


logger = logging.getLogger(__name__)


class TaskManager:
    def __init__(self) -> None:
        self.task_collections = []
        self.workers = []
        self.task_queue = PriorityQueue()

        # Add one worker at initiation
        self.add_worker(Config.INIT_TASK_WORKERS)

    def add_worker(self, num=1):
        logger.debug(f"Adding {num} worker")
        for _ in range(num):
            worker = Worker(self.task_queue)
            self.workers.append(worker)

    def terminate_workers(self):
        """Terminate all workers under this manager"""
        self.task_queue.put("terminate")

    def add_task_collection(self, collection):
        """Create new task object and put into task queue to be collected by worker"""
        for task in collection.tasks:
            self.task_queue.put(task, task.priority)
        self.task_collections.append(collection)

    def status(self, task_collection_id=None):
        """Check task collection's status"""
        if task_collection_id is not None:
            # get status of one task collection
            for collection in self.task_collections:
                if str(collection.id) == task_collection_id:
                    return collection.status, collection.progress
            return "Task collection not found", None
        else:
            # get status of all task collections
            return [
                {
                    "task_collection_id": collection.id,
                    "status": collection.status,
                    "progress": collection.progress,
                }
                for collection in self.task_collections
            ]
