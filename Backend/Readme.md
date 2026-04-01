You are a senior backend engineer.

Your task is to build a complete backend system for a Finance Dashboard with clean architecture, proper separation of concerns, and production-level coding practices.

Tech Stack:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Redis (for caching, optional but preferred)

Project Requirements:

1. Project Structure (STRICT)
Create a scalable folder structure:

src/
  config/
  controllers/
  services/
  models/
  routes/
  middlewares/
  validators/
  utils/
  constants/
  app.js
  server.js

Follow clean architecture:
- Controllers → handle request/response
- Services → business logic
- Models → DB schema
- Middlewares → auth, role-based access, error handling
- Validators → request validation

--------------------------------------

2. User & Authentication System

Implement:
- User Registration
- User Login
- JWT-based authentication

User Schema:
- name
- email (unique)
- password (hashed using bcrypt)
- role (viewer, analyst, admin)
- isActive (boolean)

Features:
- Password hashing
- JWT token generation
- Middleware to protect routes

--------------------------------------

3. Role-Based Access Control (RBAC)

Implement middleware:

authorizeRoles(...roles)

Rules:
- Viewer → read-only
- Analyst → read + dashboard
- Admin → full access (CRUD + user management)

Return proper 403 errors if unauthorized.

--------------------------------------

4. Financial Records Module

Schema:
- userId (ref User)
- amount (number)
- type (income | expense)
- category (string)
- date (date)
- notes (string)
- isDeleted (boolean for soft delete)

APIs:
- POST   /api/records
- GET    /api/records (with filters)
- GET    /api/records/:id
- PATCH  /api/records/:id
- DELETE /api/records/:id (soft delete)

Filtering:
- by type
- by category
- by date range

Add pagination:
?page=1&limit=10

--------------------------------------

5. Dashboard APIs (IMPORTANT)

Create endpoints:

GET /api/dashboard/summary
- totalIncome
- totalExpense
- netBalance

GET /api/dashboard/category-wise
- grouped totals by category

GET /api/dashboard/trends
- monthly aggregation

GET /api/dashboard/recent
- last 5 transactions

Use MongoDB aggregation pipelines.

--------------------------------------

6. Validation

Use Joi or Zod:
- validate all incoming requests
- return meaningful error messages

--------------------------------------

7. Error Handling

Create global error handler middleware:
- consistent JSON responses
- proper HTTP status codes

--------------------------------------

8. Redis Caching (Optional but preferred)

- Cache dashboard responses
- Invalidate cache when new record is created/updated/deleted

--------------------------------------

9. Security & Best Practices

- Use dotenv for environment variables
- Use bcrypt for password hashing
- Use helmet middleware
- Use express-rate-limit

--------------------------------------

10. API Design Rules

- Use RESTful naming
- Proper status codes
- Clean JSON responses:
  {
    success: true,
    data: ...
  }

--------------------------------------

11. Additional Features

- Soft delete for records
- Logging (Morgan)
- Indexing in MongoDB

--------------------------------------

12. Deliverables

Generate:
- Full backend code
- All routes, controllers, services, models
- Middleware implementations
- Sample .env file
- README.md with:
  - Setup steps
  - API documentation
  - Role explanation

--------------------------------------

IMPORTANT INSTRUCTIONS:

- Do NOT put all logic in controllers
- Use service layer properly
- Keep code modular and readable
- Use async/await with proper error handling
- Add comments where necessary
- Write clean and professional code as if for production

Start by creating the folder structure, then implement each module step by step.