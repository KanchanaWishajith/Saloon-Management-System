import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments for the selected day
  const dailyAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointmentDate).toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
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
              {appt.service?.name} at {new Date(appt.appointmentDate).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarView;
