import React from 'react';

export default function BasicDetails({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({...data, [field]: value});
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name *</label>
        <input
          type="text"
          value={data.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Middle Name</label>
        <input
          type="text"
          value={data.middleName || ''}
          onChange={(e) => handleChange('middleName', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Last Name *</label>
        <input
          type="text"
          value={data.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Father's Name *</label>
        <input
          type="text"
          value={data.fatherName || ''}
          onChange={(e) => handleChange('fatherName', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Date of Birth *</label>
        <input
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
}
