from .db import db
from sqlalchemy.orm import relationship


class Security(db.Model):
    __tablename__ = 'securities'

    id = db.Column(db.Integer, primary_key = True)
    ticker = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String, nullable=False)

    user = relationship("UserSecurity",
                        back_populates="security",
                        cascade="all, delete-orphan")

    def to_dict(self):
        return {
          "id": self.id,
          "ticker": self.ticker,
          "email": self.email
        }
