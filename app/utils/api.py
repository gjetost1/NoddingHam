from datetime import datetime, timezone, timedelta
from alpaca_trade_api.rest import REST
import os

api = REST(os.environ.get("APCA_API_KEY_ID"),
           os.environ.get("APCA_API_SECRET_KEY"),
           api_version='v2')


def get_historical_data(tickers):
    # Maximum number of days per bar
    limit = 365*2

    # RFC3339 date format
    end_date = datetime.now(timezone.utc).astimezone()
    delta = timedelta(days=365*2)
    start_date = end_date-delta
    end_date.isoformat()
    start_date.isoformat()

    historical_data = api.get_barset(tickers,
                                     "day",
                                     limit,
                                     start_date,
                                     end_date)

    return historical_data


def remap_keys(mapping):
    new_mapping = dict()

    for parent_key, parent_value in mapping.items():
        ticker = parent_key[0]
        metric = parent_key[1]

        sorting_list = [{"date": k.date(), metric: v} for k, v in parent_value.items()]
        sorted_data = sorted(sorting_list, key=lambda l: l["date"])

        if ticker not in new_mapping:
            new_mapping[ticker] = [data_point for data_point in sorted_data]
        else:
            for index, element in enumerate(new_mapping[ticker]):
                element[metric] = sorted_data[index][metric]

    return new_mapping
