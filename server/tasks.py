# import random
# import logging
# import time

# from tqdm import tqdm
# from celery import current_app
# from celery.utils.log import get_task_logger

# from .faces.arcface.utils import cosine_similarity_batch
# from .models import *
# from .faces import face_recognition

# logger = get_task_logger(__name__)

# celery_app = current_app._get_current_object()


# @celery_app.task(bind=True)
# def long_task(self):
#     """Background task that runs a long function with progress reports."""
#     verb = ['Starting up', 'Booting', 'Repairing', 'Loading', 'Checking']
#     adjective = ['master', 'radiant', 'silent', 'harmonic', 'fast']
#     noun = ['solar array', 'particle reshaper', 'cosmic ray', 'orbiter', 'bit']
#     message = ''
#     total = random.randint(10, 20)
#     for i in range(total):
#         if not message or random.random() < 0.25:
#             message = '{0} {1} {2}...'.format(random.choice(verb),
#                                               random.choice(adjective),
#                                               random.choice(noun))
#         logger.info(f"Progress: {i}/{total}")
#         self.update_state(state='PROGRESS',
#                           meta={'current': i, 'total': total,
#                                 'status': message})
#         time.sleep(1)
#     return {'current': 100, 'total': 100, 'status': 'Task completed!',
#             'result': 42}


# @celery_app.task(bind=True)
# def face_identify(self, face_id):
#     logger.info("face_identify task called")
#     self.update_state(state='PROGRESS', meta={'current': -1, 'total': -1})
#     profiles = Profile.query.all()
#     face_obj = Face.query.get(face_id)
#     encoding_to_check = face_obj.encoding
#     total = len(profiles)
#     scores = []

#     logger.info(f"{total} profiles found, starting identify loop")

#     for i, profile in enumerate(profiles):
#         logger.info(f"Updating status to check face distance with profile {profile.name} id:{profile.id}")
#         self.update_state(state='PROGRESS', meta={'profile': profile.id, 'current': i, 'total': total})
#         known_encodings = [face.encoding for face in profile.faces]
#         # distances = face_recognition.face_distance(known_encodings, encoding_to_check)
#         distances = cosine_similarity_batch(encoding_to_check, known_encodings)
#         score =  sum(distances) / len(distances)
#         scores.append({'id': profile.id, 'score': score})

#         logger.info(f"Face distances: {distances}")
#         logger.info(f"Score: {score}")

#     scores.sort(key=lambda x: x['score'])  # Sort by score
#     scores = scores[::-1]
#     logger.info(f"All profiles compared, final score: {scores}")

#     return {'current': total, 'total': total, 'result': scores}
