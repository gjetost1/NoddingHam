from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Security, UserSecurity
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)


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


@user_routes.route('/<int:id>/watchlist', methods=['GET'])
# @login_required
def watchlist(id):
    # query database for tickers associated with a userId
    # make an api call for the stock data of each ticker
    # send back the stock info to the front end
    user_data = User.query.get_or_404(id)
    tickers = [security.ticker for security in user_data.securities]


    return {"message": "user watchlist page", "tickers": tickers}


@user_routes.route('/<int:id>/portfolio', methods=['GET'])
# @login_required
def portfolio(id):
    # query database for tickers associated with a userId
    # make an api call for the stock data of each ticker
    # send back the stock info to the front end

    user_data = User.query.get_or_404(id)
    tickers = [security.ticker for security in user_data.securities]


    return {"message": "user portfolio page", "tickers": tickers}
