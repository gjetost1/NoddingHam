from datetime import datetime, timezone, timedelta
from alpaca_trade_api.rest import REST, TimeFrame
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
    json_mapping = dict()

    for parent_key, parent_value in mapping.items():
        new_parent_key = f"{parent_key[0]}-{parent_key[1]}"
        new_parent_value = dict()

        for child_key, child_value in parent_value.items():
            new_child_key = child_key.strftime("%d-%b-%Y (%H:%M:%S.%f)")
            new_parent_value[new_child_key] = child_value

        json_mapping[new_parent_key] = new_parent_value

    return json_mapping
