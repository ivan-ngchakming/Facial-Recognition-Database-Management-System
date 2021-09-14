import time
import logging

logger = logging.getLogger(__name__)


def long_task(task_id, sub_task_id):
    for i in range(10):
        logger.debug(f"{task_id}-{sub_task_id}: {i}/10")
        time.sleep(1)
