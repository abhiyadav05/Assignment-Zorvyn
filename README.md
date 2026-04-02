# Finance Dashboard Backend

## Overview

This project is a backend system for a finance dashboard application. It provides APIs for managing financial records, user roles, and generating analytics data for dashboards.

The system is designed with clean architecture, role-based access control (RBAC), and aggregation-based analytics, making it scalable and maintainable.

---

## Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose)
* Authentication: JWT (JSON Web Tokens)
* Validation: express-validator
* Security: bcrypt, rate limiting
* Tools: Postman, Git, VS Code

---

## Features

### Authentication and Authorization

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based access control (Viewer, Analyst, Admin)

---

### Financial Records Management

* Create, read, update, delete (CRUD) records
* Fields:

  * Amount
  * Type (income/expense)
  * Category
  * Date
  * Notes
* Filtering by date, category, and type
* Pagination support
* Soft delete functionality

---

### Dashboard APIs

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Monthly trends
* Recent transactions

---

### Access Control

* Viewer: Read-only access (dashboard and records)
* Analyst: Read and analytics access
* Admin: Full access (CRUD and user management)

---

### Validation and Error Handling

* Input validation using express-validator
* Centralized error handling middleware
* Proper HTTP status codes
* Consistent API response structure

---

## Project Structure

```
src/
│── config/
│── controllers/
│── middlewares/
│── models/
│── routes/
│── services/
│── validators/
│── app.js
│── server.js
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <https://github.com/abhiyadav05/Assignment-Zorvyn.git>
cd Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Users

* POST /api/users/create-admin (Admin only)

### Records

* POST /api/records/create (Admin)
* PATCH /api/records/update/:id (Admin)
* DELETE /api/records/delete/:id (Admin)
* GET /api/records/getall(Viewer)
* GET /api/records/getbyid/:id(Viewer)


### Dashboard

* GET /api/dashboard/summary
* GET /api/dashboard/category-wise
* GET /api/dashboard/trends
* GET /api/dashboard/recent

---

## Authentication

All protected routes require:

Authorization: Bearer <JWT_TOKEN>

---

## Testing

Use Postman to test APIs:

1. Register or login a user
2. Copy the JWT token
3. Add token in request headers
4. Test protected APIs

---

## Assumptions

* First admin user is created manually by updating role in the database
* Soft delete is used instead of permanent deletion
* Each user can only access their own records
* Dashboard data is user-specific

---

## Future Improvements

* Swagger API documentation
* Redis caching for dashboard APIs
* Docker containerization
* Deployment on AWS (EC2 or ECS)
* Role-based analytics filtering
* Unit and integration testing
* We can create AI-Agent for analytics

---

## Author

Abhishek Yadav
B.Tech CSE (AI), IET Lucknow

---

## Conclusion

This project demonstrates backend architecture design, role-based access control, data aggregation for analytics, and clean coding practices.
