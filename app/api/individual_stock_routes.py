from flask import Blueprint, jsonify
from app.utils import get_historical_data
from app.models import db, Security

individual_stock_routes = Blueprint("individual-stock", __name__)

# Grab ticker for individual securities
@individual_stock_routes.route('/securities/<ticker>')
def individual_stock(ticker):
    # Query database for individual interpolated ticker
    security = [Security.query.get(ticker)]

    historical_data = get_historical_data(tickers).df
    res = remap_keys(historical_data.to_dict())
    return res
