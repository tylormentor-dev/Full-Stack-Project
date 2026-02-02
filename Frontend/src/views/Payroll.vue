<template>
  <div class="payroll-container">
    <h1>Payroll Calculator</h1>

    <form @submit.prevent="generatePayslip">

      <label>Employee Name</label>
      <input v-model="employee.name" required />

      <label>Hours Worked</label>
      <input type="number" v-model="employee.hoursWorked" required />

      <label>Hourly Rate</label>
      <input type="number" v-model="employee.hourlyRate" required />

      <label>Overtime Hours</label>
      <input type="number" v-model="employee.overtimeHours" />

      <label>Overtime Rate</label>
      <input type="number" v-model="employee.overtimeRate" />

      <button type="submit">Generate Payslip</button>
    </form>

    <div class="results" v-if="results">
      <h2>Payroll Summary</h2>
      <p>Gross Pay: R {{ results.grossPay }}</p>
      <p>Overtime Pay: R {{ results.overtimePay }}</p>
      
      <p><strong>Net Pay: R {{ results.netPay }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const employee = reactive({
  name: "",
  hoursWorked: 0,
  hourlyRate: 0,
  overtimeHours: 0,
  overtimeRate: 0
});

const results = ref(null);

function calculatePayroll() {
  const grossPay = employee.hoursWorked * employee.hourlyRate;
  const overtimePay = employee.overtimeHours * employee.overtimeRate;

  const pension = grossPay * 0.01;  // 1% deduction

  const netPay = grossPay + overtimePay - pension;

  results.value = {
    grossPay,
    overtimePay,
    pension,
    netPay,
  };
}

function generatePayslip() {
  calculatePayroll();

  router.push({
    name: "payslip",
    query: {
      name: employee.name,
      grossPay: results.value.grossPay,
      overtimePay: results.value.overtimePay,
      pension: results.value.pension,
      netPay: results.value.netPay,
    },
  });
}
</script>


<style>
.payroll-container {
  max-width: 600px;
  margin: 40px auto;
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #1E90FF;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  font-weight: 600;
  color: #3A3A3A;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  background: #F2F4F7;
  font-size: 15px;
}

button {
  background: #58AFFF;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: 0.2s;
}

button:hover {
  background: #1E90FF;
}

.results {
  margin-top: 30px;
  background: #F2F4F7;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.results p strong {
  font-size: 20px;
}

</style>
