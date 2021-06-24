from app.models import db, Security

def seed_user_securities():
    seed1 = UserSecurity(relation='watchlist' , userId='1', securityId='1')
    seed2 = UserSecurity(relation='watchlist' , userId='1', securityId='2')
    seed3 = UserSecurity(relation='watchlist' , userId='1', securityId='3')


    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)

    db.session.commit()

def undo_user_securities():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
