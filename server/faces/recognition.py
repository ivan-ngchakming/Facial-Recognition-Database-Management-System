import face_recognition


def process_img(filename):
    image = face_recognition.load_image_file(filename)

    face_locations = face_recognition.face_locations(image)
    face_landmarks = face_recognition.face_landmarks(image)
    face_encodings = face_recognition.face_encodings(image)

    return face_locations, face_landmarks, face_encodings
