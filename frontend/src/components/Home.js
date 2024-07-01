import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./style/LandingPage.css";
import LandingPage from "./LandingPage";

const Home = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authState, navigate]);

  return (
    <LandingPage />
  );
};

export default Home;
