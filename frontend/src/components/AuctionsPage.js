import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "./AuctionCard";
import "./style/AuctionsPage.css";
import BiddingCard from "./BiddingCard";
import { fetchAllAuctions } from "../api/auth";



const AuctionsPage = () => {
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [auctions, setAuction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllAuctions(email);
        setAuction(res)
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="auctions-page">
      <h1>Available Auctions</h1>
      <div className="auctions-list">
        {auctions.length === 0 && <p>No auctions available</p>}
        {auctions.map((auction) => (
          <BiddingCard
            auction_id={auction.auction_id}
            title={auction.title}
            description={auction.description}
            startBid={auction.starting_bid}
            currentBid={auction.current_bid}
            endTime={auction.end_time}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionsPage;
