const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/attendance', attendanceRoutes);

// ✅ Root Route (optional test)
app.get('/', (req, res) => {
  res.json({ message: 'Employee Attendance Tracker API is running 🚀' });
});

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Connect to DB, then start server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
