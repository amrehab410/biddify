import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const Dashboard = () => {
    const { authState } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome, {authState.email}!</h1>
            <p>This is your dashboard.</p>
            <Logout />
        </div>
    );
};

export default Dashboard;
