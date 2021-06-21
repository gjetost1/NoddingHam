from flask import Blueprint, jsonify

dashboard_routes = Blueprint('dashboard', __name__)

@dashboard_routes.route('/')
