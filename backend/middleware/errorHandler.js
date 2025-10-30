const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // PostgreSQL unique constraint error
  if (err.code === '23505') {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry found'
    });
  }

  // PostgreSQL foreign key constraint error
  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Referenced record not found'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
};

module.exports = errorHandler;