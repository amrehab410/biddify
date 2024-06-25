import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { createAuction } from "../api/auth";

const CreateAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const { authState } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startBid, setStartBid] = useState(0);
  const [remainingTimes, setRemainingTimes] = useState([]);
  const navigate = useNavigate();


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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEndTime("");
    setStartBid("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!title || !description || !endTime || !startBid) {
      alert("Please fill out all fields.");
      return;
    }
    const newAuction = {
      title,
      email,
      description,
      endTime,
      startBid,
      startTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    const response = await createAuction(newAuction);
    if (response.message === "Auction created successfully") {
      alert("Auction created!");
      handleAddAuction(newAuction);
      clearForm();
      navigate("/dashboard")
    } else {
      alert("Error creating auction");
    }
  };

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
            type="number"
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
