import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Dashboard Overview</h2>
      {user ? (
        <div className="bg-white dark:bg-black dark:text-white p-4 rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="dark:text-white">Loading user info...</p>
      )}
    </div>
  );
};

export default Overview;
