const sanitizePhoneNumber = (phoneToSanitize: string): string => {
  const whatsSanitized = phoneToSanitize.replace(/(\(|\)|( )|_|(-))/gim, '');

  return whatsSanitized;
};

export default sanitizePhoneNumber;
