import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    email: ''
  });
  const [isRegistered, setIsRegistered] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.password) {
        return;
      }
  
      const response = await axios.post('http://127.0.0.1:8000/auth/signup', formData);
      console.log(response.data);
      setIsRegistered(true);
      const token = response.data.token;
      await axios.post('http://127.0.0.1:8000/user/', {
        name: formData.name,
        age: formData.age,
        email: formData.email
      }, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

    } catch (error) {
      console.error(error);
    }
  };
  

  if (isRegistered) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <br/>
        <br/>
        <br/>
        <input type="text" name="name" placeholder="Nome" onChange={handleChange} />
        <br/>
        <br/>
        <input type="number" name="age" placeholder="Idade" onChange={handleChange} />
        <br/>
        <br/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <br/>
        <br/>     
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
