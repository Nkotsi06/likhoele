import React from 'react';

const AttendanceCard = ({ record, onDelete }) => {
  const handleDelete = () => {
    onDelete(record.id);
  };

  // Format date
  const formattedDate = record.date
    ? new Date(record.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  const recordedAt = record.created_at
    ? new Date(record.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  return (
    <div
      className={`card attendance-card shadow-sm border-0 h-100 ${record.status === 'Present' ? 'status-present' : 'status-absent'
        }`}
      style={{ borderRadius: '14px', overflow: 'hidden' }}
    >
      <div className="card-header bg-transparent border-0 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-primary" style={{ fontSize: '1.15rem' }}>
            {record.employeeName || 'Unnamed Employee'}
          </h5>
          {/* TEXT-ONLY DELETE BUTTON */}
          <button
            className="btn btn-sm btn-outline-danger text-danger"
            onClick={handleDelete}
            title="Delete this record"
            style={{
              fontSize: '0.8rem',
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              fontWeight: '600',
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="card-body p-3 pt-0">
        {/* Employee ID */}
        <div className="d-flex align-items-center mb-2">
          <span className="text-muted fw-medium" style={{ fontSize: '0.85rem', width: '80px' }}>
            ID:
          </span>
          <span className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>
            {record.employeeID || '—'}
          </span>
        </div>

        {/* Date */}
        <div className="d-flex align-items-center mb-2">
          <span className="text-muted fw-medium" style={{ fontSize: '0.85rem', width: '80px' }}>
            Date:
          </span>
          <span className="text-dark" style={{ fontSize: '0.95rem' }}>
            {formattedDate}
          </span>
        </div>

        {/* Status Badge */}
        <div className="d-flex align-items-center mb-3">
          <span className="text-muted fw-medium" style={{ fontSize: '0.85rem', width: '80px' }}>
            Status:
          </span>
          <span
            className={`badge rounded-pill px-3 py-2 fw-bold ${record.status === 'Present'
                ? 'bg-success text-white'
                : 'bg-danger text-white'
              }`}
            style={{
              fontSize: '0.85rem',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            {record.status}
          </span>
        </div>

        {/* Recorded Time */}
        {recordedAt && (
          <div className="text-end mt-3">
            <small className="text-muted fst-italic">
              Recorded at {recordedAt}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;