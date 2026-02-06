import { db } from '../models/db.js';

export const getTimeOffRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT t.request_id, e.name AS employee, t.start_date, t.end_date, t.request_type, t.status, t.reason
       FROM time_off_requests t
       JOIN employees e ON t.employee_id = e.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching time-off requests', error: err.message });
  }
};

export const addTimeOffRequest = async (req, res) => {
  const { employee_id, start_date, end_date, request_type, status, reason } = req.body;
  try {
    await db.query(
      'INSERT INTO time_off_requests (employee_id, start_date, end_date, request_type, status, reason) VALUES (?, ?, ?, ?, ?, ?)',
      [employee_id, start_date, end_date, request_type, status, reason]
    );
    res.status(201).json({ message: 'Time-off request added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding time-off request', error: err.message });
  }
};

export const updateTimeOffRequest = async (req, res) => {
  const { request_id } = req.params;
  const { start_date, end_date, request_type, status, reason } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM time_off_requests WHERE request_id = ?', [request_id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Request not found' });

    await db.query(
      'UPDATE time_off_requests SET start_date=?, end_date=?, request_type=?, status=?, reason=? WHERE request_id=?',
      [start_date, end_date, request_type, status, reason, request_id]
    );
    res.json({ message: 'Time-off request updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating time-off request', error: err.message });
  }
};

export const deleteTimeOffRequest = async (req, res) => {
  const { request_id } = req.params;
  try {
    const [existing] = await db.query('SELECT * FROM time_off_requests WHERE request_id = ?', [request_id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Request not found' });

    await db.query('DELETE FROM time_off_requests WHERE request_id = ?', [request_id]);
    res.json({ message: 'Time-off request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting time-off request', error: err.message });
  }
};
