import axios from 'axios';

// Use only the deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('Using API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout for deployed backend
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
    
    // Enhanced error handling for deployed backend
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      console.error('Deployed backend is not accessible. Please check your internet connection.');
    } else if (error.response) {
      // Server responded with error status
      console.error('Backend server error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received from deployed backend. The server might be starting up.');
    }
    
    return Promise.reject(error);
  }
);

// Function to test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await api.get('/health');
    return { 
      success: true, 
      data: response.data,
      backend: 'deployed',
      url: API_BASE_URL
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      backend: 'deployed',
      url: API_BASE_URL
    };
  }
};

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