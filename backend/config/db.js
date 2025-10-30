const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Test connection and create table if not exists
const connect = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');

    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id SERIAL PRIMARY KEY,
        employeeName VARCHAR(100) NOT NULL,
        employeeID VARCHAR(50) NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Attendance table verified/created successfully');
    client.release();
    return pool;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  connect
};
