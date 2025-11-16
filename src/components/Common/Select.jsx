import React from 'react';
import './Select.css';

export default function Select({ 
  label, 
  options = [], 
  error, 
  required = false,
  ...props 
}) {
  return (
    <div className="select-wrapper">
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select 
        className={`select ${error ? 'select-error' : ''}`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error-text">{error}</span>}
    </div>
  );
}
