import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to Our Salon</h1>
      <p className="text-lg text-gray-600 mb-6">Book your next appointment easily and quickly.</p>

      <div className="space-x-4">
        <Link to="/services">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            View Services
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
