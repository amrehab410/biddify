import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { fetchAuctions } from "../api/auth";
import AuctionCard from "./AuctionCard";


const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [auctions, setAuction] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAuctions(email);
        setAuction(res)
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [email]);

  const redirectToCreateAuction = () => {
    navigate("/create-auction");
  };

  const redirectToAuctionsPage = () => {
    navigate("/auctions-page");
  };

  return (
    <>
      <div>
        <h1>Welcome, {authState.email}!</h1>
        <h1>Your Auctions</h1>
        <div className="auctions-list">
          {auctions.length === 0 && <p>No auctions available</p>}
          {auctions.map((auction) => (
            <AuctionCard
              key={auction.auction_id}
              title={auction.title}
              description={auction.description}
              startBid={auction.starting_bid}
              currentBid={auction.current_bid}
              endTime={auction.end_time}
            />
          ))}
        </div>
        <button className="button" onClick={redirectToCreateAuction}>
          Create Auction
        </button>
        <button className="button" onClick={redirectToAuctionsPage}>
          Place Bid
        </button>
      </div>
      <div className="App">
        <Logout />
      </div>
    </>
  );
};

export default Dashboard;
