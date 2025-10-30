const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration for production - ADD YOUR FRONTEND URL
const corsOptions = {
  origin: [
    'https://likhoele.onrender.com', // Your deployed backend
    'https://likhoele-1.onrender.com', // Your deployed frontend - ADD THIS LINE
    'http://localhost:3000', // For local development
    'http://127.0.0.1:3000'
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
    version: '1.0.0',
    allowedOrigins: [
      'https://likhoele.onrender.com',
      'https://likhoele-1.onrender.com'
    ]
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
      console.log(`🚀 Production Server running on port ${PORT}`);
      console.log(`🌐 Backend URL: https://likhoele.onrender.com`);
      console.log(`🌐 Frontend URL: https://likhoele-1.onrender.com`);
      console.log(`✅ CORS configured for frontend access`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });