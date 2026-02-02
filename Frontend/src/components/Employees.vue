
<template>
  <div>
    <h2>Employees</h2>

    <div class="employee-grid">
      <div v-for="emp in employees" :key="emp.employeeId" class="employee-card">
        <h3>{{ emp.name }}</h3>
        <p><strong>Position:</strong> {{ emp.position }}</p>
        <p><strong>Department:</strong> {{ emp.department }}</p>
        <p><strong>Salary:</strong> R{{ emp.salary }}</p>
        <p><strong>History:</strong> {{ emp.employmentHistory }}</p>
        <p><strong>Contact:</strong> {{ emp.contact }}</p>
      </div>
    </div>
  </div>
   <router-link to="/employees" class="nav-link"></router-link>
</template>

<script setup>
import employees from '../data/employees.js' 
</script>

<style scoped>
.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.employee-card {
  padding: 1rem;
  border-radius: 8px;
  background: #d2ecff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
</style>

