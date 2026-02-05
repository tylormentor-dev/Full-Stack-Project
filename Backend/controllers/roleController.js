import { db } from '../models/db.js';


// to get all roles in the HR app//

export const getRoles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM roles');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching roles', error: err.message });
  }
};


// Add a new role in the HR app//

export const addRole = async (req, res) => {
  const { title } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM roles WHERE title = ?', [title]);
    if (existing.length > 0) return res.status(400).json({ message: 'Role already exists' });

    await db.query('INSERT INTO roles (title) VALUES (?)', [title]);
    res.status(201).json({ message: 'Role added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding role', error: err.message });
  }
};


// to updayte a role in the HR app//

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM roles WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Role not found' });

    await db.query('UPDATE roles SET title = ? WHERE id = ?', [title, id]);
    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating role', error: err.message });
  }
};


// Delete a role//

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query('SELECT * FROM roles WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Role not found' });

    await db.query('DELETE FROM roles WHERE id = ?', [id]);
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting role', error: err.message });
  }
};
