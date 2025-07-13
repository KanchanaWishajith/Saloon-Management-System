import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get('http://localhost:5000/api/services');
      setServices(res.data);
    };
    fetchServices();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/appointments',
        { serviceId: selectedService, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Appointment booked successfully!');
    } catch (error) {
      setMessage('❌ Booking failed: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div>
      <h2>Book an Appointment 🗓️</h2>
      <form onSubmit={handleBooking}>
        <label>Select a Service:</label><br />
        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
          <option value="">-- Choose --</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} - Rs.{s.price}
            </option>
          ))}
        </select><br /><br />

        <label>Select Date:</label><br />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required /><br /><br />

        <button type="submit">Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default BookAppointment;
