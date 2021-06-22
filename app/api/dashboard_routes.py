from flask import Blueprint
from app.utils import get_historical_data, remap_keys

dashboard_routes = Blueprint("dashboard", __name__)


@dashboard_routes.route("/")
def home_page():
    tickers = ["AAPL", "AMZN", "GOOG"]

    historical_data = get_historical_data(tickers).df
    res = remap_keys(historical_data.to_dict())

    return res
