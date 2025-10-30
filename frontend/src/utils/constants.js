export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent'
};

export const STATUS_OPTIONS = [
  { value: 'Present', label: 'Present', color: 'success' },
  { value: 'Absent', label: 'Absent', color: 'danger' }
];

export const DATE_FORMAT = 'YYYY-MM-DD';