import os
import sys
import logging

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate

from .config import Config
from .database import db
from .schema import schema
from .taskmanager import manager as task_manager
from .faces.arcface import face_app
from .utils.image import img_arr_to_file
from .utils.logging import get_console_handler


if getattr(sys, "frozen", False):
    static_folder = os.path.join(sys._MEIPASS, "build")
else:
    static_folder = "../build/"

app = Flask(__name__, static_folder=static_folder, static_url_path="/")
CORS(
    app,
    resources=r"/api/*",
    origins=[
        "http://localhost:3000",  # react
        "http://localhost:6006",  # storybook
        "http://localhost:8080",  # wsgi
    ],
)
app.config.from_object(Config)


# Create loggers and handlers
werkzeug_logger = logging.getLogger("werkzeug")  # grabs underlying WSGI logger
werkzeug_logger.setLevel(logging.INFO)
werkzeug_logger.addHandler(get_console_handler())

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(get_console_handler())

app.logger.setLevel(logging.DEBUG)

# Setup database
db.init_app(app)

# Setup migration
migrate = Migrate(app, db, directory=app.config["MIGRATION_DIR"])

# Setup task manager
task_manager.init_app(app)

# Load face recognition models
face_app.init_models()


from .tasks import tasks

app.register_blueprint(tasks, url_prefix="/api/tasks")


@app.route("/graphql", methods=["GET", "POST"])
def graphql():
    if request.method == "GET":
        return PLAYGROUND_HTML, 200
    else:
        # GraphQL queries are always sent as POST
        data = request.get_json()

        # Note: Passing the request to the context is optional.
        # In Flask, the current request is always accessible as flask.request
        success, result = graphql_sync(
            schema, data, context_value=request, debug=app.debug
        )

        status_code = 200 if success else 400
        return jsonify(result), status_code


from flask import send_file

from .models import Photo


@app.route("/api/image/<int:id>")
def post_image(id):
    """ post image and return the response """
    img_arr = Photo.query.get(id).array
    img = img_arr_to_file(img_arr)
    return send_file(img, mimetype="image/jpeg")


@app.route("/")
def react_app():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    """Redirect any 404 errors to be handled by React app"""
    return app.send_static_file("index.html")


# Register CLI Groups
from .commands import build_cli, data_cli, dev_cli

app.cli.add_command(build_cli)
app.cli.add_command(data_cli)
app.cli.add_command(dev_cli)


@app.shell_context_processor
def make_shell_context():
    return {"db": db}


with app.test_request_context():
    db_path = app.config["DATABASE_PATH"]
    if not os.path.isfile(db_path):
        app.logger.info("Database not found, creating ...")
        db.create_all()
    else:
        app.logger.info(f"Existing database found at {db_path}. Connected to database.")
