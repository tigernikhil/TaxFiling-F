import React, { useState } from 'react';

export default function HouseProperty({ data, onChange }) {
  const [property, setProperty] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...property, [field]: value};
    setProperty(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">House Property Income</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Address</label>
          <input type="text" value={property.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ownership Type</label>
          <select value={property.ownershipType || 'SELF'} onChange={(e) => handleChange('ownershipType', e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>SELF_OCCUPIED</option>
            <option>LET_OUT</option>
            <option>DEEMED_LET_OUT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Rent Received</label>
          <input type="number" value={property.rentReceived || ''} onChange={(e) => handleChange('rentReceived', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Municipal Value</label>
          <input type="number" value={property.municipalValue || ''} onChange={(e) => handleChange('municipalValue', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Standard Deduction (%)</label>
          <input type="number" value={property.standardDeduction || 30} onChange={(e) => handleChange('standardDeduction', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest on Loan</label>
          <input type="number" value={property.interestOnLoan || ''} onChange={(e) => handleChange('interestOnLoan', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
      </div>
    </div>
  );
}
