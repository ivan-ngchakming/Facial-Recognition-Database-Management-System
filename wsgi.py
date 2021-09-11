import webbrowser
import logging

import waitress

from app import app

logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

if __name__ == "__main__":
    webbrowser.open("http://localhost:8080")
    waitress.serve(app, host='localhost', port=8080)
