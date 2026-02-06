import { db } from '../models/db.js';


// this is to get all departments//

export const getDepartments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments', error: err.message });
  }
};


// this is to add a new department

export const addDepartment = async (req, res) => {
  const { name } = req.body;
  try {

    // Ensure department name is unique//
    const [existing] = await db.query('SELECT * FROM departments WHERE name = ?', [name]);
    if (existing.length > 0) return res.status(400).json({ message: 'Department already exists' });

    await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Department added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding department', error: err.message });
  }
};


// to update a department in the HR app//

export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Department not found' });

    await db.query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: 'Department updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating department', error: err.message });
  }
};


// this is to delete a department in the HR app//

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Department not found' });

    await db.query('DELETE FROM departments WHERE id = ?', [id]);
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting department', error: err.message });
  }
};
