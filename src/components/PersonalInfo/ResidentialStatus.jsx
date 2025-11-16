import React, { useState } from 'react';

export default function ResidentialStatus({ data, onChange }) {
  const [days, setDays] = useState(data?.daysInIndia || 0);

  const calculateStatus = (d) => {
    if (d >= 182) return 'RESIDENT';
    if (d >= 120) return 'RNOR';
    return 'NON_RESIDENT';
  };

  const handleChange = (value) => {
    setDays(value);
    onChange({
      daysInIndia: value,
      status: calculateStatus(value)
    });
  };

  return (
    <div className="residential-status">
      <h3>Residential Status</h3>
      <div className="form-group">
        <label>Days in India (FY 2023-24)</label>
        <input
          type="number"
          value={days}
          onChange={(e) => handleChange(parseInt(e.target.value))}
          className="form-control"
          min="0"
          max="365"
        />
      </div>
      <div className="status-info">
        <p><strong>Status:</strong> {calculateStatus(days)}</p>
        <p className="status-description">
          {days >= 182 && "RESIDENT - Entire world income is taxable"}
          {days >= 120 && days < 182 && "RNOR - Only Indian source income is taxable"}
          {days < 120 && "NON-RESIDENT - Only Indian source income is taxable"}
        </p>
      </div>
    </div>
  );
}
