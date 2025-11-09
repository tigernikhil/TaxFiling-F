import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentUploader from './DocumentUploader';
import ManualEntry from './ManualEntry';
import { returnsAPI } from '../../services/api';

export default function FilingTabs() {
  const [activeTab, setActiveTab] = useState('upload'); // or 'manual'
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { returnId } = useParams();
  const navigate = useNavigate();

  // Load existing data on mount
  useEffect(() => {
    returnsAPI.getOne(returnId).then(({ data }) => {
      setFormData(data);
      setLoading(false);
    });
  }, [returnId]);

  // Save incremental update
  const handleFormUpdate = async updatedData => {
    try {
      await returnsAPI.update(returnId, updatedData);
      setFormData(updatedData);
    } catch (error) {
      console.error('Save failed', error);
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('upload')}
          className={activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}
        >
          Upload Documents
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={activeTab === 'manual' ? 'btn-primary' : 'btn-secondary'}
          disabled={loading}
        >
          Manual Entry
        </button>
      </div>
      <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary"
        >
          Go to Dashboard
        </button>
      {loading && <div>Loading...</div>}
      {!loading && activeTab === 'upload' && (
        <DocumentUploader
          returnId={returnId}
          onDataExtracted={extracted => {
            const merged = { ...formData, ...extracted };
            setFormData(merged);
            handleFormUpdate(merged);
            setActiveTab('manual');
          }}
        />
      )}
      {!loading && activeTab === 'manual' && (
        <ManualEntry
          returnId={returnId}
          defaultValues={formData}
          onNext={() => {}}
          onFormChange={handleFormUpdate}
        />
      )}
    </div>
  );
}
