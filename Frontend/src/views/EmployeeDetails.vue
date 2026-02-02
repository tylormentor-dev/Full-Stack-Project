<template>
  <div>
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search by employee name or department..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">Search</button>
      <button @click="clearSearch" class="clear-btn">Clear</button>
    </div>

    <div class="table-container">
      <table v-if="filteredEmployees.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in filteredEmployees" :key="emp.employeeId">
            <td>{{ emp.employeeId }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.department }}</td>
            <td>R{{ emp.salary }}</td>
            <td>{{ emp.contact }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-results">
        <p>No employees found matching your search.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"                
import employeesData from "../data/employees.js"

const searchQuery = ref("")
const searched = ref(false)

const filteredEmployees = computed(() => {
  if (!searched.value) {
    return employeesData
  }

  if (!searchQuery.value.trim()) {
    return employeesData
  }

  const query = searchQuery.value.toLowerCase()
  return employeesData.filter(e => 
    e.name.toLowerCase().includes(query) || 
    e.department.toLowerCase().includes(query)
  )
})

function handleSearch() {
  searched.value = true
}

function clearSearch() {
  searchQuery.value = ""
  searched.value = false
}
</script>

<style scoped>
.search-container {
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
}

.search-container input {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  max-width: 400px;
}

.search-container button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.search-container button:hover {
  background-color: #356092;
}

.clear-btn {
  background-color: #666;
}

.clear-btn:hover {
  background-color: #666;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #d2ecff;
  color: black;
}

th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #0b4f71;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f5f5f5;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: #f5f4f4;
  font-size: 16px;
}
</style>