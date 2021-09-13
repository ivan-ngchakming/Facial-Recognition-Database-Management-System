from flask import Blueprint, jsonify
from queue import Queue
from concurrent.futures import ThreadPoolExecutor
import uuid
import time
import logging
import heapq
import threading


logger = logging.getLogger(__name__)

tasks = Blueprint('tasks', __name__)

class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._count = 0
        self._cv = threading.Condition()
          
    def put(self, item, priority):
        with self._cv:
            heapq.heappush(self._queue, (-priority, self._count, item))
            self._count += 1
            self._cv.notify()
              
    def get(self):
        with self._cv:
            while len(self._queue) == 0:
                self._cv.wait()
            return heapq.heappop(self._queue)[-1]

class TaskManager:
    def __init__(self) -> None:
        self.tasks = []
        self.workers = []
        self.task_queue = PriorityQueue()

        self.add_worker()

    def add_worker(self):
        worker = Worker(self.task_queue)
        self.workers.append(worker)

    def create(self):
        new_task = Task(long_task)
        self.tasks.append(new_task)
        return new_task

    def status(self, task_id):
        for task in self.tasks:
            if str(task.id) == task_id:
                return task.status, task.progress
        
        return None, None


class Task:
    def __init__(self, func) -> None:
        self.id = uuid.uuid4()
        self._status = "pending"
        self.func = func
        self.executor = ThreadPoolExecutor(max_workers=4)
        self.futures = []
        self.start()

    def start(self):
        self.status = "in-progress"
        for i in range(5):
            future = self.executor.submit(self.func, self.id, i)
            self.futures.append(future)

    @property
    def progress(self):
        if len(self.futures) == 0:
            return 0
        
        completion = 0
        for future in self.futures:
            if future.done():
                completion += 1
        return completion / len(self.futures)


class Worker:
    def __init__(self, task_queue) -> None:
        self.task_queue = task_queue

def long_task(task_id, sub_task_id):
    for i in range(10):
        logger.debug(f"{task_id}-{sub_task_id}: {i}/10")
        time.sleep(1)


manager = TaskManager()

@tasks.route("/start")
def start():
    new_task = manager.create()
    return jsonify({
        "Status": "Success", 
        "task_id": new_task.id
    })

@tasks.route("/status/<task_id>")
def status(task_id):
    status, progress = manager.status(task_id)
    return jsonify({
        "Status": status,
        "Progress": progress,
    })
