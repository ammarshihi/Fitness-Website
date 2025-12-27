from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class MealPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    goal = db.Column(db.String(50))  
    # gain_muscle / lose_fat

    training_type = db.Column(db.String(50))  
    # strength / cardio / mixed

    name = db.Column(db.String(100))
    calories = db.Column(db.Integer)
    protein = db.Column(db.Integer)
    carbs = db.Column(db.Integer)
    fat = db.Column(db.Integer)
