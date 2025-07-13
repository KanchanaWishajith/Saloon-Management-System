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
    <div>
      <h2>Available Salon Services 💇‍♀️</h2>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <p><strong>Price:</strong> Rs.{service.price}</p>
            <p><strong>Duration:</strong> {service.duration} mins</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
