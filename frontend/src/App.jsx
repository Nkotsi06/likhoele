import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AttendanceForm from './pages/AttendanceForm';
import AttendanceDashboard from './pages/AttendanceDashboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              EMPLOYEE ATTENDANCE TRACKER
            </Link>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/">
                MARK ATTENDANCE
              </Link>
              <Link className="nav-link" to="/dashboard">
                VIEW DASHBOARD
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<AttendanceForm />} />
            <Route path="/dashboard" element={<AttendanceDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;