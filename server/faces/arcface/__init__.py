"""InsightFace: A Face Analysis Toolkit."""
from __future__ import absolute_import

try:
    import onnxruntime
except ImportError:
    raise ImportError(
        "Unable to import dependency onnxruntime. "
    )

__version__ = '0.4'

from .app import FaceAnalysis


face_app = FaceAnalysis()
