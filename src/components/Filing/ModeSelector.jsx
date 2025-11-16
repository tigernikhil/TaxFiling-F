// frontend/src/components/Filing/ModeSelector.jsx
import React from 'react';

export default function ModeSelector({ onModeSelect }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Choose Your Filing Mode</h2>
      <p className="text-gray-600">Select how you want to file your tax return</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Manual Entry */}
        <div 
          onClick={() => onModeSelect('manual')}
          className="card border-2 border-gray-200 hover:border-blue-600 cursor-pointer transition transform hover:scale-105"
        >
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-2xl font-bold mb-3">Manual Entry</h3>
          <p className="text-gray-600 mb-4">Fill all your tax details step by step with our guided form</p>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ Income entry</li>
            <li>✓ Deductions</li>
            <li>✓ Asset holdings</li>
            <li>✓ Bank details</li>
          </ul>
        </div>

        {/* Document Upload */}
        <div 
          onClick={() => onModeSelect('upload')}
          className="card border-2 border-gray-200 hover:border-green-600 cursor-pointer transition transform hover:scale-105"
        >
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-2xl font-bold mb-3">Document Upload</h3>
          <p className="text-gray-600 mb-4">Auto-extract data from your tax documents</p>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ Form 16 & 26AS</li>
            <li>✓ Zerodha & Groww P&L</li>
            <li>✓ Foreign stocks</li>
            <li>✓ Bank statements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}