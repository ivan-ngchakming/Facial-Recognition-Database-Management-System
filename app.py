import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='./client/build/', static_url_path='/')
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


@app.route("/ping")
def ping():
    return jsonify("pong")


# @app.errorhandler(404)
# def react_app(e):
#     return app.send_static_file('index.html')


# Commands

@app.cli.command("build")
def build():
    os.system("cd client & yarn build")
    os.system("""pyinstaller --clean --onefile --icon=client/build/favicon.ico --add-data client/build/;client/build/ wsgi.py""")


if __name__ == "__main__":
    app.run(debug=True)
