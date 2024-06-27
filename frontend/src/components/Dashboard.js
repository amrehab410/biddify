import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { fetchAuctions } from "../api/auth";
import AuctionCard from "./AuctionCard";

const bids = [
    {
      "title": "Vintage Camera",
      "description": "A rare vintage camera in excellent condition.",
      "startBid": 100,
      "currentBid": 150,
      "endTime": "2024-07-01T12:00:00Z",
      "auction-id": 300
    },
    {
      "title": "Antique Vase",
      "description": "An exquisite antique vase from the 19th century.",
      "startBid": 200,
      "currentBid": 250,
      "endTime": "2024-07-02T15:00:00Z",
      "auction-id": 310
    }
  ]

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
      </div>
      <div className="App">
      <button className="button" onClick={redirectToCreateAuction}>
          Create Auction
        </button>
        <button className="button" onClick={redirectToAuctionsPage}>
          Place Bid
        </button>
        <Logout />
      </div>
    </>
  );
};

export default Dashboard;
