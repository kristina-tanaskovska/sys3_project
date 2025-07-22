import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    axios.post('http://localhost:6868/register', formData)
    .then(res =>{
        if(res.data.Status === "Sucess"){
            navigate('/login')
        }else{
            alert("Error")
        }
    })// console.log(res))

    .catch(err => console.log(err));
     };

  const handleCreateAccount = () => {
 };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ marginRight: '1rem' }}>Submit</button>
        <Link to="/login" type="button" onClick={handleCreateAccount}>Create New Account</Link>
      </form>
    </div>
  );
}

export default Register;
