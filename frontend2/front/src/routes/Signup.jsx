import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Signin.css'

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
    <div className='container-signin'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        </div>

        <div className="form-control">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>

        <div className="form-control">
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" placeholder="Nome" onChange={handleChange} />
        </div>

        <div className="form-control">
            <label htmlFor="age">Idade</label>
            <input type="number" name="age" placeholder="Idade" onChange={handleChange} />
        </div>

        <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        </div>
   
        <button type="submit" className='sign-btn'>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
