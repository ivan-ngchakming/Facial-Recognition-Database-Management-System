from loguru import logger
from PIL import Image, ImageDraw
import face_recognition


def process_img():
    image = face_recognition.load_image_file("server/facial_recognition/anya2.jpg")

    face_locations = face_recognition.face_locations(image)
    face_landmarks_list = face_recognition.face_landmarks(image)
    return face_locations, face_landmarks_list, image


def main():
    image = face_recognition.load_image_file("anya2.jpg")

    face_locations = face_recognition.face_locations(image)
    face_landmarks_list = face_recognition.face_landmarks(image)
    
    logger.debug("{} faces found in image", len(face_locations))

    for face_location, face_landmarks in zip(face_locations, face_landmarks_list):
        top, right, bottom, left = face_location

        pil_image = Image.fromarray(image)

        image_draw = ImageDraw.Draw(pil_image)
        image_draw.rectangle([left, top, right, bottom], outline ="red")


        for facial_feature in face_landmarks.keys():
            logger.debug("The {} in this face has the following points: {}", facial_feature, face_landmarks[facial_feature])
            for coord in face_landmarks[facial_feature]:
                image_draw.regular_polygon((*coord, 2), n_sides=4, outline="red")

        pil_image.show()


if __name__ == '__main__':
    main()
