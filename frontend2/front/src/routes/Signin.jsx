import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin.css'

function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/signin', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-signin'>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        </div>

        <div className="form-control">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>

        <button type="submit" className='sign-btn'>Signin</button>
      </form>
    </div>
  );
}

export default Signin;
