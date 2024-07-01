import React, { useState, useEffect } from "react";
import "./style/AuctionCard.css";

const AuctionCard = ({ title, description, startBid, buyNowPrice, currentBid, endTime }) => {
  const [remainingTime, setRemainingTime] = useState("");

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

  return (
    <div className="auction-card">
      <h3 className="auction-title">{title}</h3>
      <p className="auction-description">{description}</p>
      <p className="auction-start-bid">Starting Bid: ${startBid}</p>
      <p className="auction-current-bid">
        Current Bid: ${currentBid}
      </p>
      <p className="auction-current-bid">
        Buy Now Price: ${buyNowPrice}
      </p>
      <p className="auction-end-time">Time Remaining: {remainingTime}</p>
    </div>
  );
};

export default AuctionCard;
