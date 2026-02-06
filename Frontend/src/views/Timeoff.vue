<template>
  <div class="timeoff-container">
    <h1>Time-Off Requests</h1>

    <button class="btn btn-primary mb-3" @click="openModal()">+ Add New Request</button>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in requestsList" :key="req.id">
          <td>{{ getEmployeeName(req.employeeId) }}</td>
          <td>{{ req.startDate }}</td>
          <td>{{ req.endDate }}</td>
          <td>{{ req.status }}</td>
          <td>
            <button class="btn btn-success btn-sm" @click="openModal(req)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteRequest(req.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-backdrop">
      <div class="modal-content">
        <h3>{{ currentRequest.id ? 'Edit' : 'Add' }} Time-Off Request</h3>
        <form @submit.prevent="submitRequest">
          <label>Employee</label>
          <select v-model="currentRequest.employeeId" required>
            <option v-for="emp in employeesList" :key="emp.id" :value="emp.id">{{ emp.name }}</option>
          </select>

          <label>Start Date</label>
          <input type="date" v-model="currentRequest.startDate" required />

          <label>End Date</label>
          <input type="date" v-model="currentRequest.endDate" required />

          <label>Status</label>
          <select v-model="currentRequest.status" required>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useHRData } from '../composables/useHRData.js'

const { employeesList, requestsList, fetchEmployees, fetchTimeOffRequests, addTimeOffRequest, updateTimeOffRequestStatus, deleteTimeOffRequest, getEmployeeNameById } = useHRData()

const modalOpen = ref(false)
const currentRequest = reactive({ id: null, employeeId: '', startDate: '', endDate: '', status: 'pending' })

const openModal = (req = null) => {
  if (req) Object.assign(currentRequest, req)
  else Object.assign(currentRequest, { id: null, employeeId: '', startDate: '', endDate: '', status: 'pending' })
  modalOpen.value = true
}

const closeModal = () => modalOpen.value = false

const submitRequest = async () => {
  if (currentRequest.id) {
    await updateTimeOffRequestStatus(currentRequest.id, currentRequest.status)
  } else {
    await addTimeOffRequest(currentRequest)
  }
  closeModal()
}

const deleteRequest = async (id) => {
  if (confirm('Are you sure you want to delete this request?')) {
    await deleteTimeOffRequest(id)
  }
}

const getEmployeeName = (id) => getEmployeeNameById(id)

onMounted(async () => {
  await fetchEmployees()
  await fetchTimeOffRequests()
})
</script>

<style scoped>
.timeoff-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.table th, .table td {
  padding: 12px;
}

.modal-backdrop {
  position: fixed;
  top:0; left:0;
  width:100%; height:100%;
  background: rgba(0,0,0,0.4);
  display:flex; justify-content:center; align-items:center;
}

.modal-content {
  background: #fff; padding: 20px; border-radius: 10px; width: 400px;
}

.modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:20px; }

.modal-content input, .modal-content select {
  width: 100%; padding:8px; margin-top:5px; margin-bottom:10px; border-radius:5px; border:1px solid #ccc;
}
</style>
