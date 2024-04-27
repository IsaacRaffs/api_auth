import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/user/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setUserData(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      {userData && userData.map((user) => (
        <div key={user.id}> 
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
