from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models.user import User
from extenstion import db

auth = Blueprint("auth", __name__)

# ======================
# Register
# ======================
@auth.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    firstname = data.get("firstname")
    email = data.get("email")
    password = data.get("password")

    if not firstname or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 409

    hashed = generate_password_hash(password)

    user = User(
        firstname=firstname,
        email=email,
        password_hash=hashed
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# ======================
# Login
# ======================
@auth.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(
        identity={
            "user_id": user.id,
            "is_admin": user.is_admin
        }
    )

    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "firstname": user.firstname,
            "email": user.email,
            "is_admin": user.is_admin
        }
    }), 200
