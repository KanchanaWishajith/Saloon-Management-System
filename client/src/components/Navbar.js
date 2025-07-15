import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Salon App</Link>

        <div className="space-x-4">
          <Link to="/services" className="hover:underline">Services</Link>
          {token && (
            <>
              <Link to="/book" className="hover:underline">Book</Link>
              <Link to="/my-appointments" className="hover:underline">My Appointments</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
            </>
          )}
          {!token ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
