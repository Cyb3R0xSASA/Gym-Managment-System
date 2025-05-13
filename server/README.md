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

## Models

### models/user.model.js
- **Purpose:** Represents all users in the system, including admins, employees, trainers, and clients.
- **Fields:**
  - `firstName`, `lastName`: User's name (required, validated).
  - `email`: Unique, required, and validated email address.
  - `password`: Hashed password, not selected by default for security.
  - `role`: User's role (admin, employee, trainer, client).
  - `gym`: Reference to the Gym (optional for admin at registration).
  - `branch`: Reference to the Branch (optional for admin at registration).
  - `photo`: Optional profile photo.
  - `gender`: Enum for gender.
  - `details`: Subdocument for role-specific fields (phone, address, birthDate, height, weight, goal, etc.).
  - `status`: Enum for user status (`active`, `inactive`), default is `inactive`.
  - `isActive`: Boolean for quick status checks.
  - Timestamps for creation and updates.
- **Security:**
  - Password is hashed and never returned in API responses.
  - Email is unique and validated.
- **Usage:** Used for authentication, role-based access, and storing user-specific data.

### models/gym.models.js
- **Purpose:** Represents a gym entity, including its details, plan, branches, contact info, and owner.
- **Fields:**
  - `name`: Object with language codes (e.g., { ar, en }) for the gym's name.
  - `description`: Object with language codes for the gym's description.
  - `photo`: String for the gym's photo or logo.
  - `plan`: Reference to the Plan model (required).
  - `branches`: Array of references to Branch documents (added after gym creation).
  - `contact`: Object with required `phone` and `email` fields.
  - `socialLinks`: Array of objects, each with a `type` (social platform) and a required `url`.
  - `owner`: Reference to the User model for the gym's owner/admin (required).
  - `status`: String enum for gym status (`active`, `trial`, `suspended`), default is `trial`.
  - `isActive`: Boolean flag for quick status checks, default is `false`.
  - Timestamps for creation and updates.
- **Usage:** Used as the main entity for managing employees, trainers, clients, and subscriptions.

### models/plan.models.js
- **Purpose:** Defines the subscription plans available in the system (Free, Basic, Premium, Advanced).
- **Fields:**
  - `name`: Object with language codes (e.g., { ar, en }) for plan name.
  - `description`: Object with language codes for plan description.
  - `monthlyPrice`, `semiAnnualPrice`, `annualPrice`: Pricing for each billing cycle.
  - `semiAnnualDiscount`, `annualDiscount`: Discount rates for semi-annual and annual billing.
  - `durationDays`: Number of days for the plan's billing cycle (default 30, set to 7 for Free plan).
  - `features`: Limits for each plan (branches, employees per branch, trainers per branch, clients per branch).
  - Timestamps for creation and updates.
- **Usage:** Plans are seeded once and referenced by gyms/subscriptions. The frontend fetches available plans for users to select during signup or upgrade.

### models/branch.models.js
- **Purpose:** Represents a physical branch of a gym.
- **Fields:**
  - `name`: Name of the branch (required).
  - `address`: Address of the branch (required).
  - `gym`: Reference to the parent Gym (required).
  - Timestamps for creation and updates.
- **Usage:** Branches are created and linked to a gym after the gym is created. Used to organize users, trainers, and clients by location.

### models/services.model.js
- **Purpose:** Stores user-generated content such as comments and contact messages for the gym management system.

#### Comment Model
- **Fields:**
  - `content`: The text of the comment (required, 1–2500 characters).
  - `user`: Reference to the User who made the comment (required).
  - Timestamps for creation and updates.
- **Usage:**
  - Used to store comments made by users, such as feedback, reviews, or internal notes.
  - Each comment is linked to a user for traceability.

#### Message Model
- **Fields:**
  - `name`: Name of the person sending the message (required, 1–250 characters).
  - `email`: Email address of the sender (validated format, optional).
  - `phone`: Phone number of the sender (required).
  - `message`: The content of the message (required, 1–2500 characters).
  - Timestamps for creation and updates.
- **Usage:**
  - Used for contact forms, support requests, or inquiries sent to the gym or system admin.
  - Stores sender information and message content for follow-up.

---

## API Endpoints

### Plans Endpoints

- **GET `/api/v1/plans`**  
  Retrieve a list of all available subscription plans.  
  **Access:** Public

- **POST `/api/v1/plans`**  
  Create a new subscription plan.  
  **Access:** Protected (trainix admin-only)  
  **Validation:** Uses `validatePlan` middleware to ensure request body is valid.

- **PUT `/api/v1/plans/:id`**  
  Update an existing plan by its ID.  
  **Access:** Protected (trainix admin-only)  
  **Validation:** Uses `validatePlan` and `checkId` middleware.

- **DELETE `/api/v1/plans/:id`**  
  Delete a plan by its ID.  
  **Access:** Protected (trainix admin-only)  
  **Validation:** Uses `checkId` middleware.

**Notes:**
- All endpoints use controller methods from `controllers/v1/plans.controller.js`.
- Validation and ID checking are handled by dedicated middleware.
- Only admins should be allowed to create, update, or delete plans (enforce this in your controllers or middleware).

---
