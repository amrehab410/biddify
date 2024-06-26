from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user, login_required
from flask_cors import CORS
from config import Config
from flask import Response
from sqlalchemy import not_




app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
CORS(app)

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone_no = db.Column(db.String(255), nullable=False)
    auctions = db.relationship("Auctions", back_populates="auctioneer")
    bids = db.relationship("Bids", back_populates="bidder")
    payments = db.relationship("Payments", back_populates="user")
    user_auctions = db.relationship("UserAuctions", back_populates="user")

    def get_id(self):
        return self.user_id

    def __repr__(self):
        return f"User('{self.first_name}', '{self.last_name}', '{self.email}')"


class Auctions(db.Model):
    __tablename__ = 'auctions'
    auction_id = db.Column(db.Integer, primary_key=True)
    auctioneer_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    starting_bid = db.Column(db.Float, nullable=False)
    current_bid = db.Column(db.Float, nullable=True)
    auctioneer = db.relationship("Users", back_populates="auctions")
    bids = db.relationship("Bids", back_populates="auction")
    user_auctions = db.relationship("UserAuctions", back_populates="auction")

    def to_dict(self):
        return {
            'auction_id': self.auction_id,
            'auctioneer_id': self.auctioneer_id,
            'title': self.title,
            'description': self.description,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat(),
            'starting_bid': self.starting_bid,
            'current_bid': self.current_bid,
        }

    def __repr__(self):
        return f"Auction('{self.title}', '{self.start_time}', '{self.end_time}')"


class Bids(db.Model):
    __tablename__ = 'bids'
    bid_id = db.Column(db.Integer, primary_key=True)
    auction_id = db.Column(db.Integer, db.ForeignKey('auctions.auction_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    bid_amount = db.Column(db.Float, nullable=False)
    bid_time = db.Column(db.DateTime, nullable=False)
    auction = db.relationship("Auctions", back_populates="bids")
    bidder = db.relationship("Users", back_populates="bids")

    def __repr__(self):
        return f"Bid('{self.bid_amount}', '{self.bid_time}')"


class Payments(db.Model):
    __tablename__ = 'payments'
    payment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    payment_amount = db.Column(db.Float, nullable=False)
    payment_time = db.Column(db.DateTime, nullable=False)
    payment_method = db.Column(db.String(255), nullable=False)
    card_number = db.Column(db.String(255), nullable=True)
    expiry_date = db.Column(db.Date, nullable=True)
    user = db.relationship("Users", back_populates="payments")

    def __repr__(self):
        return f"Payment('{self.payment_amount}', '{self.payment_time}')"


class UserAuctions(db.Model):
    __tablename__ = 'user_auctions'
    user_auction_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    auction_id = db.Column(db.Integer, db.ForeignKey('auctions.auction_id'), nullable=False)
    user = db.relationship("Users", back_populates="user_auctions")
    auction = db.relationship("Auctions", back_populates="user_auctions")

    def __repr__(self):
        return f"UserAuction('User ID: {self.user_id}', 'Auction ID: {self.auction_id}')"



@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


@app.route("/register", methods = ['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    users = Users(first_name = data['first_name'], last_name = data['last_name'], phone_no = data['phone_num'], email = data['email'], password_hash = data['password'])
    db.session.add(users)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201
    
@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    user = Users.query.filter_by(email=data['email']).first()
    if user and (user.password_hash == data['password']):
        login_user(user, remember=data.get('remember', False))
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Login Unsuccessful. Please check email and password"}), 401

@app.route("/create-auction", methods=['POST'])
def create_auction():
    data = request.get_json()
    print(data)
    user = Users.query.filter_by(email=data['email']).first()
    auction = Auctions(auctioneer_id= user.user_id, title = data['title'],
                       description=data['description'], start_time = data['startTime'],
                       end_time = data['endTime'], starting_bid = data['startBid'], current_bid = 0)
    db.session.add(auction)
    db.session.commit()
    return jsonify({"message": "Auction created successfully"}), 201
    


@app.route("/logout", methods = ['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout Successful"}), 200


@app.route("/dashboard", methods=['POST'])
def fetch_auctions():
    data = request.get_json()
    print(data)
    user = Users.query.filter_by(email=data).first()
    auctions = Auctions.query.filter_by(auctioneer_id=user.user_id).all()
    auctions_list = [auction.to_dict() for auction in auctions]
    print(auctions_list)
    return jsonify(auctions_list), 200

@app.route("/auctions-page", methods=['POST'])
def fetch_all_auctions():
    data = request.get_json()
    print(data)
    user = Users.query.filter_by(email=data).first()
    auctions = Auctions.query.filter(not_(Auctions.auctioneer_id == user.user_id)).all()
    auctions_list = [auction.to_dict() for auction in auctions]
    print(auctions_list)
    return jsonify(auctions_list), 200

@app.route("/place-bid", methods=['POST'])
def place_bid():
    data = request.get_json()
    print(data)
    user = Users.query.filter_by(email=data["email"]).first()
    auctions = Auctions.query.filter_by(auction_id = data["auction_id"]).first()
    bid = Bids(auction_id = auctions.auction_id, user_id = user.user_id, bid_amount = data["bid_amount"], bid_time = data["bid_time"])
    auctions.current_bid = data["bid_amount"]
    db.session.add(bid)
    db.session.commit()
    return jsonify({"message": "Bid made successfully"}), 201
    

if __name__ == '__main__':
    app.run(debug= True, port=9000)