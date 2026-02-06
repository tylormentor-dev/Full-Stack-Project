import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import employeeRoutes from './routes/employee_routes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import timeOffRoutes from './routes/timeOffRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/timeoff', timeOffRoutes);

// basic root route (VERY useful for testing)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// global error handler (must be LAST)
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});