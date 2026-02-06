// composables/useHRData.js
import { ref } from 'vue'

const API_EMPLOYEES = 'http://localhost:5000/api/employees'
const API_TIMEOFF = 'http://localhost:5000/api/timeoff'
const API_PAYROLL = 'http://localhost:5000/api/payroll'

export function useHRData() {
  const employeesList = ref([])
  const requestsList = ref([])
  const payrollList = ref([])
  const error = ref(null)

  // ---------------------- EMPLOYEES ----------------------
  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_EMPLOYEES)
      if (!res.ok) throw new Error('Failed to fetch employees')
      employeesList.value = await res.json()
    } catch (err) {
      console.error(err)
      error.value = err.message
    }
  }

  const addEmployee = async (employee) => {
    try {
      const res = await fetch(API_EMPLOYEES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to add employee')
      }
      const newEmployee = await res.json()
      employeesList.value.push(newEmployee)
      return newEmployee
    } catch (err) {
      console.error(err)
      error.value = err.message
      return null
    }
  }

  const updateEmployee = async (id, employee) => {
    try {
      const res = await fetch(`${API_EMPLOYEES}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to update employee')
      }
      const updatedEmployee = await res.json()
      const index = employeesList.value.findIndex(e => e.id === id)
      if (index !== -1) employeesList.value[index] = updatedEmployee
      return updatedEmployee
    } catch (err) {
      console.error(err)
      error.value = err.message
      return null
    }
  }

  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${API_EMPLOYEES}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to delete employee')
      }
      employeesList.value = employeesList.value.filter(e => e.id !== id)
      return true
    } catch (err) {
      console.error(err)
      error.value = err.message
      return false
    }
  }

  // ---------------------- TIME OFF ----------------------
  const fetchTimeOffRequests = async () => {
    try {
      const res = await fetch(API_TIMEOFF)
      if (!res.ok) throw new Error('Failed to fetch time-off requests')
      requestsList.value = await res.json()
    } catch (err) {
      console.error(err)
      error.value = err.message
    }
  }

  const addTimeOffRequest = async (request) => {
    try {
      const res = await fetch(API_TIMEOFF, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to add time-off request')
      }
      const newRequest = await res.json()
      requestsList.value.push(newRequest)
      return newRequest
    } catch (err) {
      console.error(err)
      error.value = err.message
      return null
    }
  }

  const updateTimeOffRequest = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_TIMEOFF}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to update time-off request')
      }
      const updatedRequest = await res.json()
      const index = requestsList.value.findIndex(r => r.id === id)
      if (index !== -1) requestsList.value[index] = updatedRequest
      return updatedRequest
    } catch (err) {
      console.error(err)
      error.value = err.message
      return null
    }
  }

  const deleteTimeOffRequest = async (id) => {
    try {
      const res = await fetch(`${API_TIMEOFF}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to delete time-off request')
      }
      requestsList.value = requestsList.value.filter(r => r.id !== id)
      return true
    } catch (err) {
      console.error(err)
      error.value = err.message
      return false
    }
  }

  const hasApprovedTimeOff = (employeeId, date) => {
    return requestsList.value.some(
      r =>
        r.employeeId === employeeId &&
        r.status === 'approved' &&
        new Date(date) >= new Date(r.startDate) &&
        new Date(date) <= new Date(r.endDate)
    )
  }

  const getTimeOffForDate = (employeeId, date) => {
    return requestsList.value.find(
      r =>
        r.employeeId === employeeId &&
        r.status === 'approved' &&
        new Date(date) >= new Date(r.startDate) &&
        new Date(date) <= new Date(r.endDate)
    )
  }

  const getEmployeeNameById = (id) => {
    return employeesList.value.find(e => e.id === id)?.name || 'Unknown'
  }

  // ---------------------- PAYROLL ----------------------
  const fetchPayroll = async () => {
    try {
      const res = await fetch(API_PAYROLL)
      if (!res.ok) throw new Error('Failed to fetch payroll')
      payrollList.value = await res.json()
    } catch (err) {
      console.error(err)
      error.value = err.message
    }
  }

  const addPayroll = async (payroll) => {
    try {
      const res = await fetch(API_PAYROLL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payroll)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to add payroll')
      }
      const newPayroll = await res.json()
      payrollList.value.push(newPayroll)
      return newPayroll
    } catch (err) {
      console.error(err)
      error.value = err.message
      return null
    }
  }

  const updatePayroll = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_PAYROLL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to update payroll')
      }
      const updatedPayroll = await res.json()
      const index = payrollList.value.findIndex(p => p.id === id)
      if (index !== -1) payrollList.value[index] = updatedPayroll
      return updatedPayroll
    } catch (err) {
      console.error(err)
      error.value = err.message
      return null
    }
  }

  const deletePayroll = async (id) => {
    try {
      const res = await fetch(`${API_PAYROLL}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to delete payroll')
      }
      payrollList.value = payrollList.value.filter(p => p.id !== id)
      return true
    } catch (err) {
      console.error(err)
      error.value = err.message
      return false
    }
  }

  return {
    employeesList,
    requestsList,
    payrollList,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchTimeOffRequests,
    addTimeOffRequest,
    updateTimeOffRequest,
    deleteTimeOffRequest,
    hasApprovedTimeOff,
    getTimeOffForDate,
    getEmployeeNameById,
    fetchPayroll,
    addPayroll,
    updatePayroll,
    deletePayroll
  }
}
