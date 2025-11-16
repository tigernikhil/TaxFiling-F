import React, { useState } from 'react';

export default function PanAadhaarCard({ data, onChange }) {
  const [ids, setIds] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...ids, [field]: value};
    setIds(updated);
    onChange(updated);
  };

  const maskAadhaar = (aadhaar) => {
    if (!aadhaar || aadhaar.length < 12) return '';
    return 'XXXX XXXX ' + aadhaar.slice(-4);
  };

  return (
    <div className="pan-aadhaar">
      <h3>Identity Documents</h3>
      <div className="form-group">
        <label>PAN (10 characters)</label>
        <input type="text" value={ids.pan || ''} onChange={(e) => handleChange('pan', e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength="10" />
      </div>
      <div className="form-group">
        <label>Aadhaar (12 digits)</label>
        <input type="text" value={ids.aadhaar || ''} onChange={(e) => handleChange('aadhaar', e.target.value)} placeholder="XXXX XXXX 1234" maxLength="12" />
        <small>For privacy: {maskAadhaar(ids.aadhaar)}</small>
      </div>
      <div className="form-group">
        <label>Aadhaar Enrolment Number (Optional)</label>
        <input type="text" value={ids.aadhaarEnrollment || ''} onChange={(e) => handleChange('aadhaarEnrollment', e.target.value)} />
      </div>
    </div>
  );
}
