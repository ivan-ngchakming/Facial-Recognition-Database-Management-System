import cv2
import pandas as pd

from arcface.app import FaceAnalysis
from arcface.utils import list_files, cosine_similarity_batch, cosine_similarity_batch_loop


def main():
    data_path = 'images/celebLookAlike'
    app = FaceAnalysis(root='arcface')
    app.prepare(ctx_id=0, det_size=(640, 640))

    files = list_files(data_path, True)
    imgs = [cv2.imread(f) for f in files]

    faces = []
    for i, img in enumerate(imgs):
        try:
            face = app.get(img)[0]
            faces.append(face)
        except AttributeError:
            raise Exception(f"Error analysing image {files[i]}")

    embeddings = [face.embedding for face in faces]
    score = cosine_similarity_batch_loop(embeddings[0], embeddings)
    score2 = cosine_similarity_batch(embeddings[0], embeddings)

    names = [file.split('\\')[-2] for file in list_files(data_path)]
    score_df = pd.DataFrame(
        data={'loop': score, 'vec': score2},
        index=[f"{name} {age} {sex}" for name, age, sex in zip(names, [face.age for face in faces], [face.sex for face in faces])],
    )
    print(score_df)


if __name__ == "__main__":
    main()
