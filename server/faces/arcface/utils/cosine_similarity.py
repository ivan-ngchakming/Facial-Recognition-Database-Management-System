import numpy as np


def cosine_similarity(x, y):
    return np.dot(x, y) / (np.sqrt(np.dot(x, x)) * np.sqrt(np.dot(y, y)))


def cosine_similarity_batch_loop(unknown_face, known_faces):
    return np.array([
        cosine_similarity(unknown_face, known_face) for known_face in known_faces
    ])


def cosine_similarity_batch(unknown_face, known_faces):
    unknown_face = np.array([unknown_face])
    unknown_faces = np.repeat(unknown_face, len(known_faces), axis=0)
    known_faces = np.array(known_faces)

    score = (unknown_faces * known_faces).sum(axis=1) / (
        np.repeat(np.linalg.norm(unknown_face), len(known_faces)) * np.linalg.norm(known_faces, axis=1)
    )
    return score


def cosine_similarity_matrix(x, y):
    return np.dot(x, y) / (np.sqrt(np.dot(x, x)) * np.sqrt(np.dot(y, y)))