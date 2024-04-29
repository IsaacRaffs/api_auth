import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/user/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        setUserData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Se o token não estiver presente ou a carga estiver em andamento, exibimos uma mensagem de carregamento
  if (loading) {
    return <div>Loading...</div>;
  }

  // Se o token estiver ausente, redirecionamos para a página de login
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // Se o token estiver presente, mas os dados do usuário ainda não foram carregados, exibimos uma mensagem de carregamento
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Home</h2>
      {userData.map((user) => (
        <div key={user.id}> 
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
