import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { fetchAuctions } from "../api/auth";


const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAuctions(email)
        const data = response.json()
        console.log(data)
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchData();
  }, [email]);

  const redirectToCreateAuction = () => {
    navigate("/create-auction");
  };

  return (
    <>
      <div className="App">
        <h1>Welcome, {authState.email}!</h1>
        <p>This is your dashboard.</p>
        <button className="button" onClick={redirectToCreateAuction}>
          Create Auction
        </button>
        <button className="button">Place Bid</button>
      </div>
      <div className="App">
        <Logout />
      </div>
    </>
  );
};

export default Dashboard;
