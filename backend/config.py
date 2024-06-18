import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://ahmedtiko:biddiFy@123@localhost/biddify'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

