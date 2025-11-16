import React from 'react';
import './RadioGroup.css';

export default function RadioGroup({ label, options, value, onChange, name }) {
  return (
    <div className="radio-group">
      {label && <label className="radio-group-label">{label}</label>}
      <div className="radio-options">
        {options.map((option, idx) => (
          <label key={idx} className="radio-label">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="radio-input"
            />
            <span className="radio-custom"></span>
            <span className="radio-text">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
