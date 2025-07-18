import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        💇‍♀️ Available Salon Services
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : services.length === 0 ? (
        <p className="text-center text-red-500 text-lg font-medium">No services available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map(service => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h4>
              <p className="text-gray-600 mb-3">{service.description}</p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>💰 Price:</strong> Rs.{service.price}
              </p>
              <p className="text-sm text-gray-700">
                <strong>⏱ Duration:</strong> {service.duration} mins
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
