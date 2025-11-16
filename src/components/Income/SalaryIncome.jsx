import React, { useState } from 'react';

export default function SalaryIncome({ data, onChange }) {
  const [income, setIncome] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...income, [field]: value};
    setIncome(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Salary Income</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Basic Salary</label>
          <input type="number" value={income.basic || ''} onChange={(e) => handleChange('basic', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">HRA</label>
          <input type="number" value={income.hra || ''} onChange={(e) => handleChange('hra', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dearness Allowance</label>
          <input type="number" value={income.da || ''} onChange={(e) => handleChange('da', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Allowances</label>
          <input type="number" value={income.other || ''} onChange={(e) => handleChange('other', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Gross Salary</label>
          <div className="text-lg font-semibold text-blue-600">
            ₹{(income.basic || 0) + (income.hra || 0) + (income.da || 0) + (income.other || 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
