from . import face_recognition


def process_img(image):
    face_locations = face_recognition.face_locations(image)
    face_landmarks = face_recognition.face_landmarks(image)
    face_encodings = face_recognition.face_encodings(image)

    return list(zip(face_locations, face_landmarks, face_encodings))
