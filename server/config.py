import os

from .utils.frozen import isfrozen, frozen_basedir


class Config(object):
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    PROJECT_DIR = os.path.abspath(os.path.dirname(BASE_DIR))

    IS_FROZEN = isfrozen()
    # Application settings
    if IS_FROZEN:
        FROZEN_BASE_DIR = frozen_basedir()
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{FROZEN_BASE_DIR}/FRDMS.db"
        DATABASE_PATH = f"{FROZEN_BASE_DIR}/FRDMS.db"
    else:
        SQLALCHEMY_DATABASE_URI = "sqlite:///../FRDMS.db"
        DATABASE_PATH = f"{BASE_DIR}/../FRDMS.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MIGRATION_DIR = BASE_DIR + "/migrations"
