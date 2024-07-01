import React from "react";
import { Link } from "react-router-dom";
import "./style/LandingPage.css";
import logo from "./style/Pics/logo.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Welcome to Biddify</h1>
        <p>Smart Bidding, Bigger Wins</p>
        <Link to="/auctions-page" className="cta-button">Start Bidding</Link>
      </section>
      
      <section className="about-section">
        <h2>About Biddify</h2>
        <p>
          Biddify is your ultimate online auction platform where smart bidding leads to bigger wins. We offer a wide range of auction items, from vintage collectibles to the latest gadgets. Join our community of bidders and experience the thrill of winning!
        </p>
      </section>
      
      <section className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Wide Range of Auctions</h3>
            <p>Explore a variety of auctions across different categories.</p>
          </div>
          <div className="feature">
            <h3>Secure Transactions</h3>
            <p>Experience safe and secure bidding and payment processes.</p>
          </div>
          <div className="feature">
            <h3>Real-Time Updates</h3>
            <p>Stay informed with live updates on your bids and auctions.</p>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <p>&copy; 2024 Biddify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;