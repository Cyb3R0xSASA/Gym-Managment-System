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
## Model Files

### 1. models/plan.models.js
- **Purpose:** Defines the subscription plans available in the system (Free, Basic, Premium, Advanced).
- **Fields:**
  - `name`: Object with language codes (e.g., { ar, en }) for plan name.
  - `description`: Object with language codes for plan description.
  - `monthlyPrice`, `semiAnnualPrice`, `annualPrice`: Pricing for each billing cycle (with minimum value 0).
  - `semiAnnualDiscount`, `annualDiscount`: Discount rates for semi-annual and annual billing (e.g., 0.10 for 10%).
  - `durationDays`: Number of days for the plan's billing cycle (default 30, set to 7 for Free plan).
  - `features`: Limits for each plan (branches, employees per branch, trainers per branch, clients per branch; all required and min 1).
  - Timestamps for creation and updates.
- **Usage:**
  - Plans are seeded once and referenced by gyms/subscriptions.
  - The frontend fetches available plans for users to select during signup or upgrade.
  - Plan limits and pricing are enforced in backend logic.

### 2. models/branch.models.js
- **Purpose:** Represents a physical branch of a gym.
- **Fields:**
  - `name`: Name of the branch (required).
  - `address`: Address of the branch (required).
  - `gym`: Reference to the parent Gym (required).
  - Timestamps for creation and updates.
- **Usage:**
  - Branches are created and linked to a gym after the gym is created.
  - The Gym model stores an array of branch references.
  - Used to organize users, trainers, and clients by location.

### 3. models/gym.models.js
- **Purpose:** Represents a gym entity in the system, including its details, plan, branches, contact info, and owner.
- **Fields:**
  - `name`: Object with language codes (e.g., { ar, en }) for the gym's name.
  - `description`: Object with language codes for the gym's description.
  - `photo`: String for the gym's photo or logo (URL or Cloudinary ID).
  - `plan`: Reference to the Plan model (required).
  - `branches`: Array of references to Branch documents (added after gym creation).
  - `contact`: Object with required `phone` and `email` fields.
  - `socialLinks`: Array of objects, each with a `type` (social platform) and a required `url`.
  - `owner`: Reference to the User model for the gym's owner/admin (required).
  - `status`: String enum for gym status (`active`, `trial`, `suspended`), default is `trial`.
  - `isActive`: Boolean flag for quick status checks, default is `false`.
  - Timestamps for creation and updates.
- **Usage:**
  - Gyms are created with core details and can have branches added later.
  - The gym references its plan, owner, and branches for organization and access control.
  - Used as the main entity for managing employees, trainers, clients, and subscriptions.

---