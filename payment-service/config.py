class Config:
    SECRET_KEY = "payment-secret-key"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:password@localhost/payment_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "jwt-shared-secret"
