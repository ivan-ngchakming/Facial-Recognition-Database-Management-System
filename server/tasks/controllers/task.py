import uuid
import logging


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class TaskCollection:
    def __init__(self, tasks=None) -> None:
        self.id = uuid.uuid4()
        self.tasks = tasks or []
        self.status = "pending"
        self.completion_count = 0

    @property
    def progress(self):
        return self.completion_count / len(self.tasks)


class Task:
    def __init__(self, collection, func, *args, priority=5, **kwargs) -> None:
        self.id = uuid.uuid4()
        self.collection = collection
        self.collection.tasks.append(self)
        self.priority = priority
        self.func = func
        self.args = args
        self.kwargs = kwargs
        self.status = "pending"

    def run(self):
        logger.debug(f"Starting task {self.id}")
        self.status = "in-progress"
        if self.collection.status == "pending":
            self.collection.status = "in-progress"

        self.func(*self.args, **self.kwargs)

        self.status = "completed"
        self.collection.completion_count += 1
        if self.collection.progress == 1:
            self.collection.status = "completed"
        logger.debug(f"Task {self.id} completed")
