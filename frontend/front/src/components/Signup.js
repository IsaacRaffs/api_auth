import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Importe o componente Navigate

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    age: ''
  });
  const [isRegistered, setIsRegistered] = useState(false); // Estado para controlar o redirecionamento

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/signup', formData);
      console.log(response.data);
      setIsRegistered(true); // Defina isRegistered como true após o envio bem-sucedido
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  // Se isRegistered for true, redirecione para a rota de login
  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
