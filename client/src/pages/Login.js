import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      setMessage('✅ Login successful!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role); 

      // ✅ Role-based redirection
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard'); // ✅ lowercase
      } else {
        navigate('/profile'); // ✅ lowercase
      }
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>
      <form onSubmit={handleLogin}className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        /><br /><br />
        <button type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >Login</button>
      </form>
      <p className="mt-4 text-center text-sm text-red-600">{message}</p>
    </div>
    </div>
  );
};

export default Login;
