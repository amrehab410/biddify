import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuctionsPage = () => {
  const { authState } = useContext(AuthContext);
  const [auctions, setAuctions] = useState([]);

  // Fetch auctions from server or context
  useEffect(() => {
    // Here you would typically fetch the auctions from your server
    // For simplicity, we're just going to use a static list
    const fetchAuctions = async () => {
      const response = await fetch('/api/auctions'); // Adjust this URL to your API
      const data = await response.json();
      setAuctions(data);
    };

    fetchAuctions();
  }, []);

  function calculateRemainingTime(endTime) {
    const end = new Date(endTime);
    const now = new Date();
    const timeDiff = end - now;
    if (timeDiff <= 0) return "Auction ended";

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s remaining`;
  }

  return (
    <div className="App">
      <h1>Available Auctions</h1>
      <div>
        {auctions.length === 0 && <p>No auctions available</p>}
        {auctions.map((auction, index) => (
          <div key={index}>
            <p>{auction.title}</p>
            <p>{auction.description}</p>
            <p>Starting Bid: {auction.startBid}</p>
            <p>{calculateRemainingTime(auction.endTime)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionsPage;
