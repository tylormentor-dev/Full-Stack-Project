<template>
  <div class="timeoff container-fluid py-4 mt-3">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="mb-3">
          <i class="bi bi-calendar-check me-2"></i>Time Off Requests
        </h1>
      </div>
    </div>

    <!-- Request Form Section -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
              <i class="bi bi-plus-circle me-2"></i>Request Time Off
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitRequest">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="employeeSelect" class="form-label">Employee</label>
                  <select
                    id="employeeSelect"
                    v-model="formData.employeeId"
                    class="form-select"
                    required
                  >
                    <option value="">Select Employee</option>
                    <option
                      v-for="employee in employees"
                      :key="employee.id"
                      :value="employee.id"
                    >
                      {{ employee.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="typeSelect" class="form-label">Type</label>
                  <select
                    id="typeSelect"
                    v-model="formData.type"
                    class="form-select"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="vacation">Vacation</option>
                    <option value="sick">Sick Leave</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="startDate" class="form-label">Start Date</label>
                  <input
                    id="startDate"
                    ref="startDateInput"
                    v-model="formData.startDate"
                    type="text"
                    class="form-control"
                    placeholder="Select start date"
                    required
                    readonly
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="endDate" class="form-label">End Date</label>
                  <input
                    id="endDate"
                    ref="endDateInput"
                    v-model="formData.endDate"
                    type="text"
                    class="form-control"
                    placeholder="Select end date"
                    required
                    readonly
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="reason" class="form-label">Reason</label>
                <textarea
                  id="reason"
                  v-model="formData.reason"
                  class="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-send me-2"></i>Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Requests List Section -->
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-light">
            <h5 class="mb-0">
              <i class="bi bi-list-ul me-2"></i>All Time Off Requests
            </h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="request in requests" :key="request.id">
                    <td>{{ request.employeeName }}</td>
                    <td>{{ formatDate(request.startDate) }}</td>
                    <td>{{ formatDate(request.endDate) }}</td>
                    <td>
                      <span class="badge bg-info text-dark">
                        {{ capitalizeFirst(request.type) }}
                      </span>
                    </td>
                    <td>{{ request.reason }}</td>
                    <td>
                      <span
                        :class="getStatusBadgeClass(request.status)"
                        class="badge"
                      >
                        {{ capitalizeFirst(request.status) }}
                      </span>
                    </td>
                    <td>
                      <button
                        v-if="request.status === 'pending'"
                        @click="approveRequest(request.id)"
                        class="btn btn-sm btn-success me-2"
                      >
                        <i class="bi bi-check-circle me-1"></i>Approve
                      </button>
                      <button
                        v-if="request.status === 'pending'"
                        @click="denyRequest(request.id)"
                        class="btn btn-sm btn-danger"
                      >
                        <i class="bi bi-x-circle me-1"></i>Deny
                      </button>
                      <span v-if="request.status !== 'pending'" class="text-muted">
                        No actions available
                      </span>
                    </td>
                  </tr>
                  <tr v-if="requests.length === 0">
                    <td colspan="7" class="text-center text-muted">
                      No time off requests found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useHRData } from '../composables/useHRData.js'
import flatpickr from 'flatpickr'

export default {
  name: 'Timeoff',
  setup() {
    // Use shared HR data composable
    const {
      employeesList,
      requestsList,
      getEmployeeNameById,
      addTimeOffRequest,
      updateTimeOffRequestStatus
    } = useHRData()
    
    const formData = reactive({
      employeeId: '',
      startDate: '',
      endDate: '',
      type: '',
      reason: ''
    })

    // Refs for date picker inputs
    const startDateInput = ref(null)
    const endDateInput = ref(null)
    let startDatePicker = null
    let endDatePicker = null

    // Format date for display
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    // Capitalize first letter
    const capitalizeFirst = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // Get status badge class
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'approved':
          return 'bg-success'
        case 'denied':
          return 'bg-danger'
        case 'pending':
          return 'bg-warning text-dark'
        default:
          return 'bg-secondary'
      }
    }

    // Submit new request
    const submitRequest = () => {
      // Validate dates
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        alert('End date must be after start date')
        return
      }

      // Create new request
      const newRequest = {
        employeeId: parseInt(formData.employeeId),
        employeeName: getEmployeeNameById(parseInt(formData.employeeId)),
        startDate: formData.startDate,
        endDate: formData.endDate,
        type: formData.type,
        status: 'pending',
        reason: formData.reason
      }

      // Add to requests using composable
      addTimeOffRequest(newRequest)

      // Reset form
      formData.employeeId = ''
      formData.startDate = ''
      formData.endDate = ''
      formData.type = ''
      formData.reason = ''

      // Clear date pickers
      if (startDatePicker) {
        startDatePicker.clear()
      }
      if (endDatePicker) {
        endDatePicker.clear()
        endDatePicker.set('minDate', 'today')
      }

      alert('Time off request submitted successfully!')
    }

    // Approve request
    const approveRequest = (requestId) => {
      updateTimeOffRequestStatus(requestId, 'approved')
      alert('Time off request approved!')
    }

    // Deny request
    const denyRequest = (requestId) => {
      updateTimeOffRequestStatus(requestId, 'denied')
      alert('Time off request denied.')
    }

    // Initialize date pickers
    onMounted(async () => {
      await nextTick()
      
      // Initialize start date picker
      if (startDateInput.value) {
        startDatePicker = flatpickr(startDateInput.value, {
          dateFormat: 'Y-m-d',
          minDate: 'today',
          onChange: (selectedDates, dateStr) => {
            formData.startDate = dateStr
            // Update end date picker min date
            if (endDatePicker && selectedDates.length > 0) {
              endDatePicker.set('minDate', selectedDates[0])
            }
          }
        })
      }

      // Initialize end date picker
      if (endDateInput.value) {
        endDatePicker = flatpickr(endDateInput.value, {
          dateFormat: 'Y-m-d',
          minDate: 'today',
          onChange: (selectedDates, dateStr) => {
            formData.endDate = dateStr
          }
        })
      }
    })

    // Cleanup date pickers on unmount
    onUnmounted(() => {
      if (startDatePicker) {
        startDatePicker.destroy()
      }
      if (endDatePicker) {
        endDatePicker.destroy()
      }
    })

    return {
      requests: requestsList,
      employees: employeesList,
      formData,
      startDateInput,
      endDateInput,
      formatDate,
      capitalizeFirst,
      getStatusBadgeClass,
      submitRequest,
      approveRequest,
      denyRequest
    }
  }
}
</script>

<style scoped>
.timeoff {
  min-height: 100vh;
}

.card {
  border: none;
  border-radius: 8px;
}

.card-header {
  border-radius: 8px 8px 0 0 !important;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.btn-sm {
  font-size: 0.875rem;
}

/* Flatpickr styling */
.flatpickr-input {
  cursor: pointer;
}

.form-control[readonly] {
  background-color: #fff;
  cursor: pointer;
}
</style>
