import React, { createContext, useState, useEffect } from 'react';

export const TaxReturnContext = createContext();

export function TaxReturnProvider({ children }) {
  const [currentReturn, setCurrentReturn] = useState(null);
  const [returns, setReturns] = useState([]);

  return (
    <TaxReturnContext.Provider value={{ 
      currentReturn, 
      setCurrentReturn,
      returns,
      setReturns
    }}>
      {children}
    </TaxReturnContext.Provider>
  );
}
