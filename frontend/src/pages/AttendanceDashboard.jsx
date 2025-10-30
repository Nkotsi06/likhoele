import React, { useState, useEffect } from 'react';
import { getAllAttendance, deleteAttendance } from '../services/attendanceService';
import AttendanceCard from '../components/AttendanceCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AttendanceDashboard = () => {
  // Get today's date for placeholder only
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(''); // Start empty
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await getAllAttendance();
      console.log('Full API Response:', response);
      console.log('Response data:', response.data);

      let attendanceData = [];

      if (Array.isArray(response.data)) {
        attendanceData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        attendanceData = response.data.data;
      } else if (response.data && response.data.success && Array.isArray(response.data.data)) {
        attendanceData = response.data.data;
      } else if (Array.isArray(response)) {
        attendanceData = response;
      } else {
        console.error('Unexpected response format:', response);
        setError('Unexpected data format received from server');
        attendanceData = [];
      }

      // Normalize data keys + date format in local time
      const normalizedData = attendanceData.map(item => ({
        id: item.id,
        employeeName: item.employeeName || item.employeename || '',
        employeeID: item.employeeID || item.employeeid || '',
        date: item.date
          ? new Date(item.date).toLocaleDateString('en-CA') // YYYY-MM-DD local
          : '',
        status: item.status,
      }));

      console.log('Extracted & normalized attendance data:', normalizedData);
      setAttendance(normalizedData);

    } catch (error) {
      console.error('Error fetching attendance:', error);
      setError('Failed to load attendance data. Please check if the server is running.');
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await deleteAttendance(id);
        if (Array.isArray(attendance)) {
          setAttendance(attendance.filter(record => record.id !== id));
        }
      } catch (error) {
        console.error('Error deleting attendance:', error);
        alert('Failed to delete attendance record');
      }
    }
  };

  const clearFilters = () => {
    setFilterDate(''); // Clear date filter
    setSearchTerm('');
  };

  // Filtering logic (date + search)
  const filteredAttendance = Array.isArray(attendance)
    ? attendance.filter(record => {
        if (!record) return false;

        const recordDate = record.date || '';

        const matchesDate = !filterDate || recordDate === filterDate;
        const matchesSearch =
          !searchTerm ||
          (record.employeeName &&
            record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (record.employeeID &&
            record.employeeID.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesDate && matchesSearch;
      })
    : [];

  if (loading) {
    return (
      <div className="text-center py-5">
        <LoadingSpinner text="Loading attendance records..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <h4>ERROR LOADING DATA</h4>
        <p>{error}</p>
        <button className="btn btn-dark" onClick={fetchAttendance}>
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">ATTENDANCE DASHBOARD</h2>
        {/* UNIQUE GOLD "CLEAR FILTERS" BUTTON */}
        <button
          className="btn btn-clear-filters"
          onClick={clearFilters}
          disabled={!filterDate && !searchTerm}
        >
          <strong>CLEAR FILTERS</strong>
        </button>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by employee name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder={today}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-secondary">
            <div className="card-body text-center">
              <h5 className="card-title">TOTAL RECORDS</h5>
              <p className="card-text display-6 fw-bold">{filteredAttendance.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body text-center">
              <h5 className="card-title">PRESENT</h5>
              <p className="card-text display-6 fw-bold">
                {filteredAttendance.filter(r => r && r.status === 'Present').length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger">
            <div className="card-body text-center">
              <h5 className="card-title">ABSENT</h5>
              <p className="card-text display-6 fw-bold">
                {filteredAttendance.filter(r => r && r.status === 'Absent').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {filteredAttendance.length === 0 ? (
        <div className="alert alert-info text-center">
          {attendance.length === 0 
            ? 'No attendance records found. Start by marking some attendance!' 
            : 'No attendance records match your filters.'}
        </div>
      ) : (
        <div className="row">
          {filteredAttendance.map(record => (
            <div key={record.id} className="col-md-6 col-lg-4 mb-3">
              <AttendanceCard 
                record={record} 
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceDashboard;