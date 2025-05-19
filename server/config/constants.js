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
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const OTP_CONF = {
  MAX_OTP_PER_DAY: 15,
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