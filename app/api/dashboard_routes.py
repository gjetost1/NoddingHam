from flask import Blueprint, jsonify
import os
from datetime import datetime, timezone, timedelta
from alpaca_trade_api.rest import REST, TimeFrame

dashboard_routes = Blueprint("dashboard", __name__)


api = REST(os.environ.get("APCA_API_KEY_ID"), os.environ.get("APCA_API_SECRET_KEY"), api_version='v2')
# api = REST("AKAH50HMXHBHFPJF6G4R", "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE", api_version='v2')

@dashboard_routes.route("/")
def home_page():
    # get 10 stocks
    # quotes_call = api.get_quotes("AAPL", "2021-02-01", "2021-02-08", limit=1000).df

    tickers = ["AAPL", "AMZN", "GOOG"]
    limit = 365*2

    # RFC3339 date format
    end_date = datetime.now(timezone.utc).astimezone()
    delta = timedelta(days=365*2)
    start_date = end_date-delta

    end_date.isoformat()
    start_date.isoformat()
    quotes_call = api.get_barset(tickers,
                                 "day",
                                 limit,
                                 start_date,
                                 end_date)

    return quotes_call
