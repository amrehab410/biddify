import React, { useState, useEffect } from "react";
import "./style/BiddingCard.css";
import { placeBid } from "../api/auth";

const BiddingCard = ({
  title,
  description,
  startBid,
  currentBid,
  endTime,
  auction_id,
}) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [latestBid, setLatestBid] = useState(currentBid);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  const calculateRemainingTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const timeDiff = end - now;
    if (timeDiff <= 0) return "Auction ended";

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s remaining`;
  };

  const handleBid = async () => {
    const minimumBid = Math.max(startBid, currentBid || 0);
    if (parseFloat(bidAmount) < minimumBid) {
      alert(`Your bid must be at least $${minimumBid}`);
      return;
    }

    const auction_data = {
      auction_id: auction_id,
      email: email,
      bid_amount: bidAmount,
      bid_time: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    const response = await placeBid(auction_data);
    if (response.message === "Bid made successfully") {
      setLatestBid(bidAmount);
      alert("Bid created!");
    } else {
      alert("Error making bid!");
    }
  };

  return (
    <div className="auction-card">
      <h3 className="auction-title">{title}</h3>
      <p className="auction-description">{description}</p>
      <p className="auction-start-bid">Starting Bid: ${startBid}</p>
      <p className="auction-current-bid">Current Bid: ${latestBid}</p>
      <p className="auction-end-time">{remainingTime}</p>
      <input
        type="number"
        placeholder="Enter your bid"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        className="auction-bid-input"
      />
      <button
        onClick={handleBid}
        className="auction-bid-button"
      >
        Place Bid
      </button>
    </div>
  );
};

export default BiddingCard;
