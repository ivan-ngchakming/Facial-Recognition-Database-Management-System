from flask import current_app
from flask.cli import AppGroup
from sqlalchemy import exc as sa_exc
from tqdm import tqdm

from ..database import db
from ..models import *

cli = AppGroup("data", short_help="Data creation/migration helper.")


@cli.command()
def reset():
    """Reset database by clearing all data from all tables."""
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        db.session.execute(table.delete())
    db.session.commit()
