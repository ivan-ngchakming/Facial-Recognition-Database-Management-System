"""InsightFace: A Face Analysis Toolkit."""

import os

try:
    import onnxruntime
except ImportError:
    raise ImportError("Unable to import dependency onnxruntime. ")

__version__ = "0.4"

from .app import FaceAnalysis
from ...config import Config

face_app = FaceAnalysis(
    root=os.path.join(Config.PROJECT_DIR, "face_recognition_models")
)
