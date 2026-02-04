
ERD Description

DEPARTMENTS
-id (PK)
-name (UNIQUE)

ROLES
-id (PK)
-title (UNIQUE)

EMPLOYEES
-id (PK)
=department_id (FK → departments.id)
-role_id (FK → roles.id)

TIME_OFF_REQUEST
-request_id (PK)
-employee_id (FK → employees.id)

RELATIONSHIP 

departments 1 ──── * employees

roles 1 ──── * employees

employees 1 ──── * time_off_requests



GROUP 2 ERD Overview

The MySQL database consists of four main tables: departments, roles, employees, and time_off_requests.

Each employee does belong to one department and one role, creating a relationship from departments and roles to the employees.

Employees can submit multiple time-off requests, resulting in a relationship between employees and time_off_requests.

Primary keys does uniquely identify each record, while the foreign keys has proper data relationship consistency between tables.


Unique constraints has been added to prevent duplicate department names, role titles, and employee email address