from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extenstion import db
from modelpayment import Payment

payment_bp = Blueprint("payment", __name__)

@payment_bp.route("/create", methods=["POST"])
@jwt_required()
def create_payment():
    user_id = get_jwt_identity()
    data = request.get_json()

    plan = data.get("plan")
    amount = data.get("amount")

    if not plan or not amount:
        return jsonify({"message": "Missing data"}), 400

    payment = Payment(
        user_id=user_id,
        plan=plan,
        amount=amount
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({
        "message": "Payment created",
        "payment_id": payment.id
    }), 201
