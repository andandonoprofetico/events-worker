export const castBoolean = (value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value;
  }

  return value === 'true';
};
