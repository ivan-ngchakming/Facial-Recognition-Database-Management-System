from flask import Flask
from flask_cors import CORS

from flask_migrate import Migrate
from .database import db
from .config import Config


app = Flask(__name__, static_folder='../client/build/', static_url_path='/')
CORS(app, resources=r"/api/*", origins="http://localhost:3000")
app.config.from_object(Config)


# Setup database
db.init_app(app)

# Setup migration
migrate = Migrate(app, db, directory=app.config['MIGRATION_DIR'])


@app.route("/")
def react_app():
    return app.send_static_file('index.html')


# Register CLI Groups
from .commands import cli

app.cli.add_command(cli)


@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
    }
