import click
from flask.cli import AppGroup
import os
from celery import current_app
from celery.app.control import Inspect
import time 

from ..config import Config
from ..tasks import *

cli = AppGroup('celery', short_help="Celery related commands")

celery_app = current_app._get_current_object()



@cli.command()
def start_worker():
    inspector = Inspect(app=celery_app)
    stats = inspector.stats()

    worker_number = 1
    try:
        while f"celery@worker{worker_number}" in stats:
            worker_number += 1
    except TypeError:
        # No active worker
        pass
    
    os.system(f"celery -A server.celery_app worker -n worker{worker_number} --pool=solo -l info")


@cli.command()
def start_task():
    print("Attempting to start task")
    task = long_task.apply_async()
    task_id = task.id
    print(f"Task started with id: {task_id}")
    flag = True
    
    while flag:
        task = long_task.AsyncResult(task_id)
        print(task, task.state, task.info)
        if task.state == 'SUCCESS':
            flag = False
        time.sleep(1)


@cli.command()
def start_task2():
    print("Attempting to start task")
    task = face_identify.apply_async()
    task_id = task.id
    print(f"Task started with id: {task_id}")
    flag = True
    
    while flag:
        task = face_identify.AsyncResult(task_id)
        print(task, task.state, task.info)
        if task.state == 'SUCCESS':
            flag = False
        time.sleep(1)