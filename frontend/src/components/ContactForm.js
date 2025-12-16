import React, { useState } from 'react';
import axios from 'axios';
import "./ContactForm.css";

const ContactForm = () => {
  const protocol = "http";
  const domain = "localhost";
  const port = "3001";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Send emails
  const mail = async (data) => {
    let url = `${protocol}://${domain}:${port}`;
    try {
      let response = await axios.post(`${url}/send-email`, data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponseMessage({type: true, text: 'Email sent successfully!'});
      console.log('Server response:', response.data);
    } catch (error) {
      setResponseMessage({type: false, text: 'Error sending email. Please try again.'});
      console.error('Error:', error.response?.data?.message || error.message);
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify(formData);
    await mail(data);
  };

  return (
    <div className="container">
      <h1>Contact Me</h1>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" placeholder="Name" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" placeholder="Enter Email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" className="form-control" placeholder="Write your message here"name="message" rows="4" cols="50" value={formData.message} onChange={handleChange} required></textarea>
        </div>
  
        <button type="submit" className="btn bg-blue txt-light">Send</button>

      </form>

      {responseMessage !== '' ? 
      <p className={responseMessage.type ? "alert alert-success" : "alert alert-danger"} role="alert">{responseMessage.text}</p>
      : ""}
    </div>
  );
  };

  export default ContactForm;