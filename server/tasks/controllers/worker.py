import threading
import logging
import uuid

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class Worker(threading.Thread):
    def __init__(self, task_queue, app) -> None:
        threading.Thread.__init__(self)
        self.id = uuid.uuid4()
        self.task_queue = task_queue
        self.app = app
        self.daemon = True
        self.start()
        logger.debug(f"Worker {self.id} started")

    def run(self):
        while True:
            task = self.task_queue.get()
            logger.debug(f"Task {task.id} collected")

            try:
                # Check for terminate command
                if task.lower() == "terminate":
                    logger.debug(f"Worker {self.id} terminated.")
                    break
            except:
                try:
                    with self.app.app_context():
                        task.run(self)
                except Exception as exception:
                    print(exception)
