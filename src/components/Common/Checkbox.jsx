import React from 'react';
import './Checkbox.css';

export default function Checkbox({ label, checked, onChange, disabled = false }) {
  return (
    <label className={`checkbox-label ${disabled ? 'checkbox-disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox-input"
      />
      <span className="checkbox-custom"></span>
      <span className="checkbox-text">{label}</span>
    </label>
  );
}
