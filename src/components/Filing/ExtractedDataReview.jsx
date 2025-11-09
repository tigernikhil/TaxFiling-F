import React, { useState } from 'react';

export default function ExtractedDataReview({ data, onConfirm, onEdit }) {
  const [editedData, setEditedData] = useState(data);

  const handleChange = (section, field, value) => {
    setEditedData({
      ...editedData,
      [section]: { ...editedData[section], [field]: value }
    });
  };

  return (
    <div className="card space-y-6">
      <h2 className="text-2xl font-bold">Review Extracted Data</h2>
      
      {/* Income Section */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-lg mb-4">Income Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(editedData.incomeDetails || {}).map(([key, value]) => (
            <div key={key}>
              <label className="form-label">{key}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleChange('incomeDetails', key, e.target.value)}
                className="form-input"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-lg mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(editedData.personalInfo || {}).map(([key, value]) => (
            <div key={key}>
              <label className="form-label">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange('personalInfo', key, e.target.value)}
                className="form-input"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={() => onConfirm(editedData)} className="btn-primary flex-1">
          ✓ Confirm & Continue
        </button>
        <button onClick={onEdit} className="btn-secondary flex-1">
          ← Edit Manually
        </button>
      </div>
    </div>
  );
}