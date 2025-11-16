import React, { useState } from 'react';

export default function ContactDetails({ data, onChange }) {
  const [contact, setContact] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...contact, [field]: value};
    setContact(updated);
    onChange(updated);
  };

  return (
    <div className="contact-details">
      <h3>Contact Information</h3>
      <div className="form-group">
        <label>Mobile Number</label>
        <input type="tel" value={contact.mobile || ''} onChange={(e) => handleChange('mobile', e.target.value)} placeholder="10-digit mobile" />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" value={contact.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Alternate Mobile</label>
        <input type="tel" value={contact.alternateMobile || ''} onChange={(e) => handleChange('alternateMobile', e.target.value)} />
      </div>
    </div>
  );
}
