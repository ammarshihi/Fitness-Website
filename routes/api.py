from flask import Blueprint, jsonify
from models.user import User
from extenstion import db


api = Blueprint("api", __name__)

@api.route("/api/users")
def get_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "firstname": u.firstname,
            "email": u.email
        } for u in users
    ])

@api.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"})
