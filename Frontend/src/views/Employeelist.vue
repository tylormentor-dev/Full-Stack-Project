<template>
  <div>
    <h1>Employees</h1>

    <!-- Search -->
    <div class="search-container">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or department..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">Search</button>
      <button @click="clearSearch">Clear</button>
    </div>

    <!-- Add Employee -->
    <form @submit.prevent="createEmployee" class="add-form">
      <input v-model="newEmp.name" placeholder="Name" required/>
      <input v-model="newEmp.email" placeholder="Email" required/>

      <select v-model="newEmp.department_id" required>
        <option value="" disabled>Select Department</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }}
        </option>
      </select>

      <select v-model="newEmp.role_id" required>
        <option value="" disabled>Select Role</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.title }}
        </option>
      </select>

      <button type="submit">Add Employee</button>
    </form>

    <!-- Employee List Table -->
    <table v-if="filteredEmployees.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in filteredEmployees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>
            <input v-if="editingId === emp.id" v-model="editEmp.name" />
            <span v-else>{{ emp.name }}</span>
          </td>
          <td>
            <input v-if="editingId === emp.id" v-model="editEmp.email" />
            <span v-else>{{ emp.email }}</span>
          </td>
          <td>
            <select v-if="editingId === emp.id" v-model="editEmp.department_id">
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
            <span v-else>{{ emp.department }}</span>
          </td>
          <td>
            <select v-if="editingId === emp.id" v-model="editEmp.role_id">
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.title }}
              </option>
            </select>
            <span v-else>{{ emp.role }}</span>
          </td>
          <td>
            <button v-if="editingId === emp.id" @click="saveEmployee(emp.id)">Save</button>
            <button v-else @click="startEdit(emp)">Edit</button>
            <button @click="removeEmployee(emp.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No employees found.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHRData } from '../composables/useHRData.js'

const { employeesList, fetchEmployees, addEmployee, updateEmployee, deleteEmployee } = useHRData()

// Additional data: Departments and Roles
const departments = ref([])
const roles = ref([])

// Fetch departments & roles from backend
const fetchDepartments = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/departments')
    departments.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch departments', err)
  }
}

const fetchRoles = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/roles')
    roles.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch roles', err)
  }
}

// Search
const searchQuery = ref('')
const searched = ref(false)
const handleSearch = () => searched.value = true
const clearSearch = () => {
  searchQuery.value = ''
  searched.value = false
}

const filteredEmployees = computed(() => {
  if (!searched.value || !searchQuery.value.trim()) return employeesList.value
  const query = searchQuery.value.toLowerCase()
  return employeesList.value.filter(emp =>
    emp.name.toLowerCase().includes(query) ||
    emp.department.toLowerCase().includes(query)
  )
})

// Add Employee
const newEmp = ref({ name: '', email: '', department_id: '', role_id: '' })
const createEmployee = async () => {
  await addEmployee(newEmp.value)
  newEmp.value = { name: '', email: '', department_id: '', role_id: '' }
}

// Edit Employee
const editingId = ref(null)
const editEmp = ref({})

const startEdit = (emp) => {
  editingId.value = emp.id
  editEmp.value = { ...emp }
}

const saveEmployee = async (id) => {
  await updateEmployee(id, editEmp.value)
  editingId.value = null
}

// Delete Employee
const removeEmployee = async (id) => {
  await deleteEmployee(id)
}

// Fetch everything on mount
onMounted(() => {
  fetchEmployees()
  fetchDepartments()
  fetchRoles()
})
</script>

<style scoped>
.search-container, .add-form {
  margin-bottom: 1rem;
}

.add-form input, .add-form select {
  margin-right: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background: #f4f4f4;
}
</style>
