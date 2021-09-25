import base64
import io
from PIL import Image


def decode_img(img_base64):
    """Convert base64 image string to Pillow Image object"""
    img_str = base64.b64decode(img_base64)
    buf = io.BytesIO(img_str)
    img = Image.open(buf)
    return img


def img_arr_to_file(img_arr):
    img_io = io.BytesIO()
    pil_img = Image.fromarray(img_arr)
    pil_img.save(img_io, "JPEG", quality=70)
    img_io.seek(0)
    return img_io
