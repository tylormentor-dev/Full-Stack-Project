import { db } from '../models/db.js';

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.id, e.name, e.email, d.name AS department, r.title AS role,
              e.department_id, e.role_id, e.date_of_birth, e.hire_date
       FROM employees e
       JOIN departments d ON e.department_id = d.id
       JOIN roles r ON e.role_id = r.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
};

// Add employee
export const addEmployee = async (req, res) => {
  const { name, email, department_id, role_id, date_of_birth, hire_date } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM employees WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const [result] = await db.query(
      'INSERT INTO employees (name, email, department_id, role_id, date_of_birth, hire_date) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, department_id, role_id, date_of_birth, hire_date]
    );

    res.status(201).json({
      message: 'Employee added successfully',
      employee: { id: result.insertId, name, email, department_id, role_id, date_of_birth, hire_date }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding employee', error: err.message });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, department_id, role_id, date_of_birth, hire_date } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Employee not found' });

    await db.query(
      'UPDATE employees SET name=?, email=?, department_id=?, role_id=?, date_of_birth=?, hire_date=? WHERE id=?',
      [name, email, department_id, role_id, date_of_birth, hire_date, id]
    );

    res.json({
      message: 'Employee updated successfully',
      employee: { id, name, email, department_id, role_id, date_of_birth, hire_date }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee', error: err.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Employee not found' });

    await db.query('DELETE FROM employees WHERE id = ?', [id]);
    res.json({ message: 'Employee deleted successfully', id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
};
