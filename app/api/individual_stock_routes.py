from flask import Blueprint, jsonify
from app.models import db

individual_stock_routes = Blueprint("individual-stock", __name__)

@individual_stock_routes.route('/securities/<ticker>')
def individual_stock():
    security = Securities.query.filter()
