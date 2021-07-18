import os
from flask import Flask, jsonify
from flask_cors import CORS

from .facial_recognition.main import process_img

app = Flask(__name__, static_folder='../client/build/', static_url_path='/')
CORS(app, resources=r"/api/*", origins="http://localhost:3000")


# Routes

@app.route("/")
def react_app():
    return app.send_static_file('index.html')


@app.route("/app")
def protected_react_app():
    return app.send_static_file('index.html')


@app.route("/api/hello")
def hello_world():
    return jsonify("Hello World!")


@app.route("/api/img")
def img():
    face_locations, face_landmarks_list, image = process_img()
    print(face_locations)
    return jsonify(face_locations)


@app.route("/ping")
def ping():
    return jsonify("pong")


# Commands

@app.cli.command("build")
def build():
    os.system("cd client & yarn build")
    # os.system("""pyinstaller --clean --onefile --icon=client/build/favicon.ico --add-data client/build/;client/build/ wsgi.py""")
    os.system("pyinstaller --clean --onefile wsgi.spec")
