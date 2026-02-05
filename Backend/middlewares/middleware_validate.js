export default function validateEmployee(req, res, next) {
  const { name, email, department_id, role_id, date_of_birth, hire_date } = req.body;
  if (!name || !email || !department_id || !role_id || !date_of_birth || !hire_date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
}

 