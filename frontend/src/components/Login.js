import { loginUser } from "../api/auth";
import "./style/login.css";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const clearForm = () => {

        setEmail("");
        setPassword({
            value: "",
            isTouched: false,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password: password.value };
        const response = await loginUser(userData);
        if (response.message === "Login successful") {
            alert("Account logged in!");
            clearForm();
        } else {
            alert("Error logging in!");
        }
        clearForm();
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Login</h2>

                    <div className="Field">
                        <label>
                            Email address <sup>*</sup>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Email address"
                        />
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
                        />

                    </div>


                    <button type="login" >
                        Login
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
