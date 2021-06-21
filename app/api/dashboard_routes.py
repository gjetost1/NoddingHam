from flask import Blueprint, jsonify

dashboard_routes = Blueprint("dashboard", __name__)

@dashboard_routes.route("/")
def home_page():
    print("home page"*100)
    return {"message": "home page"}
