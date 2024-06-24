import React, { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import "./style/login.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({ value: "", isTouched: false });
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const clearForm = () => {
        setEmail("");
        setPassword({ value: "", isTouched: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password: password.value };
        const response = await loginUser(userData);
        if (response.message === "Login successful") {
            alert("Account logged in!");
            clearForm();
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userEmail', email);
            setAuthState({ isAuthenticated: true, token: response.token, email: email });
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            alert("Error logging in!");
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Login</h2>
                    <div className="Field">
                        <label className="label">Email address <sup>*</sup></label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                        />
                    </div>
                    <div className="Field">
                        <label className="label">Password <sup>*</sup></label>
                        <input
                            value={password.value}
                            type="password"
                            onChange={(e) => setPassword({ ...password, value: e.target.value })}
                            onBlur={() => setPassword({ ...password, isTouched: true })}
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="button">Login</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
