from flask.cli import AppGroup
from ..faces.arcface import face_app

from ..database import db
from ..models import *

cli = AppGroup("dev", short_help="Data creation/migration helper.")


@cli.command()
def load_models():
    face_app.init_models()
