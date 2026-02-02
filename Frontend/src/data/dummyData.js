// Dummy data for HR System
// This file contains sample data for employees, time-off requests, and attendance

// Employee data structure
export const employees = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@moderntech.com',
    department: 'Software Development',
    position: 'Senior Developer',
    dateOfBirth: '1985-03-15',
    hireDate: '2015-06-01'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@moderntech.com',
    department: 'Quality Assurance',
    position: 'QA Engineer',
    dateOfBirth: '1990-07-22',
    hireDate: '2018-03-15'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@moderntech.com',
    department: 'Customer Support',
    position: 'Support Specialist',
    dateOfBirth: '1988-11-08',
    hireDate: '2016-09-10'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@moderntech.com',
    department: 'Software Development',
    position: 'Junior Developer',
    dateOfBirth: '1995-05-30',
    hireDate: '2020-01-20'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@moderntech.com',
    department: 'Sales',
    position: 'Sales Manager',
    dateOfBirth: '1987-09-12',
    hireDate: '2017-04-05'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@moderntech.com',
    department: 'Human Resources',
    position: 'HR Manager',
    dateOfBirth: '1986-12-25',
    hireDate: '2014-08-15'
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.taylor@moderntech.com',
    department: 'Marketing',
    position: 'Marketing Coordinator',
    dateOfBirth: '1992-02-14',
    hireDate: '2019-07-01'
  },
  {
    id: 8,
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@moderntech.com',
    department: 'Software Development',
    position: 'Developer',
    dateOfBirth: '1991-08-03',
    hireDate: '2018-11-12'
  }
]

// Time-off requests data structure
export const timeOffRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    type: 'vacation',
    status: 'pending',
    reason: 'Family vacation'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    startDate: '2024-12-18',
    endDate: '2024-12-18',
    type: 'sick',
    status: 'approved',
    reason: 'Medical appointment'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Brown',
    startDate: '2024-12-25',
    endDate: '2024-12-27',
    type: 'vacation',
    status: 'approved',
    reason: 'Holiday break'
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    startDate: '2024-12-19',
    endDate: '2024-12-19',
    type: 'personal',
    status: 'denied',
    reason: 'Personal matters'
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: 'David Wilson',
    startDate: '2024-12-23',
    endDate: '2024-12-24',
    type: 'vacation',
    status: 'pending',
    reason: 'Christmas holiday'
  }
]

// Helper function to get employee by ID
export function getEmployeeById(id) {
  return employees.find(emp => emp.id === id)
}

// Helper function to get employee name by ID
export function getEmployeeNameById(id) {
  const employee = getEmployeeById(id)
  return employee ? employee.name : 'Unknown'
}
