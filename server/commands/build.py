import os
import click
from flask.cli import AppGroup


cli = AppGroup('build', short_help="Building the application")

@cli.command()
def windows():
    os.system("cd client & yarn build")
    # os.system("""pyinstaller --clean --onefile --icon=client/build/favicon.ico --add-data client/build/;client/build/ wsgi.py""")
    os.system("pyinstaller --clean --onefile wsgi.spec")

