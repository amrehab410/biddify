import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "./AuctionCard";
import "./style/AuctionsPage.css";
import BiddingCard from "./BiddingCard";
import { fetchAllAuctions, placeBuyNow } from "../api/auth";

const AuctionsPage = () => {
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllAuctions(email);
        setAuctions(res);
        setFilteredAuctions(res);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleSearch = () => {
    const filtered = auctions.filter((auction) =>
      auction.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAuctions(filtered);
  };

  return (
    <div className="auctions-page">
      <h1>Available Auctions</h1>
      <div className="App">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="auctions-list">
        {filteredAuctions.length === 0 && <p>No auctions available</p>}
        {filteredAuctions.map((auction) => (
          <BiddingCard
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
    </div>
  );
};

export default AuctionsPage;
