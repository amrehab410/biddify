import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    try {
      const res = await axios.post('http://localhost:5000/login', user);
      console.log(res.data);
      history.push('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange} required />
        <input type="password" name="password" value={password} onChange={onChange} required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
