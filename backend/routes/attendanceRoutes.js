const express = require('express');
const {
  addAttendance,
  getAllAttendance,
  getAttendanceByEmployeeID,
  getAttendanceByDate,
  deleteAttendance
} = require('../controllers/attendanceController');
const { validateAttendance } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateAttendance, addAttendance);
router.get('/', getAllAttendance);
router.get('/employee/:employeeID', getAttendanceByEmployeeID);
router.get('/date/:date', getAttendanceByDate);
router.delete('/:id', deleteAttendance);

module.exports = router;