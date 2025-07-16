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
    <div className="max-w-md mx-auto bg-white mt-10 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">🗓️ Book an Appointment</h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Select a Service:</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">-- Choose --</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} - Rs.{s.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Select Date & Time:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Book Appointment
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default BookAppointment;
