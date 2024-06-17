from datetime import datetime
from app import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Coloumn(db.Integer, primary_key= True)
    username = db.Coloumn(db.String(20), unique = True, nullable = False)
    email = db.Coloumn(db.String(120), unique = True, nullable = False)
    password = db.Coloumn(db.String(60), nullable = False)

    
    def __repr__(self):
        return f"User('{self.username}'. '{self.email}')"
