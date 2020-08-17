const sanitizeCostValue = (cost: string): number => {
  const sanitizedCost = cost.replace(/(r\$|( )|'.')/gim, '').replace(',', '.');

  return Number(sanitizedCost);
};

export default sanitizeCostValue;
