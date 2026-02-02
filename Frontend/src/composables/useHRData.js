// Shared state composable for HR data
// Uses localStorage to persist data across page navigation

import { ref, watch } from 'vue'
import { employees, timeOffRequests } from '../data/dummyData.js'

// Initialize data from localStorage or use defaults
const getStoredData = (key, defaultValue) => {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : defaultValue
}

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// Reactive state
const employeesList = ref(getStoredData('hr_employees', employees))
const requestsList = ref(getStoredData('hr_timeoff_requests', timeOffRequests))

// Watch for changes and save to localStorage
watch(employeesList, (newVal) => {
  saveData('hr_employees', newVal)
}, { deep: true })

watch(requestsList, (newVal) => {
  saveData('hr_timeoff_requests', newVal)
}, { deep: true })

export function useHRData() {
  // Get all employees
  const getEmployees = () => {
    return employeesList.value
  }

  // Get employee by ID
  const getEmployeeById = (id) => {
    return employeesList.value.find(emp => emp.id === id)
  }

  // Get employee name by ID
  const getEmployeeNameById = (id) => {
    const employee = getEmployeeById(id)
    return employee ? employee.name : 'Unknown'
  }

  // Get all time-off requests
  const getTimeOffRequests = () => {
    return requestsList.value
  }

  // Get pending requests
  const getPendingRequests = () => {
    return requestsList.value.filter(req => req.status === 'pending')
  }

  // Get approved requests
  const getApprovedRequests = () => {
    return requestsList.value.filter(req => req.status === 'approved')
  }

  // Add new time-off request
  const addTimeOffRequest = (request) => {
    const newRequest = {
      ...request,
      id: requestsList.value.length > 0
        ? Math.max(...requestsList.value.map(r => r.id)) + 1
        : 1
    }
    requestsList.value.push(newRequest)
    return newRequest
  }

  // Update time-off request status
  const updateTimeOffRequestStatus = (requestId, status) => {
    const request = requestsList.value.find(r => r.id === requestId)
    if (request) {
      request.status = status
      return true
    }
    return false
  }

  // Check if employee has approved time-off for a date
  const hasApprovedTimeOff = (employeeId, date) => {
    const dateObj = new Date(date)
    return requestsList.value.some(request => {
      if (
        request.employeeId === employeeId &&
        request.status === 'approved'
      ) {
        const startDate = new Date(request.startDate)
        const endDate = new Date(request.endDate)
        return dateObj >= startDate && dateObj <= endDate
      }
      return false
    })
  }

  // Get time-off request for employee on a specific date
  const getTimeOffForDate = (employeeId, date) => {
    const dateObj = new Date(date)
    return requestsList.value.find(request => {
      if (
        request.employeeId === employeeId &&
        request.status === 'approved'
      ) {
        const startDate = new Date(request.startDate)
        const endDate = new Date(request.endDate)
        return dateObj >= startDate && dateObj <= endDate
      }
      return false
    })
  }

  return {
    employeesList,
    requestsList,
    getEmployees,
    getEmployeeById,
    getEmployeeNameById,
    getTimeOffRequests,
    getPendingRequests,
    getApprovedRequests,
    addTimeOffRequest,
    updateTimeOffRequestStatus,
    hasApprovedTimeOff,
    getTimeOffForDate
  }
}
