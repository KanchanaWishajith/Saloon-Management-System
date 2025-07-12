const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load env variables
dotenv.config();

// Init app
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Salon Management API is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Protected data accessed', user: req.user });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

const sendEmail = require('./utils/sendEmail');

app.get('/api/test-email', async (req, res) => {
  try {
    await sendEmail(
      'kanchana4592@gmail.com', // <-- Change this to your test email (can even be your Gmail)
      'Test Email from Salon App',
      '🎉 Hello! This is a test email from your backend.'
    );
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Email failed', error: err.message });
  }
});

