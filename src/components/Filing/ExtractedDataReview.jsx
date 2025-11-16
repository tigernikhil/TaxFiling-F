import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

export default function ExtractedDataReview({ data, onConfirm, onEdit }) {
  const [editedData, setEditedData] = useState(data || {});
  const [editing, setEditing] = useState(false);

  const handleChange = (section, field, value) => {
    setEditedData({
      ...editedData,
      [section]: {
        ...editedData[section],
        [field]: value
      }
    });
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(editedData);
  };

  const handleEdit = () => {
    setEditing(true);
    if (onEdit) onEdit();
  };

  if (!data) {
    return <div className="no-data">No extracted data available</div>;
  }

  return (
    <div className="extracted-data-review">
      <h3>📋 Review Extracted Data</h3>
      <p className="description">
        Please verify the extracted information and make corrections if needed
      </p>

      <div className="data-sections">
        {/* Personal Info Section */}
        {editedData.personalInfo && (
          <div className="data-section">
            <h4>Personal Information</h4>
            <div className="data-fields">
              <Input
                label="Full Name"
                value={editedData.personalInfo.name || ''}
                onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
                disabled={!editing}
              />
              <Input
                label="PAN"
                value={editedData.personalInfo.pan || ''}
                onChange={(e) => handleChange('personalInfo', 'pan', e.target.value)}
                disabled={!editing}
              />
              <Input
                label="Date of Birth"
                type="date"
                value={editedData.personalInfo.dob || ''}
                onChange={(e) => handleChange('personalInfo', 'dob', e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>
        )}

        {/* Income Section */}
        {editedData.income && (
          <div className="data-section">
            <h4>Income Details</h4>
            <div className="data-fields">
              <Input
                label="Salary Income"
                type="number"
                value={editedData.income.salary || ''}
                onChange={(e) => handleChange('income', 'salary', parseFloat(e.target.value))}
                disabled={!editing}
              />
              <Input
                label="Interest Income"
                type="number"
                value={editedData.income.interest || ''}
                onChange={(e) => handleChange('income', 'interest', parseFloat(e.target.value))}
                disabled={!editing}
              />
            </div>
          </div>
        )}

        {/* TDS Section */}
        {editedData.tds && (
          <div className="data-section">
            <h4>TDS Details</h4>
            <div className="data-fields">
              <Input
                label="TDS on Salary"
                type="number"
                value={editedData.tds.salary || ''}
                onChange={(e) => handleChange('tds', 'salary', parseFloat(e.target.value))}
                disabled={!editing}
              />
              <Input
                label="TDS on Other Income"
                type="number"
                value={editedData.tds.other || ''}
                onChange={(e) => handleChange('tds', 'other', parseFloat(e.target.value))}
                disabled={!editing}
              />
            </div>
          </div>
        )}
      </div>

      <div className="action-buttons">
        {!editing ? (
          <>
            <Button variant="primary" onClick={handleConfirm}>
              ✓ Confirm & Continue
            </Button>
            <Button variant="secondary" onClick={handleEdit}>
              ✏️ Edit Data
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => { setEditing(false); handleConfirm(); }}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => { setEditedData(data); setEditing(false); }}>
              Cancel
            </Button>
          </>
        )}
      </div>

      <div className="data-summary">
        <h4>Extraction Summary</h4>
        <ul>
          <li>Fields Extracted: {Object.keys(data).length}</li>
          <li>Confidence: High</li>
          <li>Source: {data.source || 'Unknown'}</li>
        </ul>
      </div>
    </div>
  );
}
