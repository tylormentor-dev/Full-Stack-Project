<template>
 
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

    
      <div v-for="emp in employeesList" :key="emp.id" class="employee-card">
  <h3>{{ emp.name }}</h3>
  <p>{{ emp.department }}</p>
  <p>{{ emp.role }}</p>

  <button @click="editEmployee(emp)">Edit</button>
  <button @click="removeEmployee(emp.id)">Delete</button>
</div>

      
   <form @submit.prevent="createEmployee">
     <input v-model="newEmp.name" placeholder="Name" required/>
     <input v-model="newEmp.email" placeholder="Email" required/>
     <input v-model="newEmp.department_id" placeholder="Department ID" required/>
     <input v-model="newEmp.role_id" placeholder="Role ID" required/>
     <button type="submit">Add Employee</button>
   </form>   
</template>

<script setup>
import { ref } from "vue"
import { useHRData } from "../composables/useHRData.js"

const { employeesList, fetchEmployees, addEmployee, updateEmployee, deleteEmployee } = useHRData()

const newEmp = ref({
  name: '',
  email: '',
  department_id: '',
  role_id: ''
})

const createEmployee = async () => {
  await addEmployee(newEmp.value)
  // Clear form
  newEmp.value = { name: '', email: '', department_id: '', role_id: '' }
}

const editEmployee = async (emp) => {
  const updated = { ...emp, name: emp.name + " Updated" } // example change
  await updateEmployee(emp.id, updated)
}

const removeEmployee = async (id) => {
  await deleteEmployee(id)
}

</script>