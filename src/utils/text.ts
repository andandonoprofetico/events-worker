export const isJson = (
  string: string,
): {
  is: boolean;
  payload: any;
} => {
  try {
    const result = JSON.parse(string);
    return {
      is: true,
      payload: result,
    };
  } catch (error) {
    return {
      is: false,
      payload: {},
    };
  }
};

export const convertBase64ToString = (base64: string): string => {
  const buffer = Buffer.from(base64, 'base64');
  return buffer.toString('ascii');
};

export const convertStringToBase64 = (text: string): string => {
  const buffer = Buffer.from(text);
  return buffer.toString('base64');
};

export const stringToBoolean = (value: string | undefined) =>
  String(value).toLowerCase() === 'true';
