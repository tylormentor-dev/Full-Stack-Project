<template>
  <div class="hr-container">
    <h1>Payroll Overview</h1>

    
    <div class="calculator-button">
      <router-link to="/payroll">
        <button class="btn btn-primary">Go to Payroll Calculator</button>
      </router-link>
    </div>

    
    <table class="payroll-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Hours Worked</th>
          <th>Leave Deductions</th>
          <th>Final Salary (R)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in payrollData" :key="item.employeeId">
          <td>{{ item.employeeId }}</td>
          <td>{{ item.hoursWorked }}</td>
          <td>{{ item.leaveDeductions }}</td>
          <td>R {{ item.finalSalary.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    
    <div class="payslip-button">
      <router-link to="/payslip">
        <button class="btn btn-success">Generate Payslip</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const payrollData = ref([
  { employeeId: 1, hoursWorked: 160, leaveDeductions: 8, finalSalary: 69500 },
  { employeeId: 2, hoursWorked: 150, leaveDeductions: 10, finalSalary: 79000 },
  { employeeId: 3, hoursWorked: 170, leaveDeductions: 4, finalSalary: 54800 },
  { employeeId: 4, hoursWorked: 165, leaveDeductions: 6, finalSalary: 59700 },
  { employeeId: 5, hoursWorked: 158, leaveDeductions: 5, finalSalary: 57850 },
  { employeeId: 6, hoursWorked: 168, leaveDeductions: 2, finalSalary: 64800 },
  { employeeId: 7, hoursWorked: 175, leaveDeductions: 3, finalSalary: 71800 },
  { employeeId: 8, hoursWorked: 160, leaveDeductions: 0, finalSalary: 56000 },
  { employeeId: 9, hoursWorked: 155, leaveDeductions: 5, finalSalary: 61500 },
  { employeeId: 10, hoursWorked: 162, leaveDeductions: 4, finalSalary: 57750 },
])
</script>

<style scoped>
.hr-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

h1 {
  text-align: center;
  color: #1E90FF;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}

/* Button styling */
.calculator-button {
  text-align: right;
  margin-bottom: 20px;
}

.calculator-button .btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  transition: 0.2s;
}

.calculator-button .btn:hover {
  background-color: #0056b3;
}

.payroll-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.payroll-table th {
  background: #58AFFF;
  color: white;
  padding: 12px;
  text-align: left;
  border-radius: 6px 6px 0 0;
}

.payroll-table td {
  padding: 12px;
  border-bottom: 1px solid #dcdcdc;
}

.payroll-table tr:hover {
  background: #F2F4F7;
}

.payslip-button {
  text-align: right;
}

.payslip-button .btn-success {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.2s;
}

.payslip-button .btn-success:hover {
  background-color: #218838;
}
</style>
