<template>
  <div class="attendance-container">
    <h2>Attendance</h2>

    <!-- DEBUG (you can remove later) -->
    <p class="debug">Employees loaded: {{ employeesList.length }}</p>

    <table v-if="employeesList.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="employee in employeesList" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.department }}</td>
          <td>
            <span
              :class="{
                present: getAttendanceStatus(employee.id) === 'Present',
                leave: getAttendanceStatus(employee.id) === 'On Leave'
              }"
            >
              {{ getAttendanceStatus(employee.id) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No employees found.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHRData } from '../composables/useHRData'
// Pull data + methods from composable
const {
  employeesList,
  fetchEmployees,
  hasApprovedTimeOff
} = useHRData()

// Fetch employees when page loads
onMounted(async () => {
  await fetchEmployees()
})

// Attendance logic
const getAttendanceStatus = (employeeId) => {
  const today = new Date().toISOString().split('T')[0]

  if (hasApprovedTimeOff(employeeId, today)) {
    return 'On Leave'
  }

  return 'Present'
}
</script>

<style scoped>
/* -------------------- General -------------------- */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  color: #333;
  line-height: 1.5;
}

/* -------------------- Headings -------------------- */
h1, h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* -------------------- Search/Add Forms -------------------- */
.search-container,
.add-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-container input,
.add-form input,
.add-form select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1 1 200px;
  transition: border-color 0.2s;
}

.search-container input:focus,
.add-form input:focus,
.add-form select:focus {
  outline: none;
  border-color: #3498db;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 7px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #2980b9;
}

.clear-btn {
  background-color: #e74c3c;
}

.clear-btn:hover {
  background-color: #c0392b;
}

/* -------------------- Table -------------------- */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

thead {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background 0.2s;
}

tbody tr:hover {
  background-color: #f1f9ff;
}

/* Editable inputs in table */
td input, td select {
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

/* Actions column */
td button {
  margin-right: 5px;
  padding: 5px 8px;
  font-size: 0.9rem;
}

/* -------------------- Attendance -------------------- */
.attendance-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.attendance-container table tbody tr td span.present {
  color: green;
  font-weight: bold;
}

.attendance-container table tbody tr td span.leave {
  color: orange;
  font-weight: bold;
}

.debug {
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
}

/* -------------------- Empty / Error -------------------- */
.error, p {
  margin: 10px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .search-container,
  .add-form {
    flex-direction: column;
    align-items: stretch;
  }

  th, td {
    padding: 10px;
    font-size: 0.9rem;
  }
}

</style>
