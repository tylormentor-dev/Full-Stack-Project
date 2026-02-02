<template>
  <div class="attendance container-fluid py-4 mt-3">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="mb-3">
          <i class="bi bi-calendar3 me-2"></i>Attendance Tracking
        </h1>
      </div>
    </div>

    <!-- Date Filter Section -->
    <div class="row mb-4">
      <div class="col-md-4">
        <label for="dateFilter" class="form-label">Filter by Date</label>
        <input
          id="dateFilter"
          v-model="selectedDate"
          type="date"
          class="form-control"
          @change="updateAttendanceRecords"
        />
      </div>
      <div class="col-md-4 d-flex align-items-end">
        <button @click="generateTodayAttendance" class="btn btn-primary">
          <i class="bi bi-arrow-clockwise me-2"></i>Generate Today's Attendance
        </button>
      </div>
    </div>

    <!-- Attendance Table -->
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-light">
            <h5 class="mb-0">
              <i class="bi bi-table me-2"></i>Attendance Records
              <span v-if="selectedDate" class="ms-2 text-muted">
                ({{ formatDate(selectedDate) }})
              </span>
            </h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in filteredAttendance" :key="record.id">
                    <td>{{ record.employeeName }}</td>
                    <td>{{ formatDate(record.date) }}</td>
                    <td>
                      <span :class="getStatusBadgeClass(record.status)" class="badge">
                        {{ record.status }}
                      </span>
                    </td>
                    <td>
                      <span v-if="record.notes" class="text-muted">
                        {{ record.notes }}
                      </span>
                      <span v-else class="text-muted">-</span>
                    </td>
                  </tr>
                  <tr v-if="filteredAttendance.length === 0">
                    <td colspan="4" class="text-center text-muted">
                      No attendance records found for selected date
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
import { ref, computed, onMounted } from 'vue'
import { useHRData } from '../composables/useHRData.js'

export default {
  name: 'Attendance',
  setup() {
    const { getEmployees, hasApprovedTimeOff, getTimeOffForDate } = useHRData()
    const employees = getEmployees()
    const attendanceRecords = ref([])
    const selectedDate = ref(new Date().toISOString().split('T')[0])

    // Format date for display
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    // Get status badge class
    const getStatusBadgeClass = (status) => {
      switch (status.toLowerCase()) {
        case 'present':
          return 'bg-success'
        case 'absent':
          return 'bg-danger'
        case 'on-leave':
          return 'bg-info text-dark'
        default:
          return 'bg-secondary'
      }
    }

    // Generate attendance records for a specific date
    const generateAttendanceForDate = (date) => {
      const records = []
      
      employees.forEach(employee => {
        let status = 'present' // Default status
        let notes = ''

        // Check if employee has approved time-off
        if (hasApprovedTimeOff(employee.id, date)) {
          status = 'on-leave'
          const timeOff = getTimeOffForDate(employee.id, date)
          if (timeOff) {
            notes = `Time-off: ${timeOff.type}`
          }
        }

        // Check if record already exists
        const existingRecordIndex = attendanceRecords.value.findIndex(
          r => r.employeeId === employee.id && r.date === date
        )

        if (existingRecordIndex === -1) {
          // Create new record
          records.push({
            id: attendanceRecords.value.length > 0
              ? Math.max(...attendanceRecords.value.map(r => r.id)) + records.length + 1
              : records.length + 1,
            employeeId: employee.id,
            employeeName: employee.name,
            date: date,
            status: status,
            notes: notes
          })
        } else {
          // Update existing record if status changed (e.g., time-off was just approved)
          const existingRecord = attendanceRecords.value[existingRecordIndex]
          if (existingRecord.status !== status) {
            existingRecord.status = status
            existingRecord.notes = notes
          }
        }
      })

      // Add new records to existing ones
      attendanceRecords.value.push(...records)
    }

    // Generate today's attendance
    const generateTodayAttendance = () => {
      const today = new Date().toISOString().split('T')[0]
      selectedDate.value = today
      generateAttendanceForDate(today)
    }

    // Update attendance records when date changes
    const updateAttendanceRecords = () => {
      if (selectedDate.value) {
        generateAttendanceForDate(selectedDate.value)
      }
    }

    // Filter attendance by selected date
    const filteredAttendance = computed(() => {
      if (!selectedDate.value) {
        return attendanceRecords.value
      }
      return attendanceRecords.value.filter(
        record => record.date === selectedDate.value
      )
    })

    // Initialize with today's date and regenerate on mount to pick up any changes
    onMounted(() => {
      generateTodayAttendance()
      // Also regenerate to catch any recent approvals
      const today = new Date().toISOString().split('T')[0]
      generateAttendanceForDate(today)
    })

    return {
      attendanceRecords,
      selectedDate,
      filteredAttendance,
      formatDate,
      getStatusBadgeClass,
      generateTodayAttendance,
      updateAttendanceRecords
    }
  }
}
</script>

<style scoped>
.attendance {
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

.badge {
  font-size: 0.875rem;
  padding: 0.5em 0.75em;
}
</style>
