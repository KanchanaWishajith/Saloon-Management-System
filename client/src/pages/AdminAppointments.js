import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAllAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/appointments/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

const handleApprove = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/appointments/status/${id}`,
      { status: 'approved' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAllAppointments();
  } catch (err) {
    console.error('Error approving appointment:', err);
  }
};

const handleCancel = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/appointments/status/${id}`,
      { status: 'cancelled' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAllAppointments();
  } catch (err) {
    console.error('Error cancelling appointment:', err);
  }
};

const handleComplete = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/appointments/status/${id}`,
      { status: 'completed' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAllAppointments();
  } catch (err) {
    console.error('Error complete appointment:', err);
  }
};


  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div>
      <h2>📋 All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              <p><strong>Customer:</strong> {appt.user?.name}</p>
              <p><strong>Service:</strong> {appt.service?.name}</p>
              <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <button onClick={() => handleApprove(appt._id)} disabled={appt.status === 'approved'}>
                ✅ Approve
              </button>
              <button onClick={() => handleCancel(appt._id)} disabled={appt.status === 'cancelled'}>
                ❌ Cancel
                </button>
                <button onClick={() => handleComplete(appt._id)} disabled={appt.status === 'completed'}>
                Completed
                </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminAppointments;
