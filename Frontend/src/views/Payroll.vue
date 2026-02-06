<template>
  <div class="payroll-container">
    <h1>Payroll</h1>
    <button class="btn btn-primary mb-3" @click="openModal()">+ Add Payroll Entry</button>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Hours Worked</th>
          <th>Leave Deductions</th>
          <th>Final Salary (R)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in payrollList" :key="p.id">
          <td>{{ getEmployeeName(p.employeeId) }}</td>
          <td>{{ p.hoursWorked }}</td>
          <td>{{ p.leaveDeductions }}</td>
          <td>R {{ p.finalSalary.toLocaleString() }}</td>
          <td>
            <button class="btn btn-success btn-sm" @click="openModal(p)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteEntry(p.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-backdrop">
      <div class="modal-content">
        <h3>{{ currentPayroll.id ? 'Edit' : 'Add' }} Payroll Entry</h3>
        <form @submit.prevent="submitPayroll">
          <label>Employee</label>
          <select v-model="currentPayroll.employeeId" required>
            <option v-for="emp in employeesList" :key="emp.id" :value="emp.id">{{ emp.name }}</option>
          </select>

          <label>Hours Worked</label>
          <input type="number" v-model="currentPayroll.hoursWorked" required />

          <label>Leave Deductions</label>
          <input type="number" v-model="currentPayroll.leaveDeductions" required />

          <label>Final Salary</label>
          <input type="number" v-model="currentPayroll.finalSalary" required />

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

const { employeesList, payrollList, fetchEmployees, fetchPayroll, addPayroll, updatePayroll, deletePayroll, getEmployeeNameById } = useHRData()

const modalOpen = ref(false)
const currentPayroll = reactive({ id: null, employeeId: '', hoursWorked: 0, leaveDeductions: 0, finalSalary: 0 })

const openModal = (p = null) => {
  if (p) Object.assign(currentPayroll, p)
  else Object.assign(currentPayroll, { id: null, employeeId: '', hoursWorked: 0, leaveDeductions: 0, finalSalary: 0 })
  modalOpen.value = true
}

const closeModal = () => modalOpen.value = false

const submitPayroll = async () => {
  if (currentPayroll.id) await updatePayroll(currentPayroll.id, currentPayroll)
  else await addPayroll(currentPayroll)
  closeModal()
}

const deleteEntry = async (id) => {
  if (confirm('Delete this payroll entry?')) await deletePayroll(id)
}

const getEmployeeName = (id) => getEmployeeNameById(id)

onMounted(async () => {
  await fetchEmployees()
  await fetchPayroll()
})
</script>

<style scoped>
.payroll-container {
  max-width: 900px; margin:40px auto; padding:25px; background:#fff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);
}

.table th, .table td { padding:12px; }

.modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.4); display:flex; justify-content:center; align-items:center; }
.modal-content { background:#fff; padding:20px; border-radius:10px; width:400px; }
.modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:20px; }
.modal-content input, .modal-content select { width:100%; padding:8px; margin-top:5px; margin-bottom:10px; border-radius:5px; border:1px solid #ccc; }
</style>
