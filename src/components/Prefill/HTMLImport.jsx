import React, { useState } from 'react';
import axios from 'axios';

export default function HTMLImport({ onDataExtracted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== 'text/html' && !file.name.endsWith('.html')) {
      setError('Please upload an HTML file');
      return;
    }

    setLoading(true);
    setError('');
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('htmlFile', file);

      const response = await axios.post(
        '/api/prefill/html',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      const extractedData = response.data.extractedData;

      // Show extracted data for confirmation
      onDataExtracted(extractedData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to parse HTML file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Import HTML Statement</h3>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <label className="cursor-pointer">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-8-12l8 8m0 0l-8 8" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">
            {fileName ? 'Click to change file' : 'Click or drag HTML file here'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Supported: HTML files exported from tax portals</p>

          <input
            type="file"
            accept=".html"
            onChange={handleFileUpload}
            disabled={loading}
            className="hidden"
          />
        </label>
      </div>

      {fileName && (
        <div className="mt-4 p-3 bg-blue-50 rounded text-blue-800">
          📄 {fileName}
        </div>
      )}

      {loading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2">Parsing HTML...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
