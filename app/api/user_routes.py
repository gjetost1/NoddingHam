from flask import Blueprint, request, abort
from flask_login import login_required
from app.models import User, Security, UserSecurity
from app.utils.api import get_historical_data, remap_keys
from app.utils.database import get_relation, post_relation, delete_relation

user_routes = Blueprint('users', __name__)


# USER AUTHENTICATION

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# WATCHLIST

@user_routes.route('/<int:user_id>/watchlist', methods=['GET'])
@login_required
def watchlist(user_id):
    tickers = get_relation(user_id, "portfolio")
    historical_data = get_historical_data(tickers).df
    watchlist_securities = remap_keys(historical_data.to_dict())

    return watchlist_securities


@user_routes.route('/<int:user_id>/watchlist/<ticker>',
                   methods=['POST', 'DELETE'])
@login_required
def watchlist_edit(user_id, ticker):
    security = Security.query.filter(Security.ticker == ticker).first()

    if request.method == "POST":
        post_relation(user_id, security, ticker, "watchlist")
        return {"message": "Posted watchlist security"}
    elif request.method == "DELETE":
        delete_relation(user_id, ticker, "watchlist")
        return {"message": "Deleted watchlist security"}
    else:
        return abort(404)


# PORTFOLIO

@user_routes.route('/<int:user_id>/portfolio', methods=['GET'])
@login_required
def portfolio(user_id):
    tickers = get_relation(user_id, "portfolio")
    historical_data = get_historical_data(tickers).df
    portfolio_securities = remap_keys(historical_data.to_dict())

    return portfolio_securities


@user_routes.route('/<int:user_id>/portfolio/<ticker>',
                   methods=['POST', 'DELETE'])
@login_required
def portfolio_edit(user_id, ticker):
    security = Security.query.filter(Security.ticker == ticker).first()

    if request.method == "POST":
        post_relation(user_id, security, ticker, "portfolio")
        return {"message": "Posted portfolio security"}
    elif request.method == "DELETE":
        delete_relation(user_id, ticker, "portfolio")
        return {"message": "Deleted portfolio security"}
    else:
        return abort(404)
