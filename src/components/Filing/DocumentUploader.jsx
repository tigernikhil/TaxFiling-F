import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAPI } from '../../services/api';

const DOCUMENT_TYPES = [
  { value: 'form16', label: 'Form 16 (Salary)', needs_password: true },
  { value: 'form26as', label: 'Form 26AS', needs_password: true },
  { value: 'zerodhaStatement', label: 'Zerodha Tax P&L', needs_password: false },
  { value: 'growStatement', label: 'Groww Tax P&L', needs_password: false },
  { value: 'foreignStocks', label: 'Foreign Stocks (Excel)', needs_password: false },
  { value: 'capitalGains', label: 'Capital Gains Statement', needs_password: false },
];

export default function DocumentUploader({ returnId, onDataExtracted }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [docType, setDocType] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !docType) {
      setMessage('Select file and type');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('returnId', returnId);
    formData.append('documentType', docType);
    if (password) formData.append('password', password);

    setUploading(true);
    setMessage('');

    try {
      const response = await uploadAPI.uploadDocument(returnId, formData);
      setMessage('✓ Uploaded & extracted');
      if (onDataExtracted) onDataExtracted(response.data.extractedData);
      setSelectedFile(null);
      setDocType('');
      setPassword('');
      navigate(`/filing/${returnId}`, { state: { activeTab: 'manual' } });
    } catch (error) {
      setMessage('Failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const selected = DOCUMENT_TYPES.find(d => d.value === docType);

  return (
    <form onSubmit={handleUpload} className="card space-y-4">
      <h3 className="text-lg font-bold">Upload Document</h3>

      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        className="form-input"
        required
      >
        <option value="">Select document...</option>
        {DOCUMENT_TYPES.map(d => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      <input
        type="file"
        accept=".pdf,.xlsx,.xls"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="form-input"
        required
      />

      {selected?.needs_password && (
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="PDF Password"
        />
      )}

      <button
        type="submit"
        disabled={uploading}
        className="btn-primary w-full"
      >
        {uploading ? 'Uploading...' : 'Upload & Extract'}
      </button>

      {message && (
        <p className={message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}>
          {message}
        </p>
      )}
    </form>
  );
}
