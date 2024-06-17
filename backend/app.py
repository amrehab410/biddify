from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user, login_required
from flask_cors import CORS
from forms import RegistrationForm, LoginForm
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
CORS(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Coloumn(db.Integer, primary_key = True)
    username = db.Coloumn(db.String(20), unique = True, nullable = False)
    email = db.Coloumn(db.String(120), unique = True, nullable = False)
    password = db.Coloumn(db.String(60), nullable = False)

    def __repr__(self):
        return f"User('{self.username}', '{eslf.email}')"

@app.route("/register", methods = ['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(email = data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user, remember = data.get('remember', False))
        return jsonify({"message": "Login Successful"}), 200
    else:
        return jsonify({"message": "Login Unsuccessful. Please check email and password"})


@app.route("/logout", methods = ['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout Successful"}), 200

if __name__ == '__main__':
    app.run(debug= True)
