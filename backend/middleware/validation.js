const validateAttendance = (req, res, next) => {
  const { employeeName, employeeID, date, status } = req.body;

  // Check required fields
  if (!employeeName || !employeeID || !date || !status) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: employeeName, employeeID, date, status'
    });
  }

  // Validate employee name
  if (typeof employeeName !== 'string' || employeeName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Employee name must be a non-empty string'
    });
  }

  // Validate employee ID
  if (typeof employeeID !== 'string' || employeeID.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Employee ID must be a non-empty string'
    });
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({
      success: false,
      message: 'Date must be in YYYY-MM-DD format'
    });
  }

  // Validate status
  if (!['Present', 'Absent'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either "Present" or "Absent"'
    });
  }

  next();
};

module.exports = {
  validateAttendance
};