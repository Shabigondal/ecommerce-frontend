import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-100 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">👤 My Profile</h2>

        {user ? (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <div className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 cursor-not-allowed">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 cursor-not-allowed">
                {user.email}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
