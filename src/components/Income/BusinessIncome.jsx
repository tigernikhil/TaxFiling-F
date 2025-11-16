import React, { useState } from 'react';

export default function BusinessIncome({ data, onChange }) {
  const [business, setBusiness] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...business, [field]: value};
    setBusiness(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Business/Professional Income</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nature of Business</label>
          <input type="text" value={business.nature || ''} onChange={(e) => handleChange('nature', e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gross Receipts/Turnover</label>
          <input type="number" value={business.turnover || ''} onChange={(e) => handleChange('turnover', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cost of Goods Sold</label>
          <input type="number" value={business.cogs || ''} onChange={(e) => handleChange('cogs', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Operating Expenses</label>
          <input type="number" value={business.expenses || ''} onChange={(e) => handleChange('expenses', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Depreciation</label>
          <input type="number" value={business.depreciation || ''} onChange={(e) => handleChange('depreciation', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest on Borrowing</label>
          <input type="number" value={business.interest || ''} onChange={(e) => handleChange('interest', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Gross Profit</label>
          <div className="text-lg font-semibold text-blue-600">
            ₹{((business.turnover || 0) - (business.cogs || 0) - (business.expenses || 0) - (business.depreciation || 0))}
          </div>
        </div>
      </div>
    </div>
  );
}
