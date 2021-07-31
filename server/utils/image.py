import base64
import io
import PIL


def decode_img(img_base64):
    img_str = base64.b64decode(img_base64)
    buf = io.BytesIO(img_str)
    img = PIL.Image.open(buf)
    return img


def img_arr_to_file(img_arr):
    img_io = io.BytesIO()
    pil_img = PIL.Image.fromarray(img_arr)
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return img_io
    