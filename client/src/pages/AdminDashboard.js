import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to fetch appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/appointments/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: res.data.appointment.status } : appt
        )
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div>
      <h2>🛠️ Admin Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              <h4>{appt.service?.name}</h4>
              <p><strong>User:</strong> {appt.user?.name} ({appt.user?.email})</p>
              <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>

              {appt.status !== 'approved' && (
                <button onClick={() => updateStatus(appt._id, 'approved')}>Approve</button>
              )}
              {appt.status !== 'cancelled' && (
                <button onClick={() => updateStatus(appt._id, 'cancelled')}>Cancel</button>
              )}
              {appt.status !== 'completed' && (
                <button onClick={() => updateStatus(appt._id, 'completed')}>Completed</button>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
      <a href="/admin/services">🔧 Manage Services</a>
    </div>
  );
};

export default AdminDashboard;
