import React, { createContext, useState } from 'react';

export const FilingProgressContext = createContext();

export function FilingProgressProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const markComplete = (step) => setCompletedSteps(prev => [...prev, step]);

  return (
    <FilingProgressContext.Provider value={{
      currentStep,
      setCurrentStep,
      completedSteps,
      nextStep,
      prevStep,
      markComplete
    }}>
      {children}
    </FilingProgressContext.Provider>
  );
}
