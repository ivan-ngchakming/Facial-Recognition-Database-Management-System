from server.faces.arcface.model_zoo import landmark
import numpy as np
import PIL
import cv2

from .database import db
from .faces.arcface import face_app


class Profile(db.Model):
	__tablename__ = 'profile'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100), nullable=False)

	# One-to-one relationship
	thumbnail_id = db.Column(db.Integer, db.ForeignKey('face.id'))
	thumbnail = db.relationship(
		"Face", 
		uselist=False, 
		foreign_keys=thumbnail_id, 
		primaryjoin="Profile.thumbnail_id==Face.id",
		post_update=True,
	)

	@property
	def faces_count(self):
		return len(self.faces)
	
	def __repr__(self):
		return f"<Profile {self.name}({self.id})>"


class Face(db.Model):
	__tablename__ = 'face'

	id = db.Column(db.Integer, primary_key=True)
	location = db.Column(db.PickleType, nullable=False)
	landmarks = db.Column(db.PickleType, nullable=False)
	encoding = db.Column(db.PickleType, nullable=False)

	# Many-to-one relationship
	profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
	profile = db.relationship(
		"Profile", uselist=False, backref=db.backref("faces", cascade="all,delete"),
		foreign_keys=profile_id
	)

	# Many-to-one relationship
	photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'))
	photo = db.relationship("Photo", uselist=False, backref=db.backref("faces", cascade="all,delete"))
	
	def __repr__(self):
		if self.profile is None:
			return f"<Face of unknown person in Photo {self.photo.id} (id: {self.id})>"
		else:
			return f"<Face of {self.profile.name} in Photo {self.photo.id} (id: {self.id})>"


class Photo(db.Model):
	__tablename__ = 'photo'

	id = db.Column(db.Integer, primary_key=True)
	array = db.Column(db.PickleType, unique=True)
	width = db.Column(db.Integer, nullable=False)
	height = db.Column(db.Integer, nullable=False)

	def __init__(self, image, *args, **kwargs) -> None:
		super().__init__(*args, **kwargs)
		self.width, self.height = image.size
		self.array = np.array(image)

		cvimg = cv2.cvtColor(self.array, cv2.COLOR_RGB2BGR)
		arcfaces = face_app.get(cvimg)
		
		print(f"{len(arcfaces)} faces found in picture")
		for arcface in arcfaces:
			print(arcface.location)
			face = Face(
				location=arcface.location,
				landmarks=arcface.landmark_2d_106,
				encoding=arcface.embedding,
			)
			self.faces.append(face)
		
		# face_locations = face_recognition.face_locations(self.array)
		# face_landmarks = face_recognition.face_landmarks(self.array)
		# face_encodings = face_recognition.face_encodings(self.array)

		# face_info = list(zip(face_locations, face_landmarks, face_encodings))
		# print(f"{len(face_info)} faces found in image")
		# for location, landmarks, encoding in face_info:
		# 	face = Face(location=location, landmarks=landmarks, encoding=encoding)
		# 	self.faces.append(face)

	@property
	def image(self):
		return PIL.Image.fromarray(self.array)
	
	def __repr__(self):
		return f"<Photo {self.id} ({len(self.faces)} faces)>"


