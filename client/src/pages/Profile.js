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
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>{message || 'Loading...'}</p>
      )}
    </div>
  );
};

export default Profile;
