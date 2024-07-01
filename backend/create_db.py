from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from config import Config

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    phone_no = Column(String(255), nullable=False)
    auctions = relationship("Auction", back_populates="auctioneer")
    bids = relationship("Bid", back_populates="bidder")
    user_auctions = relationship("UserAuction", back_populates="user")

class Auction(Base):
    __tablename__ = 'auctions'
    auction_id = Column(Integer, primary_key=True)
    auctioneer_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    starting_bid = Column(Float, nullable=False)
    current_bid = Column(Float, nullable=True)
    buy_now_price = Column(Float, nullable=True)
    auctioneer = relationship("User", back_populates="auctions")
    bids = relationship("Bid", back_populates="auction")
    user_auctions = relationship("UserAuction", back_populates="auction")

class Bid(Base):
    __tablename__ = 'bids'
    bid_id = Column(Integer, primary_key=True)
    auction_id = Column(Integer, ForeignKey('auctions.auction_id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    bid_amount = Column(Float, nullable=False)
    bid_time = Column(DateTime, nullable=False)
    auction = relationship("Auction", back_populates="bids")
    bidder = relationship("User", back_populates="bids")

class UserAuction(Base):
    __tablename__ = 'user_auctions'
    user_auction_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    auction_id = Column(Integer, ForeignKey('auctions.auction_id'), nullable=False)
    user = relationship("User", back_populates="user_auctions")
    auction = relationship("Auction", back_populates="user_auctions")

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

session = Session()

session.commit()
