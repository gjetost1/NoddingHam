from .db import db
from sqlalchemy.orm import relationship


class Security(db.Model):
    __tablename__ = 'securities'

    id = db.Column(db.Integer, primary_key = True)
    ticker = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String, nullable=False)

    users = relationship("User",
                         secondary="user_securities",
                         back_populates="securities")

    def to_dict(self):
        return {
          "id": self.id,
          "ticker": self.ticker,
          "type": self.type
        }
