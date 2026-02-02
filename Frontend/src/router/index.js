import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Payroll from '../views/Payroll.vue'
import Payslip from '../views/Payslip.vue'
import Timeoff from '../views/Timeoff.vue'
import Attendance from '../views/Attendance.vue'
import Employees from '../components/Employees.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import HRPayroll from '../views/HRPayroll.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
  
    {
      path: '/employees',
      name: 'employees',
      component: Employees,
    },

    {path : '/employee/:id',
     name : 'employee-details',
     component : EmployeeDetails,
    },
    
    {
      path: '/hr-payroll',
      name: 'hr-payroll',
      component: HRPayroll,
    },
    { 
      path: "/payslip", 
      name: "payslip", 
      component: Payslip,
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: Attendance,
    },
    {
      path: '/timeoff',
      name: 'timeoff',
      component: Timeoff,
    },
  ],
})


export default router

