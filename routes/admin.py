from flask import Blueprint, render_template, request, redirect, jsonify , session
from models.user import User
from extenstion import db

admin = Blueprint("admin", __name__)

@admin.route("/admin/users")
def users_page():
    users = User.query.all()
    return render_template("admin_users.html", users=users)

#  Add User (Service)
@admin.route("/admin/users/add", methods=["POST"])
def add_user():
    try:
        user = User(
            firstname=request.form["firstname"],
            email=request.form["email"]
        )
        db.session.add(user)
        db.session.commit()
        return redirect("/admin/users")
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to add user: {str(e)}"}), 500

#  Delete User (Service)
@admin.route("/admin/users/delete/<int:id>")
def delete_user(id):
    try:
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return redirect("/admin/users")
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to delete user: {str(e)}"}), 500

# 🌐 API Endpoint 
@admin.route("/api/users")
def users_api():
    users = User.query.all()
    return jsonify([
        {"id": u.id, "firstname": u.firstname, "email": u.email}
        for u in users
    ])


