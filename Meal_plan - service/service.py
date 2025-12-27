from flask import Flask, request, jsonify
from models import db, MealPlan
import config

app = Flask(__name__)
app.config.from_object(config)

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/meals", methods=["GET"])
def get_meals():
    goal = request.args.get("goal")
    training = request.args.get("training")

    query = MealPlan.query

    if goal:
        query = query.filter_by(goal=goal)
    if training:
        query = query.filter_by(training_type=training)

    meals = query.all()

    return jsonify([
        {
            "id": m.id,
            "name": m.name,
            "goal": m.goal,
            "training": m.training_type,
            "calories": m.calories,
            "protein": m.protein,
            "carbs": m.carbs,
            "fat": m.fat
        } for m in meals
    ])

