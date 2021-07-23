from dotenv import load_dotenv

load_dotenv(override=True)


class Config(object):
    # Application settings
    SQLALCHEMY_DATABASE_URI = "sqlite://FRDMS.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MIGRATION_DIR = "/"
    