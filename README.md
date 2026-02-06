# Employee Management System – Backend & Database

**Group Number:** `2`

## Team Members
- **Member 1 (Tylor):** Database & Data Integrity (SQL Specialist)
- **Member 2 (MC):** Back-End Logic & API (Node.js Focus)
- **Member 3 (AMO):** Front-End Integration & Error Feedback

---

## Project Overview
This project is an **Employee Management System** that integrates a secure **MySQL database**, a **Node.js + Express backend**, and an existing front-end interface.

The system manages:
- Employees
- Departments
- Roles
- Time-off requests

The solution demonstrates proper **data architecture**, **server-side validation**, **secure data handling**, and **end-to-end integration**, meeting all technical and non-technical assessment requirements.

---

## Technologies Used
- Node.js (v18+ recommended)
- Express.js
- MySQL 8.0
- dotenv (environment variables)
- Git & GitHub
- HTML, CSS, JavaScript (existing front-end)

---

## Database Documentation (Member 1)

### Database Design
The database is normalized to **Third Normal Form (3NF)** and enforces strict referential integrity.

### Tables & Relationships

#### departments
- `id` (INT, PK, AUTO_INCREMENT)
- `name` (VARCHAR, UNIQUE, NOT NULL)

#### roles
- `id` (INT, PK, AUTO_INCREMENT)
- `title` (VARCHAR, UNIQUE, NOT NULL)

#### employees
- `id` (INT, PK, AUTO_INCREMENT)
- `name` (VARCHAR, NOT NULL)
- `email` (VARCHAR, UNIQUE, NOT NULL)
- `department_id` (FK → departments.id)
- `role_id` (FK → roles.id)
- `date_of_birth` (DATE, NOT NULL)
- `hire_date` (DATE, NOT NULL)

#### time_off_requests
- `request_id` (INT, PK, AUTO_INCREMENT)
- `employee_id` (FK → employees.id)
- `start_date` (DATE, NOT NULL)
- `end_date` (DATE, NOT NULL)
- `request_type` (ENUM: vacation, sick, personal)
- `status` (ENUM: pending, approved, denied)
- `reason` (VARCHAR, optional)

### Indexes (Performance Optimization)
- `idx_employee_department`
- `idx_employee_role`
- `idx_timeoff_employee`

### Data Integrity Measures
- Primary and foreign keys enforced
- UNIQUE constraints prevent duplicates
- ENUM values restrict invalid data
- Cascading and restrictive deletes protect relationships

**SQL File:** `database/database.sql`  
**ERD:** `database/ERDsql.md`

---

## Server & API Documentation (Member 2)

### Server Setup
```bash
npm install
npm install express
npm install cors
npm install axios
npm install nodemon



## Front-End Integration (Member 3)

The front-end has been fully integrated with the back-end API:

- Front-end forms connected to real API endpoints
- Simulated data replaced with database-driven data
- Server-side validation errors displayed to users
- Success and error feedback implemented
- Full end-to-end testing completed

---

## Setup Instructions

### Prerequisites

Please ensure the following are installed:

- Node.js (v18 or higher)
- MySQL 8.0
- Git
- VS Code (recommended)

---

### Steps

#### 1. Clone the repository
```bash
git clone https://github.com/{username}/project1.git

### Install Dependencies

```bash
npm install

### Set Up the Database

```sql
CREATE SCHEMA project1_db;
USE project1_db;
SOURCE database/database.sql;

DB_HOST=localhost
DB_NAME=project1_db
DB_USER=root
DB_PASSWORD=BlueSky@23

### Start the Server

```bash
npm run dev


## Requirements Checklist

| Requirement | Status |
|-------------|--------|
| SQL database schema design | ✅ Completed |
| Primary keys & foreign keys | ✅ Completed |
| Table relationships | ✅ Completed |
| Constraints (NOT NULL, UNIQUE, FOREIGN KEY) | ✅ Completed |
| Data integrity & referential integrity | ✅ Completed |
| Prevent duplicate entries | ✅ Completed |
| Query optimization (indexes) | ✅ Completed |
| Server-side validation & processing | ✅ Completed |
| Database connection & secure queries | ✅ Completed |
| API CRUD operations | ✅ Completed |
| Front-end integration | ✅ Completed |
| Error handling & feedback | ✅ Completed |
| Performance optimization | ✅ Completed |
| Documentation quality & ERD | ✅ Completed |
| Setup instructions for lecturers | ✅ Completed |

## Team Contributions Summary

### Member 1 – Database & Data Integrity
- Database schema design
- SQL scripts and constraints
- Data integrity enforcement and indexing
- ERD and database documentation

---

### Member 2 – Back-End Logic & API
- Node.js and Express server setup
- API routes and server-side validation
- Secure database queries and error handling

---

### Member 3 – Front-End Integration
- API integration with the front end
- Form submission handling
- Success and error message display
- End-to-end testing

