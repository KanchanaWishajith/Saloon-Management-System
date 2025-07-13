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
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
