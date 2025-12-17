import "./LoginForm.css";

import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //authenticate user

  const authenticate = async (data) => {
    let url = process.env.REACT_APP_API_URL;
    try {
        let response = await axios.post(`${url}/auth`, data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponseMessage({type: true, text: 'User Authenticated!'});
      console.log('Server response:', response.data);
    } catch (error) {
        setResponseMessage({type: false, text: 'Error authenticating user. Please try again.'});
        console.error('Error:', error.response?.data?.message || error.message);
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify(formData);
    await authenticate(data);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" placeholder="Username" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" placeholder="Enter Password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
  
        <button type="submit" className="btn bg-blue txt-light">Login</button>

      </form>

      {responseMessage !== '' ? 
      <p className={responseMessage.type ? "alert alert-success" : "alert alert-danger"} role="alert">{responseMessage.text}</p>
      : ""}
    </div>
  );
  };

  export default LoginForm;