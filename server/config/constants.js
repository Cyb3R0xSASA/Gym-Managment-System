// SERVER
export const SERVER = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

// DATABASE
export const DATABASE = {
  MONGODB_URI: process.env.MONGODB_URI,
};

// JWT
export const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

// STRIPE
export const STRIPE = {
  SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
};

// EMAIL
export const EMAIL = {
  HOST: process.env.EMAIL_HOST,
  PORT: process.env.EMAIL_PORT,
  USER: process.env.EMAIL_USER,
  PASS: process.env.EMAIL_PASS,
  FROM: process.env.EMAIL_FROM,
};

// CLOUDINARY
export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

// REDIS
export const REDIS = {
  URL: process.env.REDIS_URL,
};

// OTHER
export const OTHER = {
  FRONTEND_URL: process.env.FRONTEND_URL,
}; 