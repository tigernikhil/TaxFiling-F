import React, { useState } from 'react';
import DocumentUploader from '../components/Filing/DocumentUploader';
import HTMLImport from '../components/Prefill/HTMLImport';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  const handleUpload = (newDoc) => {
    setDocuments([...documents, newDoc]);
  };

  return (
    <div className="documents-page">
      <h1>Documents & Forms</h1>
      <div className="document-section">
        <h2>Upload Documents</h2>
        <DocumentUploader onUpload={handleUpload} />
      </div>
      <div className="html-import-section">
        <h2>Import HTML Statement</h2>
        <HTMLImport onDataExtracted={handleUpload} />
      </div>
      <div className="documents-list">
        <h2>Your Documents</h2>
        {documents.map((doc, idx) => (
          <div key={idx} className="document-item">
            <p>{doc.fileName}</p>
            <span>{doc.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
