from flask import Blueprint, render_template, request, redirect, flash
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from extenstion import db
from flask import session

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        try:
            firstname = request.form["firstname"]
            email = request.form["email"]
            password = request.form["password"]
            
          

            hashed = generate_password_hash(password)

            user = User(
                firstname=firstname,
                email=email,
                password_hash=hashed
            
            )

            db.session.add(user)
            db.session.commit()

            flash("User registered successfully")
            return redirect("/sign")
        except Exception as e:
            db.session.rollback()
            flash(f"Registration error: Please ensure MySQL is running. Error: {str(e)}")
            return redirect("/register")

    return render_template("register.html")


@auth.route("/sign", methods=["GET", "POST"])
def sign():
    if request.method == "POST":
        try:
            email = request.form["email"]
            password = request.form["password"]

            #  Admin Login
            if email == "Davidsimon2005@gmail.com" and password == "DDSS306":
                session["is_admin"] = True
                session["user_id"] = "admin"
                return redirect("/admin")

            #  Normal User
            user = User.query.filter_by(email=email).first()

            if user and check_password_hash(user.password_hash, password):
                session["user_id"] = user.id
                session["is_admin"] = False
                return redirect("/dashboard")

            flash("Invalid email or password")
            return redirect("/sign")
        except Exception as e:
            flash(f"Login error: Please ensure MySQL is running. Error: {str(e)}")
            return redirect("/sign")

    return render_template("sign.html")


@auth.route("/logout")
def logout():
    session.clear()
    return redirect("/sign")




