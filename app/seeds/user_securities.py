from app.models import db, UserSecurity

def seed_user_securities():
    seed1 = UserSecurity(relation='watchlist', user_id='1', security_id='1')
    seed2 = UserSecurity(relation='watchlist', user_id='1', security_id='2')
    seed3 = UserSecurity(relation='watchlist', user_id='1', security_id='3')
    seed4 = UserSecurity(relation='portfolio', user_id='1', security_id='4')


    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)
    db.session.add(seed4)

    db.session.commit()


def undo_user_securities():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
