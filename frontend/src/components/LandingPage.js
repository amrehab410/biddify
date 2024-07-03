import React from "react";
import { Link } from "react-router-dom";
import "./style/LandingPage.css";
import cover from "./style/Pics/cover.jpg";
import { FaGavel, FaChartLine, FaMoneyCheckAlt } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <img src={cover} alt="cover" className="cover" />
        <div className="hero-content">
          <h1>Welcome to Biddify</h1>
          <p>Smart Bidding, Bigger Wins</p>
          <Link to="/auctions-page" className="cta-button">
            Start Bidding
          </Link>
        </div>
      </section>

      <section className="about-section">
        <h2>About Biddify</h2>
        <p>
          Biddify is your ultimate online auction platform where smart bidding
          leads to bigger wins. We offer a wide range of auction items, from
          vintage collectibles to the latest gadgets. Join our community of
          bidders and experience the thrill of winning!
        </p>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <FaGavel size={50} />
            <h3>Wide Range of Auctions</h3>
            <p>Explore a variety of auctions across different categories.</p>
          </div>
          <div className="feature">
            <FaMoneyCheckAlt size={50} />
            <h3>Create Your Own Auctions</h3>
            <p>Sell a lot of items through creating your own auctions.</p>
          </div>
          <div className="feature">
            <FaChartLine size={50} />
            <h3>Real-Time Updates</h3>
            <p>Stay informed with live updates on your bids and auctions.</p>
          </div>
        </div>
      </section>

      <section className="project-about-section">
        <h2>The Story Behind Biddify</h2>
        <p>
          The idea for Biddify was inspired during countless hours playing FIFA
          Ultimate Team. The thrill of bidding on players in the game sparked
          the concept of creating an auction platform where users can experience
          the same excitement in real life. This project is a part of our
          portfolio for Holberton School, showcasing our skills and dedication.
        </p>
        <div className="team-members">
          <div className="team-member">
            <h3>Ahmed Hesham</h3>
            <p>
              LinkedIn: 
              <a href="https://www.linkedin.com/in/ahmed-hesham-khattab/" target="_blank" rel="noopener noreferrer">
                Ahmed Hesham
              </a>
            </p>
            <p>
              GitHub: 
              <a href="https://github.com/AhmedHesham2112" target="_blank" rel="noopener noreferrer">Ahmed Hesham</a>
            </p>
            <p>
              Twitter: <a href="https://x.com/CoolAsBuck" target="_blank" rel="noopener noreferrer">Ahmed Hesham</a>
            </p>
          </div>
          <div className="team-member">
            <h3>Amr Ehab</h3>
            <p>
              LinkedIn: 
              <a href="https://www.linkedin.com/in/amrehab410" target="_blank" rel="noopener noreferrer">Amr Ehab</a>
            </p>
            <p>
              GitHub: <a href="https://github.com/amrehab410" target="_blank" rel="noopener noreferrer">Amr Ehab</a>
            </p>
            <p>
              Twitter: <a href="https://x.com/YesIamAmr" target="_blank" rel="noopener noreferrer">Amr Ehab</a>
            </p>
          </div>
          <div className="team-member">
            <h3>Ahmed Tarek</h3>
            <p>
              LinkedIn: 
              <a href="https://www.linkedin.com/in/ahmed-tarek-23a542202/" target="_blank" rel="noopener noreferrer">
                Ahmed Tarek
              </a>
            </p>
            <p>
              GitHub: <a href="https://github.com/ahmedtiko" target="_blank" rel="noopener noreferrer">Ahmed Tarek</a>
            </p>
            <p>
              Twitter: <a href="https://x.com/SoftwaresagabyT" target="_blank" rel="noopener noreferrer">Ahmed Tarek</a>
            </p>
          </div>
        </div>
        <p>
          Check out our project on GitHub: 
          <a href="https://github.com/amrehab410/biddify" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Biddify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
