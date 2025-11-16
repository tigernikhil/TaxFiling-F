import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const STATES = [
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'DL', label: 'Delhi' },
  // Add all states
];

export default function AddressForm({ address, onSave, onCancel }) {
  const [formData, setFormData] = useState(address || {});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <Input
        label="Flat/Door No"
        value={formData.flatDoor || ''}
        onChange={(e) => handleChange('flatDoor', e.target.value)}
        required
      />
      <Input
        label="Building/Premises"
        value={formData.premise || ''}
        onChange={(e) => handleChange('premise', e.target.value)}
      />
      <Input
        label="Road/Street"
        value={formData.road || ''}
        onChange={(e) => handleChange('road', e.target.value)}
      />
      <Input
        label="Area/Locality"
        value={formData.area || ''}
        onChange={(e) => handleChange('area', e.target.value)}
        required
      />
      <Input
        label="Town/City"
        value={formData.townCity || ''}
        onChange={(e) => handleChange('townCity', e.target.value)}
        required
      />
      <Select
        label="State"
        options={STATES}
        value={formData.state || ''}
        onChange={(e) => handleChange('state', e.target.value)}
        required
      />
      <Input
        label="PIN Code"
        type="text"
        pattern="[0-9]{6}"
        value={formData.pinCode || ''}
        onChange={(e) => handleChange('pinCode', e.target.value)}
        required
      />
      <div className="form-actions">
        <Button type="submit">Save Address</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
