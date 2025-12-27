from flask import Flask
from config import Config
from extenstion import db, jwt
from routepayment import payment_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(payment_bp, url_prefix="/api/payment")

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(port=5002, debug=True)
