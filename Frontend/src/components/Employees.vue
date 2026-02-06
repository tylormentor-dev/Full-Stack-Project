<template>
  <div>
    <h1>Employees</h1>

    <!-- Loading/Error -->
    <p v-if="loading">Loading employees...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Search -->
    <div class="search-container" v-if="employeesList.length">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or department..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">Search</button>
      <button @click="clearSearch" class="clear-btn">Clear</button>
    </div>

    <!-- Employee Table -->
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

          <!-- Editable Name -->
          <td>
            <input v-if="editingId === emp.id" v-model="editEmp.name" />
            <span v-else>{{ emp.name }}</span>
          </td>

          <!-- Editable Email -->
          <td>
            <input v-if="editingId === emp.id" v-model="editEmp.email" />
            <span v-else>{{ emp.email }}</span>
          </td>

          <!-- Editable Department -->
          <td>
            <select v-if="editingId === emp.id" v-model="editEmp.department_id">
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
            <span v-else>{{ emp.department }}</span>
          </td>

          <!-- Editable Role -->
          <td>
            <select v-if="editingId === emp.id" v-model="editEmp.role_id">
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.title }}
              </option>
            </select>
            <span v-else>{{ emp.role }}</span>
          </td>

          <!-- Actions -->
          <td>
            <button v-if="editingId === emp.id" @click="saveEmployee(emp.id)">Save</button>
            <button v-else @click="startEdit(emp)">Edit</button>
            <button @click="removeEmployee(emp.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="!loading">No employees found.</p>

    <!-- Add Employee Form BELOW the list -->
    <h2>Add New Employee</h2>
    <form @submit.prevent="createEmployee" class="add-form">
      <input v-model="newEmp.name" placeholder="Name" required />
      <input v-model="newEmp.email" placeholder="Email" required />
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useHRData } from "../composables/useHRData.js";

const { employeesList, fetchEmployees, addEmployee, updateEmployee, deleteEmployee } = useHRData();

// Departments and Roles
const departments = ref([]);
const roles = ref([]);

// Loading/Error
const loading = ref(false);
const error = ref(null);

// Fetch Departments
const fetchDepartments = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/departments");
    departments.value = await res.json();
  } catch (err) {
    error.value = "Failed to load departments";
    console.error(err);
  }
};

// Fetch Roles
const fetchRoles = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/roles");
    roles.value = await res.json();
  } catch (err) {
    error.value = "Failed to load roles";
    console.error(err);
  }
};

// -------------------- SEARCH --------------------
const searchQuery = ref("");
const searched = ref(false);
const handleSearch = () => (searched.value = true);
const clearSearch = () => {
  searchQuery.value = "";
  searched.value = false;
};

const filteredEmployees = computed(() => {
  if (!searched.value || !searchQuery.value.trim()) return employeesList.value;
  const query = searchQuery.value.toLowerCase();
  return employeesList.value.filter(
    (emp) =>
      emp.name.toLowerCase().includes(query) ||
      (emp.department && emp.department.toLowerCase().includes(query))
  );
});

// -------------------- ADD --------------------
const newEmp = ref({ name: "", email: "", department_id: "", role_id: "" });
const createEmployee = async () => {
  const added = await addEmployee(newEmp.value);
  if (added) newEmp.value = { name: "", email: "", department_id: "", role_id: "" };
};

// -------------------- EDIT --------------------
const editingId = ref(null);
const editEmp = ref({});
const startEdit = (emp) => {
  editingId.value = emp.id;
  editEmp.value = { ...emp };
};
const saveEmployee = async (id) => {
  const success = await updateEmployee(id, editEmp.value);
  if (success) editingId.value = null;
};

// -------------------- DELETE --------------------
const removeEmployee = async (id) => {
  await deleteEmployee(id);
};

// -------------------- INITIAL FETCH --------------------
onMounted(async () => {
  loading.value = true;
  try {
    await fetchEmployees();
    await fetchDepartments();
    await fetchRoles();
  } catch (err) {
    error.value = "Failed to fetch data";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Search/Add form */
.search-container,
.add-form {
  margin-bottom: 1rem;
}

.add-form input,
.add-form select {
  margin-right: 0.5rem;
  padding: 5px;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background: #f4f4f4;
}

button {
  margin-right: 5px;
  padding: 4px 8px;
}

/* Error */
.error {
  color: red;
}
</style>
