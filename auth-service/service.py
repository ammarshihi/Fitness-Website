from flask import Flask, jsonify
from extenstion import db
from config import Config
from routes.auth import auth
from flask_jwt_extended import jwt_manager

def create_app():
    app = Flask(__name__)
    jwt = jwt_manager(app)
    app.config.from_object(Config)

    db.init_app(app)

    app.register_blueprint(auth, url_prefix="/auth")

    @app.route("/health")
    def health():
        return jsonify({"status": "Auth Service Running"})

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(port=5001, debug=True)
