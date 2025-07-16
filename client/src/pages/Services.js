import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">💇‍♀️ Available Salon Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map(service => (
          <div
            key={service._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p><strong>💰 Price:</strong> Rs.{service.price}</p>
            <p><strong>⏱ Duration:</strong> {service.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
