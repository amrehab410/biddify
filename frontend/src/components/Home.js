import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate('/dashboard');
        }
    }, [authState, navigate]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Please log in to access your dashboard.</p>
        </div>
    );
};

export default Home;
