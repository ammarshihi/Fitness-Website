class Config:
    SECRET_KEY = "auth-secret-key"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:password@localhost:3307/fitlife"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
