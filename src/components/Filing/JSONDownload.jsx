// src/components/Filing/JSONDownload.jsx
import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';

export default function JSONDownload({ returnId }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    generateJSON();
  }, []);

  const generateJSON = async () => {
    setLoading(true);
    try {
      const response = await returnsAPI.generateJSON(returnId);
      setJsonData(response.data.json);
      setFileName(response.data.fileName);
    } catch (err) {
      setError('Failed to generate JSON');
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-center py-12"><p>Generating JSON...</p></div>;
  }

  if (!jsonData) {
    return <div className="text-center py-12"><p>No JSON data available</p></div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-2">✓ Ready to File</h2>
        <p className="text-green-700">Your ITR-1 JSON is ready for submission to the Income Tax Portal</p>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadJSON}
        className="btn-primary w-full py-4 text-lg font-semibold"
      >
        📥 Download JSON File ({fileName})
      </button>

      {/* JSON Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">JSON Preview</h3>
        <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          <pre className="text-xs text-gray-800 font-mono">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Portal Instructions */}
      <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">How to Upload to Income Tax Portal</h3>
        <ol className="space-y-3 text-blue-900">
          <li className="flex items-start">
            <span className="font-bold mr-3">1.</span>
            <span>Visit <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">incometax.gov.in</a></span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">2.</span>
            <span>Login with your credentials</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">3.</span>
            <span>Click "e-File" → "Income Tax Return"</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">4.</span>
            <span>Select Assessment Year 2024-25</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">5.</span>
            <span>Choose "Offline" mode</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">6.</span>
            <span>Click "Attach File" and upload the downloaded JSON</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">7.</span>
            <span>Portal will validate the JSON</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">8.</span>
            <span>Proceed to Digital Signature (DSC or e-sign)</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-3">9.</span>
            <span>File your return!</span>
          </li>
        </ol>
      </div>

      {/* Return Details Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm">Total Income</p>
          <p className="text-2xl font-bold text-gray-800">
            ₹{jsonData.incomeDetails.salary.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Total Tax</p>
          <p className="text-2xl font-bold text-red-600">
            ₹{jsonData.taxCalculation.totalTax.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Refund/Payable</p>
          <p className={`text-2xl font-bold ${jsonData.taxCalculation.refundDue > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {jsonData.taxCalculation.refundDue > 0 ? '+' : ''}₹{(jsonData.taxCalculation.refundDue || jsonData.taxCalculation.taxPayable).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}