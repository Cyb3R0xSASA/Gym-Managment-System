# Gym Management System (Backend)

A scalable SaaS backend for managing gyms, employees, trainers, and clients, built with Node.js, Express, and MongoDB.

---

## Configuration Files

### 1. config/constants.js
- **Purpose:** Centralizes all environment variables, grouped by service (SERVER, DATABASE, JWT, STRIPE, EMAIL, CLOUDINARY, REDIS, OTHER).
- **Usage:** Import the relevant group (e.g., `import { DATABASE } from './config/constants.js'`) in your config and service files.
- **Benefit:** Makes it easy to manage and update environment variables in one place.

---

### 2. config/db.conf.js
- **Purpose:** Handles MongoDB connection using Mongoose.
- **Features:** 
  - Uses async/await for connection.
  - Logs success or error using Winston logger.
  - Exits process on connection failure.
- **Usage:** Import and call `connectDB()` in your main server file.

---

### 3. config/cloudinary.conf.js
- **Purpose:** Configures and exports a Cloudinary instance for file uploads.
- **Features:** 
  - Uses environment variables for credentials.
  - Logs successful configuration.
- **Usage:** Import the configured Cloudinary instance wherever you need to upload or manage images.

---

### 4. config/redis.conf.js
- **Purpose:** Sets up a Redis client using ioredis.
- **Features:** 
  - Uses environment variable for Redis URL.
  - Logs connection and error events.
- **Usage:** Import the `redis` client for caching, sessions, or pub/sub.

---

### 5. config/stripe.conf.js
- **Purpose:** Initializes and exports a Stripe instance for payment processing.
- **Features:** 
  - Uses environment variable for Stripe secret key.
  - Logs successful configuration.
- **Usage:** Import the Stripe instance to handle payments, subscriptions, and webhooks.

---

### 6. config/logger.conf.js
- **Purpose:** Sets up Winston logger for application logging.
- **Features:** 
  - Logs everything to the console in development.
  - Logs info and errors to files in production.
  - Log level and transports are environment-aware.
- **Usage:** Import `logger` and use `logger.info`, `logger.error`, etc., throughout your app.

---