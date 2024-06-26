import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "./AuctionCard";
import "./style/AuctionsPage.css";
import BiddingCard from "./BiddingCard";

const auctions = [
  {
    title: "Vintage Camera",
    description: "A rare vintage camera in excellent condition.",
    startBid: 100,
    currentBid: 150,
    endTime: "2024-07-01T12:00:00Z",
  },
  {
    title: "Antique Vase",
    description: "An exquisite antique vase from the 19th century.",
    startBid: 200,
    currentBid: 250,
    endTime: "2024-07-02T15:00:00Z",
  },
];

const AuctionsPage = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="auctions-page">
      <h1>Available Auctions</h1>
      <div className="auctions-list">
        {auctions.length === 0 && <p>No auctions available</p>}
        {auctions.map((auction, index) => (
          <AuctionCard
            key={index}
            title={auction.title}
            description={auction.description}
            startBid={auction.startBid}
            currentBid={auction.currentBid}
            endTime={auction.endTime}
          />
        ))}
      </div>
      <div className="auctions-list">
        {auctions.length === 0 && <p>No auctions available</p>}
        {auctions.map((auction, index) => (
          <BiddingCard
            key={index}
            title={auction.title}
            description={auction.description}
            startBid={auction.startBid}
            currentBid={auction.currentBid}
            endTime={auction.endTime}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionsPage;
