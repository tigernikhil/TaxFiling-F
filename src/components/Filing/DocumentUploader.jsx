import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadService } from '../../services/uploadService';
import Button from '../Common/Button';
import Select from '../Common/Select';
import Input from '../Common/Input';

const DOCUMENT_TYPES = [
  { value: 'form16', label: 'Form 16 (Salary)', needs_password: true },
  { value: 'form26as', label: 'Form 26AS', needs_password: true },
  { value: 'ais', label: 'AIS (Annual Information Statement)', needs_password: false },
  { value: 'tis', label: 'TIS (Tax Information Statement)', needs_password: false },
  { value: 'zerodhaStatement', label: 'Zerodha Tax P&L', needs_password: false },
  { value: 'growStatement', label: 'Groww Tax P&L', needs_password: false },
  { value: 'foreignStocks', label: 'Foreign Stocks (Excel)', needs_password: false },
  { value: 'capitalGains', label: 'Capital Gains Statement', needs_password: false },
  { value: 'html', label: 'HTML Statement', needs_password: false },
];

export default function DocumentUploader({ returnId, onDataExtracted }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [docType, setDocType] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage({ text: '', type: '' });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || !docType) {
      setMessage({ text: 'Please select file and document type', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('returnId', returnId);
    formData.append('documentType', docType);
    if (password) formData.append('password', password);

    setUploading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await uploadService.uploadDocument(
        returnId, 
        formData,
        (progress) => setUploadProgress(progress)
      );

      setMessage({ text: '✓ Document uploaded and data extracted successfully', type: 'success' });

      if (onDataExtracted) {
        onDataExtracted(response.extractedData);
      }

      // Reset form
      setSelectedFile(null);
      setDocType('');
      setPassword('');
      setUploadProgress(0);

      // Navigate to manual entry with extracted data
      setTimeout(() => {
        navigate(`/filing/${returnId}`, { state: { activeTab: 'manual', extractedData: response.extractedData } });
      }, 2000);
    } catch (error) {
      setMessage({ 
        text: 'Upload failed: ' + (error.response?.data?.message || error.message), 
        type: 'error' 
      });
    } finally {
      setUploading(false);
    }
  };

  const selectedDocType = DOCUMENT_TYPES.find(d => d.value === docType);
  const requiresPassword = selectedDocType?.needs_password;

  return (
    <div className="document-uploader">
      <h3>📤 Upload Documents</h3>
      <p className="description">Upload your tax documents and we'll automatically extract the data</p>

      <form onSubmit={handleUpload} className="upload-form">
        <Select
          label="Document Type"
          options={DOCUMENT_TYPES}
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          required
        />

        <div className="file-input-wrapper">
          <label htmlFor="file-upload" className="file-label">
            {selectedFile ? `Selected: ${selectedFile.name}` : 'Choose File'}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.xml,.xlsx,.xls,.html"
            required
          />
        </div>

        {requiresPassword && (
          <Input
            type="password"
            label="PDF Password (if protected)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter PDF password"
          />
        )}

        {uploading && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            <span className="progress-text">{uploadProgress}%</span>
          </div>
        )}

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <Button type="submit" loading={uploading} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload & Extract Data'}
        </Button>
      </form>

      <div className="supported-formats">
        <h4>Supported Formats:</h4>
        <ul>
          <li>📄 PDF files (Form 16, Form 26AS)</li>
          <li>📊 Excel files (.xlsx, .xls)</li>
          <li>🌐 HTML files</li>
          <li>📋 XML files (AIS, TIS)</li>
        </ul>
      </div>
    </div>
  );
}
