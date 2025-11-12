// src/components/Filing/FilingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { returnsAPI } from '../../services/api';
import ManualEntry from './ManualEntry';
import FileUpload from './FileUpload';
import DocumentUploader from './DocumentUploader';
import TaxComparison from './TaxComparison';
import JSONDownload from './JSONDownload';

export default function FilingPage() {
  const { returnId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('mode'); // mode, manual, comparison, download
  const [filingMode, setFilingMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [returnData, setReturnData] = useState(null);
  const location = useLocation();

  const handleModeSelect = (mode) => {
    setFilingMode(mode);
    if (mode === 'manual') {
      setCurrentStep('manual');
    } else {
      setCurrentStep('upload');
    }
  };

  useEffect(() => {
    // If navigated here with a state asking to open manual tab (from upload), honour it
    if (location.state?.activeTab === 'manual') {
      setCurrentStep('manual');
    }
  }, [location.state]);

  useEffect(() => {
    async function fetchReturn() {
      try {
        const response = await returnsAPI.getOne(returnId);
        setReturnData(response.data);
      } catch (err) {
        // ignore for now
      }
    }
    fetchReturn();
  }, [returnId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ITR Filing</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentStep === 'mode' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Choose Filing Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manual Entry Mode */}
              <div
                onClick={() => handleModeSelect('manual')}
                className="card border-2 border-gray-200 hover:border-blue-600 cursor-pointer transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">Manual Entry</h3>
                <p className="text-gray-600 mb-4">
                  Fill out your tax information step-by-step using our guided form
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Easy-to-use form wizard</li>
                  <li>✓ Real-time tax calculation</li>
                  <li>✓ Save and resume later</li>
                  <li>✓ Perfect for simple returns</li>
                </ul>
              </div>

              {/* File Upload Mode */}
              <div
                onClick={() => handleModeSelect('upload')}
                className="card border-2 border-gray-200 hover:border-blue-600 cursor-pointer transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">File Upload</h3>
                <p className="text-gray-600 mb-4">
                  Upload your documents and we'll auto-fill your tax information
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Upload Form 16, 26AS, etc.</li>
                  <li>✓ Auto-fill from documents</li>
                  <li>✓ Verify extracted data</li>
                  <li>✓ Fast and accurate</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'manual' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fill Your Tax Information</h2>
            <ManualEntry
              returnId={returnId}
              defaultValues={returnData}
              extractedData={extractedData}
              onNext={() => setCurrentStep('comparison')}
            />
          </div>
        )}

        {currentStep === 'upload' && (
  <>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Form 16 / 26AS / Other PDFs</h2>
    {/* <FileUpload returnId={returnId} /> */}
    <DocumentUploader returnId={returnId} onDataExtracted={setExtractedData} />
    {/* After upload success, fetch extracted data and let user edit or confirm */}
  </>
)}


        {currentStep === 'comparison' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Compare Tax Regimes</h2>
            <TaxComparison
              returnId={returnId}
              onNext={() => setCurrentStep('download')}
            />
          </div>
        )}

        {currentStep === 'download' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Download JSON & File</h2>
            <JSONDownload returnId={returnId} />
          </div>
        )}
      </main>
    </div>
  );
}