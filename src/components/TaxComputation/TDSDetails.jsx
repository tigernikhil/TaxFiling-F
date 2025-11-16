import React from 'react';

export default function TDSDetails({ data }) {
  return (
    <div className="tds-details">
      <h3>Tax Deducted at Source (TDS)</h3>
      <div className="tds-breakdown">
        <div className="row">
          <span>TDS on Salary:</span>
          <span>₹{(data?.salary || 0).toLocaleString()}</span>
        </div>
        <div className="row">
          <span>TDS on Interest:</span>
          <span>₹{(data?.interest || 0).toLocaleString()}</span>
        </div>
        <div className="row">
          <span>TDS on Commission:</span>
          <span>₹{(data?.commission || 0).toLocaleString()}</span>
        </div>
        <div className="row font-bold">
          <span>Total TDS:</span>
          <span>₹{((data?.salary || 0) + (data?.interest || 0) + (data?.commission || 0)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
