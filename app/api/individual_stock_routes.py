from flask import Blueprint, jsonify
from app.utils import get_historical_data
from app.models import db, Security


# Grab ticker for individual securities
@individual_stock_routes.route('/securities/<ticker>')
def individual_stock(ticker):
    # Query database for individual interpolated ticker
    security = [Security.query.get(ticker)]

    historical_data = get_historical_data(security).df
    historical_data_dict = historical_data.to_dict()
    res = dict()
    
    for key, value in historical_data_dict.items():
        new_key = f"{key[0]}-{key[1]}"
        res[new_key] = value

    print(res)

    return res
