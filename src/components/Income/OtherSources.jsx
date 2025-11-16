import React, { useState } from 'react';

export default function OtherSources({ data, onChange }) {
  const [sources, setSources] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...sources, [field]: value};
    setSources(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Income from Other Sources</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Bank Interest</label>
          <input type="number" value={sources.bankInterest || ''} onChange={(e) => handleChange('bankInterest', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dividend Income</label>
          <input type="number" value={sources.dividend || ''} onChange={(e) => handleChange('dividend', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest on Securities</label>
          <input type="number" value={sources.securitiesInterest || ''} onChange={(e) => handleChange('securitiesInterest', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rental Income (non-property)</label>
          <input type="number" value={sources.rental || ''} onChange={(e) => handleChange('rental', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Commission/Fees</label>
          <input type="number" value={sources.commission || ''} onChange={(e) => handleChange('commission', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Income</label>
          <input type="number" value={sources.other || ''} onChange={(e) => handleChange('other', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Total Other Sources</label>
          <div className="text-lg font-semibold text-blue-600">
            ₹{(sources.bankInterest || 0) + (sources.dividend || 0) + (sources.securitiesInterest || 0) + (sources.rental || 0) + (sources.commission || 0) + (sources.other || 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
