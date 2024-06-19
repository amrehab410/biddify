import os

class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqldb://biddify:admin@localhost/biddify_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

