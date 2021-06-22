from flask import Blueprint, jsonify
# import os
# from datetime import datetime, timezone, timedelta
# from alpaca_trade_api.rest import REST, TimeFrame
from app.utils import get_historical_data

dashboard_routes = Blueprint("dashboard", __name__)


@dashboard_routes.route("/")
def home_page():
    # get 10 stocks
    # quotes_call = api.get_quotes("AAPL", "2021-02-01", "2021-02-08", limit=1000).df

    tickers = ["AAPL", "AMZN", "GOOG"]
    # limit = 365*2

    # # RFC3339 date format
    # end_date = datetime.now(timezone.utc).astimezone()
    # delta = timedelta(days=365*2)
    # start_date = end_date-delta

    # end_date.isoformat()
    # start_date.isoformat()
    # historical_data = api.get_barset(tickers,
    #                              "day",
    #                              limit,
    #                              start_date,
    #                              end_date)

    historical_data = get_historical_data(tickers).df
    historical_data_dict = historical_data.to_dict()
    res = dict()
    for key, value in historical_data_dict.items():
        new_key = f"{key[0]}-{key[1]}"
        res[new_key] = value

    print(res)

    return res
