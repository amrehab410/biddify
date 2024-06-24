import "./style/register.css";
import { useState } from "react";
import { registerUser } from '../api/auth';

import { useNavigate } from "react-router-dom";

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters and include uppercase, lowercase, number, and special character</p>
    );
};

const EmailErrorMessage = () => {
    return (
        <p className="FieldError">Invalid email address</p>
    );
};

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNo("");
        setPassword("");
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { first_name: firstName, last_name: lastName, phone_num: phoneNo, email: email, password: password.value };
        const response = await registerUser(userData);
        if (response.message === "User registered successfully") {
            alert("Account created!");
            clearForm();
        } else {
            alert("Error creating account");
        }
    };

    const redirectToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Sign Up</h2>
                    <div className="Field">
                        <label className="label">
                            First name <sup>*</sup>
                        </label>
                        <input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            placeholder="First name"
                            required
                        />
                    </div>
                    <div className="Field">
                        <label className="label">Last name</label>
                        <input
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            placeholder="Last name"
                            required
                        />
                    </div>
                    <div className="Field">
                        <label className="label">
                            Email address <sup>*</sup>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}

                            placeholder="Email address"
                            required
                        />

                    </div>
                    <div className="Field">
                        <label className="label">
                            Password <sup>*</sup>
                        </label>
                        <input
                            value={password.value}
                            type="password"
                            onChange={(e) => {
                                setPassword({ ...password, value: e.target.value });
                            }}

                            placeholder="Password"
                            required
                        />

                    </div>
                    <div className="Field">
                        <label className="label">
                            Phone Number <sup>*</sup>
                        </label>
                        <input
                            value={phoneNo}
                            onChange={(e) => {
                                setPhoneNo(e.target.value);
                            }}
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    <button type="submit" className="button">Create account</button>
                    <button type="button" onClick={redirectToLogin} className="button">Go to Login</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Register;
