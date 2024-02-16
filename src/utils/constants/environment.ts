import 'dotenv/config';

export const SERVER = {
  PORT: process.env.PORT || 3000,
  BASE_URI: process.env.BASE_URI || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_ENV: process.env.APP_ENV || 'staging',
};

export const SCHEDULER = {
  ENABLED: process.env.SCHEDULER_ENABLED !== 'false',
};

export const LOGGER = {
  CONSOLE: { LEVEL: process.env.LOGGER_CONSOLE_LEVEL || 'info' },
};

export const ENCRYPTION = {
  KEY: process.env.ENCRYPTION_KEY || '',
  IV: process.env.ENCRYPTION_IV || '',
};

export const API = {
  BACKEND_APP: process.env.ANDANDO_NO_PROFETICO_URL || '',
};

export const DATABASE = {
  NAME: process.env.DATABASE_NAME || '',
  DIALECT: process.env.DATABASE_DIALECT || 'mysql',
  HOST: process.env.DATABASE_HOST || '',
  USERNAME: process.env.DATABASE_USERNAME || '',
  PASSWORD: process.env.DATABASE_PASSWORD || '',
  PORT: process.env.DATABASE_PORT || 3306,
};

export const AWS = {
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || '',
  CLOUD_FRONT: {
    BUCKET_NAME: process.env.CLOUD_BUCKET_NAME || '',
  },
  SQS: {
    WHATSAPP_QUEUE: process.env.SQS_QUEUE_WHATSAPP || '',
  },
};

export const ANDROID = {
  CHANNEL_ID: 'prophet-app-notification',
};

export const EXPO = {
  ACCESS_KEY: process.env.EXPO_ACCESS_KEY || '',
};

export const MAIL = {
  USER: process.env.EMAIL_USER,
  PASSWORD: process.env.EMAIL_PASSWORD,
  LINKS: {
    RESET_PASSWORD: process.env.EMAIL_RESET_PASSWORD_LINK || '',
  },
};
