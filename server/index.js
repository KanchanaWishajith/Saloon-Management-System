const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');

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

// Protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Protected data accessed', user: req.user });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
