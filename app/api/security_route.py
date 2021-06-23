from flask import Blueprint
from app.utils import get_historical_data, remap_keys

security_route = Blueprint("individual-security", __name__)


# INDIVIDUAL SECURITY


@security_route.route('/<ticker>')
def individual_security(ticker):
    historical_data = get_historical_data([ticker.upper()]).df
    individual_security = remap_keys(historical_data.to_dict())

    # return "route success"
    return individual_security
