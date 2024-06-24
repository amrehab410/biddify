import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const CreateAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const { authState } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startBid, setStartBid] = useState("");
  const [remainingTimes, setRemainingTimes] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedRemainingTimes = auctions.map(auction => {
        return calculateRemainingTime(auction.endTime);
      });
      setRemainingTimes(updatedRemainingTimes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [auctions]);

  function handleAddAuction(auction) {
    setAuctions(auctions => [...auctions, auction]);
    setRemainingTimes(remainingTimes => [
      ...remainingTimes,
      calculateRemainingTime(auction.endTime)
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description || !endTime || !startBid) {
      alert("Please fill out all fields.");
      return;
    }

    const newAuction = {
      title,
      description,
      endTime,
      startBid,
      startTime: new Date().toISOString()
    };

    handleAddAuction(newAuction);
    setTitle("");
    setDescription("");
    setEndTime("");
    setStartBid("");
  }

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
    <>
      <div className="App">
        <h1>Welcome, {authState.email}!</h1>
        <form onSubmit={handleSubmit}>
          <h2>Create your Auction</h2>
          <label className="label">
            Title <sup>*</sup>
          </label>
          <input
            type="text"
            placeholder="Title ..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label className="label">
            Description <sup>*</sup>
          </label>
          <input
            type="text"
            placeholder="Description ..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label className="label">
            Starting Bid <sup>*</sup>
          </label>
          <input
            type="text"
            placeholder="Starting Bid ..."
            value={startBid}
            onChange={e => setStartBid(e.target.value)}
          />
          <label className="label">
            Auction End Time <sup>*</sup>
          </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
          <button className="button" type="submit">
            Create Auction
          </button>
        </form>
      </div>
      <div className="App">
        {auctions.map((auction, index) => (
          <div key={index}>
            <p>{auction.title}</p>
            <p>{remainingTimes[index]}</p>
          </div>
        ))}
      </div>
      <div className="App">
        <Logout />
      </div>
    </>
  );
};

export default CreateAuction;
