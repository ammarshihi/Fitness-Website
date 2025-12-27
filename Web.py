from flask import render_template, request, redirect, flash , Flask ,session
from models.user import User
from extenstion import db
import pymysql


web = Flask(__name__)
web.secret_key = "fitlife-secret-key"
web.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:Davidsimon2005%40@localhost:3307/fitlife"

web.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(web)

with web.app_context():
    try:
        db.create_all()
        print(db.engine.url)
    except Exception as e:
        print(f"Database connection warning: {e}")
        print("Running without database connection. Please ensure MySQL is running.")

from routes.admin import admin
web.register_blueprint(admin)

from routes.auth import auth
from routes.admin import admin
from routes.api import api

web.register_blueprint(auth)
web.register_blueprint(api)


@web.route("/")
def home():
    return render_template("Home.html")

@web.route("/admin")
def admin_page():
    if not session.get("is_admin"):
        return redirect("/sign")

    return render_template("admin.html")

@web.route("/calc")
def calc():
    return render_template("calc.html")

@web.route("/contact")
def contact():
    return render_template("contact.html")

@web.route("/favorites")
def favorites():
    return render_template("favorites.html")

@web.route("/gainlose")
def gainlose():
    return render_template("gainlose.html")

@web.route("/gainm")
def gainm():
    return render_template("gainM.html")

@web.route("/losefat")
def losefat():
    return render_template("losefat.html")

@web.route("/mealfit")
def mealfit():
    return render_template("mealfit.html")

@web.route("/meallose")
def meallose():
    return render_template("meallose.html")

@web.route("/packages")
def packages():
    return render_template("packages.html")


@web.route("/register")
def register():
    return render_template("register.html")


@web.route("/sign")
def sign():
    return render_template("sign.html")

@web.route("/dashboard")
def dashboard():
    return render_template("userdashboard.html")

@web.route("/about")
def about():
    return render_template("about.html")

@web.route("/payment")
def payment():
    return render_template("payment.html")

if __name__ == "__main__":
    web.run(debug=True)


