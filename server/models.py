from .database import db


class Face(db.Model):
	__tablename__ = 'face'

	id = db.Column(db.Integer, primary_key=True)
	location = db.Column(db.Text(), nullable=False)
	landmarks = db.Column(db.Text(), nullable=False)
	encoding = db.Column(db.Text(), nullable=False)

	# Many-to-one relationship
	profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
	profile = db.relationship("Profile", uselist=False, backref=db.backref("faces", cascade="all,delete"))

	# Many-to-one relationship
	photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'))
	photo = db.relationship("Photo", uselist=False, backref=db.backref("faces", cascade="all,delete"))

	def __repr__(self):
		return f"<Face of {self.profile.name} in Photo {self.photo.id} (id: {self.id})>"
	

class Photo(db.Model):
	__tablename__ = 'photo'

	id = db.Column(db.Integer, primary_key=True)
	url = db.Column(db.Text(), nullable=False, unique=True)

	def __repr__(self):
		return f"<Photo {self.id} ({len(self.faces)} faces)>"


class Profile(db.Model):
	__tablename__ = 'profile'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100), nullable=False)

	# One-to-one relationship
	thumbnail_id = db.Column(db.Integer, db.ForeignKey('photo.id'))
	thumbnail = db.relationship("Photo", uselist=False, backref=db.backref("thumbnail_profile", uselist=False))


	def __repr__(self):
		return f"<Profile {self.name}({self.id})>"
