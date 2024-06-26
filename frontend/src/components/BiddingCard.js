import React, { useState, useEffect } from "react";
import "./style/BiddingCard.css";

const BiddingCard = ({ title, description, startBid, currentBid, endTime, onBid }) => {
    const [remainingTime, setRemainingTime] = useState('');
    const [bidAmount, setBidAmount] = useState('');
  
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
  
    const handleBid = () => {
      if (onBid) {
        onBid(bidAmount);
      }
    };
  
    return (
      <div className="auction-card">
        <h3 className="auction-title">{title}</h3>
        <p className="auction-description">{description}</p>
        <p className="auction-start-bid">Starting Bid: ${startBid}</p>
        <p className="auction-current-bid">Current Bid: ${currentBid || startBid}</p>
        <p className="auction-end-time">{remainingTime}</p>
        <input
          type="number"
          placeholder="Enter your bid"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="auction-bid-input"
        />
        <button onClick={handleBid} className="auction-bid-button">
          Place Bid
        </button>
      </div>
    );
  };
  
  export default BiddingCard;