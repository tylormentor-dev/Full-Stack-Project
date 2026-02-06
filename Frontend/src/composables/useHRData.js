import { ref } from 'vue'

const API_BASE = 'http://localhost:5000/api/employees'

const employeesList = ref([])
const requestsList = ref([]) // time off (local only)
const error = ref(null)

export function useHRData() {

  // ===== EMPLOYEES =====
  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_BASE)
      employeesList.value = await res.json()
    } catch (err) {
      error.value = 'Failed to fetch employees'
    }
  }

  const addEmployee = async (employee) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
    const data = await res.json()
    employeesList.value.push(data.employee)
  }

  const updateEmployee = async (id, employee) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
    const data = await res.json()
    const index = employeesList.value.findIndex(e => e.id === id)
    if (index !== -1) employeesList.value[index] = data.employee
  }

  const deleteEmployee = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    employeesList.value = employeesList.value.filter(e => e.id !== id)
  }

  // ===== TIME OFF (LOCAL STATE) =====
  const addTimeOffRequest = (request) => {
    request.id = Date.now()
    requestsList.value.push(request)
  }

  const updateTimeOffRequestStatus = (id, status) => {
    const req = requestsList.value.find(r => r.id === id)
    if (req) req.status = status
  }

  const hasApprovedTimeOff = (employeeId, date) => {
    return requestsList.value.some(r =>
      r.employeeId === employeeId &&
      r.status === 'approved' &&
      date >= r.startDate &&
      date <= r.endDate
    )
  }

  const getEmployeeNameById = (id) => {
    return employeesList.value.find(e => e.id === id)?.name || 'Unknown'
  }

  return {
    employeesList,
    requestsList,
    error,

    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,

    addTimeOffRequest,
    updateTimeOffRequestStatus,
    hasApprovedTimeOff,
    getEmployeeNameById
  }
}
