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

    // Update the appointment's status locally
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: 'cancelled' } : a))
    );
  } catch (err) {
    console.error('Cancel failed:', err);
  }
};



  return (
    <div>
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
            <h4>{appt.service?.name}</h4>
            <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
            <p><strong>Price:</strong> Rs.{appt.service?.price}</p>
            <p><strong>Status:</strong> {appt.status}</p>
            {appt.status !== 'cancelled' && (
            <button onClick={() => handleCancel(appt._id)}>Cancel</button>
            )}
        <hr />
        </li>
    ))}

        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
