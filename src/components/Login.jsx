import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

function Login() {
     const [formData, setFormData] = useState({
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
axios.defaults.withCredentials = true;
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);

  axios.post('http://88.200.63.148:6868/login', formData)
    .then(res => {
      console.log(res.data); // Debug
      if (res.data.Status === "Success") {
        navigate('/');
        window.location.reload();
      } else {
        alert(res.data.Error || "Login failed.");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      alert("Something went wrong.");
    });
};


  const handleCreateAccount = () => {
 };
    
return (
  <div className="login-container">
    <h2 className="login-title">Login</h2>
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="button-group">
        <button type="submit" className="btn btn-submit">Login</button>
        <Link to="/" type="button" className="btn btn-signin">Create account</Link>
      </div>
    </form>
  </div>
);

}

export default Login