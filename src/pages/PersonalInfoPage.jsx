import React, { useState } from 'react';
import PersonalInfoForm from '../components/PersonalInfo/PersonalInfoForm';
import AddressManager from '../components/PersonalInfo/AddressManager';
import ResidentialStatus from '../components/PersonalInfo/ResidentialStatus';

export default function PersonalInfoPage() {
  const [personalInfo, setPersonalInfo] = useState({});

  const handleSave = (data) => {
    setPersonalInfo(data);
    // API call to save data
    console.log('Saving personal info:', data);
  };

  return (
    <div className="personal-info-page">
      <h1>Personal Information</h1>
      <PersonalInfoForm returnData={personalInfo} onSave={handleSave} />
    </div>
  );
}
