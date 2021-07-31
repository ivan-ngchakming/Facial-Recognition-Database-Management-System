import logging

from ariadne import QueryType

from ..models import *
from ..utils.dev import runtime

logger = logging.getLogger(__name__)

query = QueryType()


@query.field("photo")
def resolve_photo(_, info, id):
    with runtime(f"Query photo id:{id}", logger):
        photo = Photo.query.get(id)
    return photo


@query.field("identifyFace")
def resolve_identify_face(_, info, id):
    from ..tasks import face_identify
    task = face_identify.AsyncResult(id)
    if task.state == 'PENDING':
        data = {
            'id': task.id,
            'current': 0,
            'total': 1,
            'status': task.state,
            'result': None
        }
    else:
        data = {
            'id': task.id,
            'current': task.info.get('current', 0),
            'total': task.info.get('total', 1),
            'status': task.state,
            'result': task.info.get('result', None)
        }
    return data
