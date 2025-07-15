import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      setMessage('❌ Failed to fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">👤 Profile Page</h2>

        {user ? (
          <div className="space-y-4">
            <p><strong className="text-gray-600">Name:</strong> {user.name}</p>
            <p><strong className="text-gray-600">Email:</strong> {user.email}</p>
            <p><strong className="text-gray-600">Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">{message || 'Loading...'}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
