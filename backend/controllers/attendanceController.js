const Attendance = require('../models/Attendance');

const addAttendance = async (req, res, next) => {
  try {
    const { employeeName, employeeID, date, status } = req.body;

    // Validation
    if (!employeeName || !employeeID || !date || !status) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!['Present', 'Absent'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "Present" or "Absent"'
      });
    }

    const attendance = await Attendance.create({
      employeeName,
      employeeID,
      date,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully',
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

const getAllAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.getAll();
    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceByEmployeeID = async (req, res, next) => {
  try {
    const { employeeID } = req.params;
    const attendance = await Attendance.getByEmployeeID(employeeID);
    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const attendance = await Attendance.getByDate(date);
    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.delete(parseInt(id));
    
    if (!deletedAttendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      message: 'Attendance record deleted successfully',
      data: deletedAttendance
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAttendance,
  getAllAttendance,
  getAttendanceByEmployeeID,
  getAttendanceByDate,
  deleteAttendance
};