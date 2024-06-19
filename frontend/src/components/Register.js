import "./style/register.css";
import { useState } from "react";
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
    const [email, setEmail] = useState({ value: "", isTouched: false });
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState({ value: "", isTouched: false });
    const navigate = useNavigate();

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail({ value: "", isTouched: false });
        setPhoneNo("");
        setPassword({ value: "", isTouched: false });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName && validateEmail(email.value) && validatePassword(password.value) && phoneNo) {
            alert("Account created!");
            clearForm();
        } else {
            alert("Please fill out the form correctly.");
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
                        <label>
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
                        <label>Last name</label>
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
                        <label>
                            Email address <sup>*</sup>
                        </label>
                        <input
                            value={email.value}
                            onChange={(e) => {
                                setEmail({ ...email, value: e.target.value });
                            }}
                            onBlur={() => {
                                setEmail({ ...email, isTouched: true });
                            }}
                            placeholder="Email address"
                            required
                        />
                        {email.isTouched && !validateEmail(email.value) ? (
                            <EmailErrorMessage />
                        ) : null}
                    </div>
                    <div className="Field">
                        <label>
                            Password <sup>*</sup>
                        </label>
                        <input
                            value={password.value}
                            type="password"
                            onChange={(e) => {
                                setPassword({ ...password, value: e.target.value });
                            }}
                            onBlur={() => {
                                setPassword({ ...password, isTouched: true });
                            }}
                            placeholder="Password"
                            required
                        />
                        {password.isTouched && !validatePassword(password.value) ? (
                            <PasswordErrorMessage />
                        ) : null}
                    </div>
                    <div className="Field">
                        <label>
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

                    <button type="submit">Create account</button>
                    <button type="button" onClick={redirectToLogin}>Go to Login</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Register;
