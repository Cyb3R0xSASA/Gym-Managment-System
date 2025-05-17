import dotenv from 'dotenv';
dotenv.config();

// SERVER
const SERVER = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  NODE_ENV: process.env.NODE_ENV,
};

// DATABASE
const DATABASE = {
  MONGODB_URI: process.env.DATABASE_URI,
};

// JWT
const JWT = {
  REFRESH: process.env.JWT_REFRESH_KEY,
  SECRET: process.env.JWT_SECRET_KEY,
  ROLE: process.env.JWT_ROLE_KEY,
};

// STRIPE
const STRIPE = {
  SECRET: process.env.STRIPE_SECRET_KEY,
  PUBLIC: process.env.STRIPE_PUBLIC_KEY,
  WEBHOOK: process.env.STRIPE_WEBHOOK_SECRET,
};

// EMAIL
const SMTP = {
  HOST: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
};

// CLOUDINARY
const CLOUDINARY = {
  NAME: process.env.CLOUDINARY_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

// REDIS
const REDIS = {
  URL: process.env.REDIS_URL,
};

// OTHER
const OTHER = {
  FRONTEND_URL: process.env.CLIENT_SERVER,
  CORS_ORIGIN: process.env.NODE_ENV === 'development' ? `${SERVER.HOST}:${SERVER.PORT}` : process.env.CLIENT_SERVER,
};

const HTTP_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  BAD_REQUEST: 'bad request',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not found',
};

const OTP_CONF = {
  MAX_OTP_PER_DAY: 5,
  OTP_TTL_SECONDS: 300,
  OTP_LIMIT_TTL: 60 * 60,
  COOLDOWN_SECONDS: 60,
};

export { 
  SERVER,
  DATABASE,
  JWT,
  STRIPE,
  SMTP,
  CLOUDINARY,
  REDIS,
  OTHER,
  HTTP_STATUS,
  OTP_CONF
};