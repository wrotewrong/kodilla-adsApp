export const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';

export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? '/uploads/'
    : 'http://localhost:8000/uploads/';

export const validationConfig = {
  LOGIN_MIN_LENGTH: 5,
  LOGIN_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 5,
  PASSWORD_MAX_LENGTH: 20,
  PHONE_MIN_LENGTH: 8,
  PHONE_MAX_LENGTH: 10,
};
