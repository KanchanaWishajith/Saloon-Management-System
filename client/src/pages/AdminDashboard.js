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
          headers: { Authorization: `Bearer ${token}` }
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
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/appointments/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: res.data.appointment.status } : appt
        )
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const chartData = stats
    ? [
        { name: 'Completed', count: stats.statusCounts.completed },
        { name: 'Approved', count: stats.statusCounts.approved },
        { name: 'Cancelled', count: stats.statusCounts.cancelled }
      ]
    : [];

  const dailyAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointmentDate).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h2>

      <div className="mb-8">
        <a href="/admin/services" className="text-blue-600">🔧 Manage Services</a>
      </div>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">📦 Total Appointments</h4>
            <p>{stats.totalAppointments}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">👥 Total Users</h4>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">💇‍♂️ Total Services</h4>
            <p>{stats.totalServices}</p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}

      <div className="bg-white p-4 rounded shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">📈 Appointment Status Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">🗓️ Appointment Calendar</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) => {
              const isBooked = appointments.some(
                (appt) =>
                  new Date(appt.appointmentDate).toDateString() === date.toDateString()
              );
              return isBooked ? 'bg-blue-100' : null;
            }}
          />
          <h4 className="mt-4 font-medium">📅 Appointments on {selectedDate.toDateString()}</h4>
          {dailyAppointments.length === 0 ? (
            <p>No appointments on this day.</p>
          ) : (
            <ul className="mt-2 list-disc list-inside">
              {dailyAppointments.map((appt) => (
                <li key={appt._id}>
                  {appt.user?.name} - {appt.service?.name} at{' '}
                  {new Date(appt.appointmentDate).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">📋 All Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appt) => (
                <li key={appt._id} className="border-b pb-2">
                  <h4 className="font-semibold">{appt.service?.name}</h4>
                  <p><strong>User:</strong> {appt.user?.name} ({appt.user?.email})</p>
                  <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {appt.status}</p>
                  <div className="mt-2 flex gap-2">
                    {appt.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(appt._id, 'approved')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    )}
                    {appt.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(appt._id, 'cancelled')}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                    {appt.status !== 'completed' && (
                      <button
                        onClick={() => updateStatus(appt._id, 'completed')}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
