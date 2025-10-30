import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle consistent response format
api.interceptors.response.use(
  (response) => {
    // If the response has a data property with success: true, return the nested data
    if (response.data && response.data.success && response.data.data !== undefined) {
      return {
        ...response,
        data: response.data.data // Extract the actual data array/object
      };
    }
    // If it's already the direct array/object, return as is
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const addAttendance = (attendanceData) => {
  return api.post('/attendance', attendanceData);
};

export const getAllAttendance = () => {
  return api.get('/attendance');
};

export const getAttendanceByEmployeeID = (employeeID) => {
  return api.get(`/attendance/employee/${employeeID}`);
};

export const getAttendanceByDate = (date) => {
  return api.get(`/attendance/date/${date}`);
};

export const deleteAttendance = (id) => {
  return api.delete(`/attendance/${id}`);
};