import React, { useState } from 'react';
import { addAttendance } from '../services/attendanceService';

const AttendanceForm = () => {
  // Initialize with current local date
  const currentDate = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

  const [formData, setFormData] = useState({
    employeeName: '',
    employeeID: '',
    date: currentDate, // default to today
    status: 'Present'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');

  const validateName = (name) => /^[A-Za-z\s]*$/.test(name);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (validateName(value) || value === '') {
      setFormData({ ...formData, employeeName: value });
      setNameError('');
    } else {
      setNameError('Name can only contain letters and spaces');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'employeeName') {
      handleNameChange(e);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!validateName(formData.employeeName)) {
      setNameError('Please enter a valid name with letters only');
      setLoading(false);
      return;
    }

    if (!formData.employeeName.trim()) {
      setNameError('Employee name is required');
      setLoading(false);
      return;
    }

    try {
      await addAttendance(formData);
      setMessage('Attendance recorded successfully!');
      setFormData({
        employeeName: '',
        employeeID: '',
        date: currentDate, // reset to today's date
        status: 'Present'
      });
      setNameError('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error recording attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-light">
          <h2 className="card-title mb-0 text-center">EMPLOYEE ATTENDANCE</h2>
        </div>
        <div className="card-body p-4">
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="employeeName" className="form-label fw-bold">Employee Name</label>
              <input
                type="text"
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
                placeholder="Enter employee full name"
                pattern="[A-Za-z\s]+"
                title="Please enter letters only (no numbers or symbols)"
              />
              {nameError && <div className="invalid-feedback">{nameError}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="employeeID" className="form-label fw-bold">Employee ID</label>
              <input
                type="text"
                className="form-control"
                id="employeeID"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleChange}
                required
                placeholder="Enter employee ID"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label fw-bold">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="form-label fw-bold">Attendance Status</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-dark w-100 py-2 fw-bold"
              disabled={loading || nameError}
            >
              {loading ? 'Recording Attendance...' : 'Record Attendance'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;


