from app.models import db, UserSecurity, Security


def get_relation(user_id, relation):
    portfolio = UserSecurity.query.filter(UserSecurity.user_id == user_id,
                                          UserSecurity.relation == relation).all()
    security_ids = [security.security_id for security in portfolio]
    securities = Security.query.filter(Security.id.in_(security_ids)).all()
    tickers = [security.ticker for security in securities]
    return tickers


def post_relation(user_id, security, ticker, relation):
    if not security:
        # HOW SHOULD WE FIND THE TYPE? Maybe have an dict to match?
        type = "stock"
        security = Security(ticker=ticker, type=type)
        db.session.add(security)
        db.session.commit()

    portfolio_addition = UserSecurity(relation=relation,
                                      user_id=user_id,
                                      security_id=security.id)
    db.session.add(portfolio_addition)
    db.session.commit()

    return None


def delete_relation(user_id, security, relation):

    user_security = UserSecurity.query.filter(UserSecurity.user_id == user_id,
                                              UserSecurity.security_id == security.id,
                                              UserSecurity.relation == relation).first()

    db.session.delete(user_security)
    db.session.commit()


    return None
