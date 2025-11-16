import React, { useState } from 'react';

export default function Section80C({ data, onChange }) {
  const [deduction, setDeduction] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...deduction, [field]: value};
    setDeduction(updated);
    onChange(updated);
  };

  const total = (deduction.ppf || 0) + (deduction.elss || 0) + (deduction.fdrLife || 0) + 
                (deduction.elps || 0) + (deduction.nps || 0) + (deduction.voterIdScheme || 0) +
                (deduction.sukanya || 0) + (deduction.otherApprovedInvestments || 0);

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Section 80C - Investments</h3>
      <p className="text-sm text-gray-600 mb-4">Maximum deduction limit: ₹1,50,000</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">PPF</label>
          <input type="number" value={deduction.ppf || ''} onChange={(e) => handleChange('ppf', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ELSS (Mutual Fund)</label>
          <input type="number" value={deduction.elss || ''} onChange={(e) => handleChange('elss', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Life Insurance Premium</label>
          <input type="number" value={deduction.fdrLife || ''} onChange={(e) => handleChange('fdrLife', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employee Provident Fund (EPF)</label>
          <input type="number" value={deduction.elps || ''} onChange={(e) => handleChange('elps', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NPS (Tier I)</label>
          <input type="number" value={deduction.nps || ''} onChange={(e) => handleChange('nps', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sukanya Samriddhi Scheme</label>
          <input type="number" value={deduction.sukanya || ''} onChange={(e) => handleChange('sukanya', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Home Loan Principal Repayment</label>
          <input type="number" value={deduction.voterIdScheme || ''} onChange={(e) => handleChange('voterIdScheme', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Approved Investments</label>
          <input type="number" value={deduction.otherApprovedInvestments || ''} onChange={(e) => handleChange('otherApprovedInvestments', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2 bg-green-50 p-3 rounded">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Investments:</span>
            <span className="text-lg font-bold">₹{total}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span>Allowable Deduction:</span>
            <span className="text-green-600 font-semibold">₹{Math.min(total, 150000)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
