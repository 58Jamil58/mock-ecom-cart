
const USD_TO_INR_RATE = 83;

export const convertToINR = (usdAmount) => {
  return Math.round(usdAmount * USD_TO_INR_RATE);
};

export const formatINR = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
