import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "./AuctionCard";
import BiddingCard from "./BiddingCard";
import { fetchAuctions, fetchBid } from "../api/auth";
import "./style/Dashboard.css";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("auctions");
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [auctions, setAuction] = useState([]);
  const [bids, setBids] = useState([]);


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
    const fetchBids = async () => {
      try {
        const res = await fetchBid(email);
        setBids(res);
        console.log(res)
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    fetchBids();
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
                auction_id={auction.auction_id}
                title={auction.title}
                description={auction.description}
                startBid={auction.starting_bid}
                buyNowPrice={auction.buy_now_price}
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
            {bids.map((bid) => (
              <BiddingCard
                key={bid.auction_id}
                auction_id={bid.auction_id}
                title={bid.title}
                description={bid.description}
                startBid={bid.starting_bid}
                buyNowPrice={bid.buy_now_price}
                currentBid={bid.current_bid}
                endTime={bid.end_time}
                status={bid.status}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
