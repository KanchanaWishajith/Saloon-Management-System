import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

      useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

    const chartData = stats
    ? [
        { name: 'Completed', count: stats.statusCounts.completed },
        { name: 'Approved', count: stats.statusCounts.approved },
        { name: 'Cancelled', count: stats.statusCounts.cancelled },
      ]
    : [];

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

    // Filter appointments for the selected day
  const dailyAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointmentDate).toDateString() === selectedDate.toDateString()
  );

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
            <h2>📊 Admin Dashboard Summary</h2>
      {stats ? (
        <ul>
          <li>Total Appointments: {stats.totalAppointments}</li>
          <li>Total Users: {stats.totalUsers}</li>
          <li>Total Services: {stats.totalServices}</li>
          <li>completed: {stats.statusCounts.completed}</li>
          <li>Approved: {stats.statusCounts.approved}</li>
          <li>Cancelled: {stats.statusCounts.cancelled}</li>

          <h3>📈 Appointment Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

                <h2>🗓️ My Appointment Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          const isBooked = appointments.some(
            (appt) =>
              new Date(appt.appointmentDate).toDateString() === date.toDateString()
          );
          return isBooked ? 'highlight' : null;
        }}
      />
      <h3>📅 Appointments on {selectedDate.toDateString()}</h3>
      {dailyAppointments.length === 0 ? (
        <p>No appointments on this day.</p>
      ) : (
        <ul>
          {dailyAppointments.map((appt) => (
            <li key={appt._id}>
              {appt.user?.name} - {appt.service?.name} at {new Date(appt.appointmentDate).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}

        </ul>

      ) : (
        <p>Loading stats...</p>
      )}

    </div>
  );
};

export default AdminDashboard;
