import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

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
