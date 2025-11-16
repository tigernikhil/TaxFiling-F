export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN');
};

export const formatTaxNumber = (num) => {
  return num.toLocaleString('en-IN');
};
