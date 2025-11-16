import React, { useState } from 'react';

export default function CapitalGains({ data, onChange }) {
  const [gains, setGains] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...gains, [field]: value};
    setGains(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Capital Gains</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Asset Type</label>
          <select value={gains.assetType || ''} onChange={(e) => handleChange('assetType', e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>EQUITY_SHARES</option>
            <option>MUTUAL_FUND</option>
            <option>PROPERTY</option>
            <option>BONDS</option>
            <option>OTHER</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Period</label>
          <select value={gains.holdingPeriod || ''} onChange={(e) => handleChange('holdingPeriod', e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>SHORT_TERM</option>
            <option>LONG_TERM</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Value</label>
          <input type="number" value={gains.purchaseValue || ''} onChange={(e) => handleChange('purchaseValue', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Value</label>
          <input type="number" value={gains.saleValue || ''} onChange={(e) => handleChange('saleValue', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Indexed Cost (LTCG)</label>
          <input type="number" value={gains.indexedCost || ''} onChange={(e) => handleChange('indexedCost', parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Capital Gain</label>
          <div className="text-lg font-semibold text-blue-600">
            ₹{((gains.saleValue || 0) - (gains.purchaseValue || 0))}
          </div>
        </div>
      </div>
    </div>
  );
}
