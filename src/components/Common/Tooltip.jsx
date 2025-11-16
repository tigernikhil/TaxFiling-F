import React, { useState } from 'react';
import './Tooltip.css';

export default function Tooltip({ children, content, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`tooltip tooltip-${position}`}>
          {content}
        </div>
      )}
    </div>
  );
}
