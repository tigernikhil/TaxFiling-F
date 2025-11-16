export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN');
}

export function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function getFinancialYear(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  if (month < 3) {
    return `${year - 1}-${year.toString().slice(-2)}`;
  }
  return `${year}-${(year + 1).toString().slice(-2)}`;
}
