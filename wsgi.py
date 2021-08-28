import webbrowser

import waitress

from app import app


if __name__ == "__main__":
    webbrowser.open("http://localhost:8080")
    waitress.serve(app, host='localhost', port=8080)
