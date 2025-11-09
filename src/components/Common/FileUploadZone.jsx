import React, { useRef, useState } from 'react';

export default function FileUploadZone({ onFileSelect, accept = '.pdf,.xlsx,.xls' }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) onFileSelect(files[0]);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      }`}
    >
      <div className="text-4xl mb-3">📁</div>
      <h3 className="font-bold mb-2">Drop files here or click to browse</h3>
      <p className="text-gray-600 text-sm">Supported: PDF, Excel (.xlsx, .xls)</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => onFileSelect(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}