import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          

        </div>
        <hr className="my-3 bg-light" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">
              &copy; {currentYear} Employee Attendance Tracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;