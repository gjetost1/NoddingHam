from .db import db
from sqlalchemy.orm import relationship

class UserSecurity(db.Model):
    __tablename__ = "user_securities"

    id = db.Column(db.Integer, primary_key = True)
    relation = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    security_id = db.Column(db.Integer, db.ForeignKey("securities.id"))
