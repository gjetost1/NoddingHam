from flask import Blueprint, jsonify
from app.utils import get_historical_data, remap_keys
from app.models import db, Security

individual_stock_routes = Blueprint("individual-stock", __name__)

# INDIVIDUAL SECURITIES

@individual_stock_routes.route('/securities/<ticker>')
def individual_stock(ticker):
    # Grab ticker for individual securities
    # Query database for individual interpolated ticker
    security = [Security.query.get(ticker)]

    historical_data = get_historical_data(security).df
    res = remap_keys(historical_data.to_dict())
    return res
