const formatAmount = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getFormatedPrice = (amount, decimals = 2) => {
  const fixedPrice = `${Number.parseFloat(amount).toFixed(decimals)}`;
  const [integerPart, decimalPart] = fixedPrice.split('.');

  return `$ ${formatAmount(integerPart)}.${decimalPart}`;
};

export {
  getFormatedPrice,
};