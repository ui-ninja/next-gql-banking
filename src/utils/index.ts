export const formatCardNumber = (value: number) => {
  const cardNumber = String(value);
  const v = cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
};

export const isExistingEmailUsed = (error: any) => {
  return (
    error?.response?.errors &&
    error.response.errors[0]?.extensions?.exception?.code === 11000
  );
};
