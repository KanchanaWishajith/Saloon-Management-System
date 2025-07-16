import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/appointments/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to fetch appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/appointments/cancel/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 'cancelled' } : a))
      );
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white mt-10 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">📅 My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet.</p>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appt) => (
            <li key={appt._id} className="border-b pb-4">
              <h4 className="text-xl font-semibold text-blue-600">{appt.service?.name}</h4>
              <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
              <p><strong>Price:</strong> Rs.{appt.service?.price}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${appt.status === 'cancelled' ? 'bg-red-500' : appt.status === 'approved' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                  {appt.status}
                </span>
              </p>
              {appt.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(appt._id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
