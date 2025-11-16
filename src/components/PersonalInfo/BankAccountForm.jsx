import React, { useState } from 'react';
import Input from '../common/Input';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';

export default function BankAccountForm({ account, onSave, onCancel }) {
  const [formData, setFormData] = useState(account || {});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bank-account-form">
      <Input
        label="Bank Name"
        value={formData.bankName || ''}
        onChange={(e) => handleChange('bankName', e.target.value)}
        required
      />
      <Input
        label="Account Number"
        value={formData.accountNumber || ''}
        onChange={(e) => handleChange('accountNumber', e.target.value)}
        required
      />
      <Input
        label="IFSC Code"
        value={formData.ifscCode || ''}
        onChange={(e) => handleChange('ifscCode', e.target.value)}
        pattern="[A-Z]{4}0[A-Z0-9]{6}"
        required
      />
      <Input
        label="Account Type"
        value={formData.accountType || ''}
        onChange={(e) => handleChange('accountType', e.target.value)}
        placeholder="Savings/Current"
      />
      <Checkbox
        label="Set as Primary Account"
        checked={formData.isPrimary || false}
        onChange={(e) => handleChange('isPrimary', e.target.checked)}
      />
      <div className="form-actions">
        <Button type="submit">Save Account</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
