import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }[size];

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`spinner-border ${sizeClass} text-dark`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <span className="ms-2 fw-bold">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;