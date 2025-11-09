import React from 'react';

export default function ProgressBar({ current, total, labels }) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        {labels.map((label, idx) => (
          <div key={idx} className={`text-sm font-medium ${idx < current ? 'text-green-600' : idx === current ? 'text-blue-600' : 'text-gray-400'}`}>
            {label}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}