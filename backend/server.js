const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration for production
const corsOptions = {
  origin: [
    'https://likhoele.onrender.com', // Your deployed backend
    // Add your frontend production URLs here when deployed:
    // 'https://your-frontend-app.netlify.app',
    // 'https://your-frontend-app.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

// ✅ API Routes
app.use('/api/attendance', attendanceRoutes);

// ✅ Health check route for production
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Employee Attendance Tracker API is running 🚀',
    environment: 'production',
    backend: 'deployed',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ✅ Root Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Employee Attendance Tracker API is running 🚀',
    version: '1.0.0',
    environment: 'production',
    endpoints: {
      attendance: '/api/attendance',
      health: '/health'
    }
  });
});

// ✅ 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Connect to DB, then start server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Production Server running on port ${PORT}`);
      console.log(` Production URL: https://likhoele.onrender.com`);
      console.log(` Health check: https://likhoele.onrender.com/health`);
    });
  })
  .catch((err) => {
    console.error(' Database connection failed:', err.message);
    process.exit(1);
  });