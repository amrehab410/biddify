import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const history = useHistory();

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password
    };
    try {
      const res = await axios.post('http://localhost:5000/register', newUser);
      console.log(res.data);
      history.push('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={username} onChange={onChange} required />
        <input type="email" name="email" value={email} onChange={onChange} required />
        <input type="password" name="password" value={password} onChange={onChange} required />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
