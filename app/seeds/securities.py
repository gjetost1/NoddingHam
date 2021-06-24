from app.models import db, Security

def seed_securities():
    seed1 = Security(ticker: 'AAPL' , type: 'equity')
    seed2 = Security(ticker: 'GOOG' , type: 'equity')
    seed3 = Security(ticker: 'DIS' , type: 'equity')
    seed4 = Security(ticker: 'SBUX' , type: 'equity')
    seed5 = Security(ticker: 'NFLX' , type: 'equity')

    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)
    db.session.add(seed4)
    db.session.add(seed5)

    db.session.commit()

def undo_securities():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
