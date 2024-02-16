import { ValidationError } from 'yup';

import { convertCamelCaseKeysToSnakeCase } from '../object';

export interface PrettyYupError {
  message: string;
  param: string;
}

export function formatYupError(error: ValidationError): PrettyYupError[] {
  return error.inner.map((item) => ({
    message: item.message,
    param: convertCamelCaseKeysToSnakeCase(item.path),
  }));
}
