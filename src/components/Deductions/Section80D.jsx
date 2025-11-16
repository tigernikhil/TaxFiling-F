import React, { useState } from 'react';

export default function Section80D({ data, onChange }) {
  const [deduction, setDeduction] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...deduction, [field]: value};
    setDeduction(updated);
    onChange(updated);
  };

  const maxDeduction = deduction.hasSeniorCitizen ? 75000 : 50000;

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Section 80D - Health Insurance</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Self Health Insurance</label>
          <input type="number" value={deduction.selfInsurance || ''} onChange={(e) => handleChange('selfInsurance', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse Health Insurance</label>
          <input type="number" value={deduction.spouseInsurance || ''} onChange={(e) => handleChange('spouseInsurance', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Children Health Insurance</label>
          <input type="number" value={deduction.childrenInsurance || ''} onChange={(e) => handleChange('childrenInsurance', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parents Health Insurance</label>
          <input type="number" value={deduction.parentsInsurance || ''} onChange={(e) => handleChange('parentsInsurance', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="flex items-center">
            <input type="checkbox" checked={deduction.hasSeniorCitizen || false} onChange={(e) => handleChange('hasSeniorCitizen', e.target.checked)} className="mr-2" />
            <span className="text-sm font-medium">Any parent is Senior Citizen (60+)?</span>
          </label>
        </div>
        <div className="col-span-2 bg-blue-50 p-3 rounded">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Insurance Premium:</span>
            <span className="text-lg font-bold text-blue-600">₹{(deduction.selfInsurance || 0) + (deduction.spouseInsurance || 0) + (deduction.childrenInsurance || 0) + (deduction.parentsInsurance || 0)}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span>Deduction Limit:</span>
            <span>₹{maxDeduction}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
