const { pool } = require('../config/db');

class Attendance {
  static async create(attendanceData) {
    const { employeeName, employeeID, date, status } = attendanceData;
    const query = `
      INSERT INTO attendance (employeeName, employeeID, date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [employeeName, employeeID, date, status];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = `
      SELECT * FROM attendance 
      ORDER BY date DESC, created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getByEmployeeID(employeeID) {
    const query = 'SELECT * FROM attendance WHERE employeeID = $1 ORDER BY date DESC';
    const result = await pool.query(query, [employeeID]);
    return result.rows;
  }

  static async getByDate(date) {
    const query = 'SELECT * FROM attendance WHERE date = $1 ORDER BY employeeName';
    const result = await pool.query(query, [date]);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM attendance WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Attendance;