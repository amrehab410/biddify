import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "./AuctionCard";
import BiddingCard from "./BiddingCard";
import { fetchAuctions } from "../api/auth";
import "./style/Dashboard.css";

const bids = [
  {
    title: "Vintage Camera",
    description: "A rare vintage camera in excellent condition.",
    startBid: 100,
    currentBid: 150,
    endTime: "2024-07-01T12:00:00Z",
    "auction-id": 300,
  },
  {
    title: "Antique Vase",
    description: "An exquisite antique vase from the 19th century.",
    startBid: 200,
    currentBid: 250,
    endTime: "2024-07-02T15:00:00Z",
    "auction-id": 310,
  },
];

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("auctions");
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [auctions, setAuction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAuctions(email);
        setAuction(res);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div>
      <h1>Welcome, {authState.email}!</h1>
      <div className="App">
        <div className="navbar">
          <button
            className={activeTab === "auctions" ? "active" : ""}
            onClick={() => setActiveTab("auctions")}
          >
            Your Auctions
          </button>
          <button
            className={activeTab === "bids" ? "active" : ""}
            onClick={() => setActiveTab("bids")}
          >
            Your Bids
          </button>
        </div>
      </div>
      {activeTab === "auctions" && (
        <>
          <h2>Your Auctions</h2>
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
        </>
      )}
      {activeTab === "bids" && (
        <>
          <h2>Your Bids</h2>
          <div className="auctions-list">
            {bids.map((bid, index) => (
              <BiddingCard
                key={bid.index}
                auction_id={bid.index}
                title={bid.title}
                description={bid.description}
                startBid={bid.startBid}
                currentBid={bid.currentBid}
                endTime={bid.endTime}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
