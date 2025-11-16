export const validationService = {
  validatePAN: (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  },

  validateAadhaar: (aadhaar) => {
    const cleaned = aadhaar.replace(/\s/g, '');
    return /^[0-9]{12}$/.test(cleaned);
  },

  validateIFSC: (ifsc) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  },

  validatePinCode: (pincode) => {
    return /^[0-9]{6}$/.test(pincode);
  },

  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validateMobile: (mobile) => {
    const cleaned = mobile.replace(/[^0-9]/g, '');
    return /^[6-9][0-9]{9}$/.test(cleaned);
  }
};
