import os
from dotenv import load_dotenv

load_dotenv(override=True)


class Config(object):
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    # Application settings
    SQLALCHEMY_DATABASE_URI = "sqlite:///../FRDMS.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MIGRATION_DIR = BASE_DIR + "/migrations"
    
    # Celery configurations
    CELERY_BROKER_URL = 'redis://localhost:6379'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379'
    result_backend = CELERY_RESULT_BACKEND
    CELERY_INCLUDE = ['server.tasks']
    CELERY_CONCURRENCY = 10
