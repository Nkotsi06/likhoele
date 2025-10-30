import { useState, useEffect } from 'react';
import { getAllAttendance } from '../services/attendanceService';

const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllAttendance();
      setAttendance(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const refetch = () => {
    fetchAttendance();
  };

  return {
    attendance,
    loading,
    error,
    refetch
  };
};

export default useAttendance;