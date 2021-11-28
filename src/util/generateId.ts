export const generateId = (text?: string) => {
  return `${text}_${Math.random().toString(16).slice(6)}`;
};

export const keyGen = (text?: string) => {
  return `${text}${Math.random().toString(16).slice(8)}`;
};
