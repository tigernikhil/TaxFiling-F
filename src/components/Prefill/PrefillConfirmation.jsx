import React, { useState } from 'react';

export default function PrefillConfirmation({ extractedData, onConfirm, onCancel }) {
  const [confirmedData, setConfirmedData] = useState(extractedData);

  const handleChange = (category, field, value) => {
    setConfirmedData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Review Extracted Data</h2>

          {/* Personal Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              {Object.entries(confirmedData.personalInfo || {}).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">{key}</label>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleChange('personalInfo', key, e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Address</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              {Object.entries(confirmedData.address || {}).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">{key}</label>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleChange('address', key, e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              {Object.entries(confirmedData.bankDetails || {}).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">{key}</label>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleChange('bankDetails', key, e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t">
            <button
              onClick={onCancel}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(confirmedData)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
