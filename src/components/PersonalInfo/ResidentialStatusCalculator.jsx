import React, { useState, useEffect } from 'react';
import Input from '../common/Input';

export default function ResidentialStatusCalculator({ value, onChange }) {
  const [daysInIndia, setDaysInIndia] = useState(value?.daysInIndia || 0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    calculateStatus(daysInIndia);
  }, [daysInIndia]);

  const calculateStatus = (days) => {
    let resStatus = '';
    if (days >= 182) {
      resStatus = 'RESIDENT';
    } else if (days >= 120) {
      resStatus = 'RNOR';
    } else {
      resStatus = 'NON_RESIDENT';
    }
    setStatus(resStatus);
    if (onChange) {
      onChange({ daysInIndia: days, status: resStatus });
    }
  };

  return (
    <div className="residential-status-calc">
      <h3>Residential Status Calculator</h3>
      <Input
        label="Days in India (FY 2023-24)"
        type="number"
        min="0"
        max="365"
        value={daysInIndia}
        onChange={(e) => {
          const days = parseInt(e.target.value) || 0;
          setDaysInIndia(days);
        }}
        helperText="Number of days you stayed in India during the financial year"
      />
      <div className="status-result">
        <strong>Status: </strong>
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <div className="status-info">
        {status === 'RESIDENT' && (
          <p>Your worldwide income is taxable in India</p>
        )}
        {status === 'RNOR' && (
          <p>Resident but Not Ordinarily Resident - Only Indian source income is taxable</p>
        )}
        {status === 'NON_RESIDENT' && (
          <p>Only income received or accrued in India is taxable</p>
        )}
      </div>
    </div>
  );
}
