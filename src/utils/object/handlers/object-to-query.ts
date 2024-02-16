export const objectToQueryParams = (params: {}) =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
