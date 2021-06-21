from flask import Blueprint, jsonify
# import alpaca_trade_api as tradeapi
import os

dashboard_routes = Blueprint("dashboard", __name__)

# alpaca = tradeapi.REST(key_id=os.environ.get("APCA_API_KEY_ID"),secret_key=os.environ.get("APCA_API_SECRET_KEY"))
from alpaca_trade_api.rest import REST

api = REST(os.environ.get("APCA_API_KEY_ID"), os.environ.get("APCA_API_SECRET_KEY"), api_version='v2')
# api = REST("AKAH50HMXHBHFPJF6G4R", "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE", api_version='v2')

@dashboard_routes.route("/")
def home_page():
    # get 10 stocks
    quotes_call = api.get_quotes("AAPL", "2021-02-08", "2021-02-08", limit=10).df
    quotes_data = quotes_call.to_dict()

    return quotes_data
