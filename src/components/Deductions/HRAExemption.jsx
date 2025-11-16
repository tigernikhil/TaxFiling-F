import React, { useState, useEffect } from 'react';

export default function HRAExemption({ data, onChange }) {
  const [hra, setHra] = useState(data || {});
  const [calculated, setCalculated] = useState(0);

  useEffect(() => {
    calculateHRA();
  }, [hra]);

  const calculateHRA = () => {
    const basicDA = (hra.basicSalary || 0) + (hra.da || 0);
    const rentPaid = hra.rentPaid || 0;

    let exemption = 0;

    // HRA exemption = Least of:
    // 1. Actual HRA received
    const actualHRA = hra.hraReceived || 0;

    // 2. 50% of (Basic + DA) if metro, 40% if non-metro
    const percentageExemption = (hra.isMetro ? 0.5 : 0.4) * basicDA;

    // 3. Rent paid - 10% of (Basic + DA)
    const rentExemption = Math.max(0, rentPaid - (0.1 * basicDA));

    exemption = Math.min(actualHRA, percentageExemption, rentExemption);
    setCalculated(exemption);
    onChange({...hra, exemption});
  };

  const handleChange = (field, value) => {
    const updated = {...hra, [field]: value};
    setHra(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">HRA Exemption Calculation</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Basic Salary</label>
          <input type="number" value={hra.basicSalary || ''} onChange={(e) => handleChange('basicSalary', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dearness Allowance (DA)</label>
          <input type="number" value={hra.da || ''} onChange={(e) => handleChange('da', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">HRA Received</label>
          <input type="number" value={hra.hraReceived || ''} onChange={(e) => handleChange('hraReceived', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Actual Rent Paid (Annual)</label>
          <input type="number" value={hra.rentPaid || ''} onChange={(e) => handleChange('rentPaid', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="flex items-center">
            <input type="checkbox" checked={hra.isMetro || false} onChange={(e) => handleChange('isMetro', e.target.checked)} className="mr-2" />
            <span className="text-sm font-medium">Is this a Metro City? (50% exemption instead of 40%)</span>
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded">
        <h4 className="font-semibold mb-3">HRA Exemption Calculation</h4>
        <div className="space-y-2 text-sm">
          <div>1. Actual HRA: ₹{hra.hraReceived || 0}</div>
          <div>2. {hra.isMetro ? '50%' : '40%'} of (Basic + DA): ₹{Math.round((hra.isMetro ? 0.5 : 0.4) * ((hra.basicSalary || 0) + (hra.da || 0)))}</div>
          <div>3. Rent paid - 10% of (Basic + DA): ₹{Math.max(0, (hra.rentPaid || 0) - (0.1 * ((hra.basicSalary || 0) + (hra.da || 0))))}</div>
          <div className="border-t pt-2 mt-2 font-bold text-lg">
            HRA Exemption (Least of above): ₹{calculated}
          </div>
        </div>
      </div>
    </div>
  );
}
