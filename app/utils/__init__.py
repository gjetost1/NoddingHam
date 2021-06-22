from datetime import datetime, timezone, timedelta
from alpaca_trade_api.rest import REST, TimeFrame
import os

api = REST(os.environ.get("APCA_API_KEY_ID"), os.environ.get("APCA_API_SECRET_KEY"), api_version='v2')
# api = REST("AKAH50HMXHBHFPJF6G4R", "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE", api_version='v2')

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
