from celery import Celery, current_app

import threading
import subprocess


class ThreadedSubprocess(threading.Thread):
    def __init__(self, argv, shell=False):
        self.argv = argv
        self.shell = shell
        self.stdout = None
        self.stderr = None
        self.process = None
        threading.Thread.__init__(self)

    def run(self):
        self.process = subprocess.Popen(
            self.argv, shell=self.shell, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        self.stdout, self.stderr = self.process.communicate()

    def terminate(self):
        self.process.terminate()


class Node:
    def __init__(self, name) -> None:
        self.name = name
        self.destination = f"celery@{self.name}"
        self.thread = None
        self.app = current_app._get_current_object()
        self.control = self.app.control

    def start(self):
        cmd = f"celery -A server.celery_app worker -n {self.name}"
        self.thread = ThreadedSubprocess(cmd)
        self.thread.setDaemon(True)
        self.thread.start()

    def stop(self):
        self.control.shutdown(destination=[self.destination])
        self.thread.join()


class Cluster:
    def __init__(self) -> None:
        self.nodes = []

    def start_new(self, name):
        node = Node(name)
        node.start()
        self.nodes.append(node)

    def kill(self):
        for node in self.nodes:
            node.stop()


def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config["CELERY_RESULT_BACKEND"],
        broker=app.config["CELERY_BROKER_URL"],
        include=app.config["CELERY_INCLUDE"],
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery
