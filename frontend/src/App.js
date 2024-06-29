import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import CreateAuction from './components/CreateAuction';
import './App.css'
import AuctionsPage from './components/AuctionsPage';
import Navbar from "./components/Navbar";

function App() {
    return (
        <AuthProvider>
            <Router>
            <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/create-auction" element={<PrivateRoute><CreateAuction /></PrivateRoute>} />
                    <Route path="/auctions-page" element={<PrivateRoute><AuctionsPage /></PrivateRoute>} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;