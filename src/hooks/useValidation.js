import { useState, useCallback } from 'react';

/**
 * Hook for form validation
 */
export function useValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const validate = useCallback((validationRules) => {
    const newErrors = {};

    Object.entries(validationRules).forEach(([field, rule]) => {
      const value = values[field];

      if (rule.required && !value) {
        newErrors[field] = `${field} is required`;
        return;
      }

      if (rule.pattern && value && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || `${field} is invalid`;
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        newErrors[field] = `${field} must be at least ${rule.minLength} characters`;
      }

      if (rule.maxLength && value && value.length > rule.maxLength) {
        newErrors[field] = `${field} must be at most ${rule.maxLength} characters`;
      }

      if (rule.min && value && parseFloat(value) < rule.min) {
        newErrors[field] = `${field} must be at least ${rule.min}`;
      }

      if (rule.max && value && parseFloat(value) > rule.max) {
        newErrors[field] = `${field} must be at most ${rule.max}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
    setErrors
  };
}
