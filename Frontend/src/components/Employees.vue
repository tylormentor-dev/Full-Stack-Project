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
        placeholder="Search by name, department or role..."
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
          <th>Position</th>
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
            <input v-if="editingId === emp.id" v-model="editEmp.department" />
            <span v-else>{{ emp.department }}</span>
          </td>

          <!-- Editable Role -->
          <td>
            <input v-if="editingId === emp.id" v-model="editEmp.role" />
            <span v-else>{{ emp.role }}</span>
          </td>

          <!-- Editable Position -->
          <td>
            <input v-if="editingId === emp.id" v-model="editEmp.position" />
            <span v-else>{{ emp.position }}</span>
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

    <!-- Add Employee Section -->
    <div class="add-employee">
      <h2>Add New Employee</h2>
      <form @submit.prevent="createEmployee">
        <div class="form-row">
          <label>Name</label>
          <input v-model="newEmp.name" type="text" required />
        </div>
        <div class="form-row">
          <label>Email</label>
          <input v-model="newEmp.email" type="email" required />
        </div>
        <div class="form-row">
          <label>Department</label>
          <input v-model="newEmp.department" type="text" required />
        </div>
        <div class="form-row">
          <label>Role</label>
          <input v-model="newEmp.role" type="text" required />
        </div>
        <div class="form-row">
          <label>Position</label>
          <input v-model="newEmp.position" type="text" required />
        </div>

        <button type="submit" class="btn btn-primary">Add Employee</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useHRData } from "../composables/useHRData.js";

const { employeesList, fetchEmployees, addEmployee, updateEmployee, deleteEmployee } = useHRData();

// Loading/Error
const loading = ref(false);
const error = ref(null);

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
      (emp.department && emp.department.toLowerCase().includes(query)) ||
      (emp.role && emp.role.toLowerCase().includes(query))
  );
});

// -------------------- ADD --------------------
const newEmp = ref({
  name: "",
  email: "",
  department: "",
  role: "",
  position: ""
});

const createEmployee = async () => {
  const added = await addEmployee(newEmp.value);
  if (added) {
    await fetchEmployees(); // Refresh list
    newEmp.value = { name: "", email: "", department: "", role: "", position: "" };
  } else {
    error.value = "Failed to add employee";
  }
};

// -------------------- EDIT --------------------
const editingId = ref(null);
const editEmp = ref({});

const startEdit = (emp) => {
  editingId.value = emp.id;
  editEmp.value = { ...emp }; // Copy values
};

const saveEmployee = async (id) => {
  const success = await updateEmployee(id, editEmp.value);
  if (success) {
    await fetchEmployees(); // Refresh list
    editingId.value = null;
  } else {
    error.value = "Failed to update employee";
  }
};

// -------------------- DELETE --------------------
const removeEmployee = async (id) => {
  await deleteEmployee(id);
  await fetchEmployees(); // Refresh list
};

// -------------------- INITIAL FETCH --------------------
onMounted(async () => {
  loading.value = true;
  try {
    await fetchEmployees();
  } catch (err) {
    error.value = "Failed to fetch employees";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
h1, h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.search-container input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

td input {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.add-employee {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

.add-employee .form-row {
  margin-bottom: 10px;
}

.add-employee label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.add-employee input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
