import React, { useState } from 'react';
import { uploadAPI } from '../../services/api';  // Use centralized api service

export default function FileUpload({ returnId, onDataExtracted }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const onFileChange = e => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('returnId', returnId);
    if (password) {
      formData.append('password', password);
    }

    setUploading(true);
    setMessage('');

    try {
      // Use uploadAPI service from centralized api.js
      const response = await uploadAPI.uploadDocument(returnId, formData);

      // Notify parent of extracted data
      if (onDataExtracted) {
        onDataExtracted(response.data.extractedData);
      }

      setMessage('File uploaded and processed successfully');
    } catch (error) {
      setMessage('Upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block mb-1">Select PDF file</label>
        <input type="file" accept="application/pdf" onChange={onFileChange} />
      </div>
      <div>
        <label className="block mb-1">Password (if PDF is protected)</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          className="form-input"
          placeholder="PDF Password"
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="btn-primary w-full"
      >
        {uploading ? 'Uploading...' : 'Upload and Extract Data'}
      </button>
      {message && <p className="mt-2 text-center text-gray-700">{message}</p>}
    </form>
  );
}
