<template>
  <div class="dashboard container-fluid py-4 mt-3">
    <!-- Header -->
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="mb-2">
          <i class="bi bi-speedometer2 me-2"></i>Dashboard
        </h1>
        <p class="text-muted">Welcome to ModernTechHR</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Employees -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted text-uppercase">Employees</small>
              <h2>{{ totalEmployees }}</h2>
            </div>
            <i class="bi bi-people fs-1 text-primary"></i>
          </div>
        </div>
      </div>

      <!-- Pending Requests -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted text-uppercase">Pending Requests</small>
              <h2>{{ pendingRequests }}</h2>
            </div>
            <i class="bi bi-calendar-x fs-1 text-warning"></i>
          </div>
        </div>
      </div>

      <!-- Upcoming Birthdays -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted text-uppercase">Upcoming Birthdays</small>
              <h2>{{ upcomingBirthdays.length }}</h2>
            </div>
            <i class="bi bi-gift fs-1 text-success"></i>
          </div>
        </div>
      </div>

      <!-- Attendance -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted text-uppercase">Present Today</small>
              <h2>{{ attendanceToday.present }}</h2>
              <small class="text-muted">
                / {{ attendanceToday.total }}
              </small>
            </div>
            <i class="bi bi-bar-chart fs-1 text-info"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="row g-4">
      <!-- Birthdays -->
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light">
            <strong>🎂 Upcoming Birthdays</strong>
          </div>
          <div class="card-body">
            <ul v-if="upcomingBirthdays.length" class="list-group list-group-flush">
              <li
                v-for="item in upcomingBirthdays"
                :key="item.employee.id"
                class="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{{ item.employee.name }}</strong><br />
                  <small class="text-muted">{{ item.employee.department }}</small>
                </div>
                <span class="badge bg-success">
                  {{ formatBirthday(item.birthday) }}
                </span>
              </li>
            </ul>

            <p v-else class="text-muted text-center mb-0">
              No birthdays in the next 30 days
            </p>
          </div>
        </div>
      </div>

      <!-- Attendance Summary -->
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light">
            <strong>📊 Attendance Summary</strong>
          </div>
          <div class="card-body text-center">
            <div class="row">
              <div class="col">
                <h3 class="text-success">{{ attendanceToday.present }}</h3>
                <small>Present</small>
              </div>
              <div class="col">
                <h3 class="text-info">{{ attendanceToday.onLeave }}</h3>
                <small>On Leave</small>
              </div>
            </div>
            <hr />
            <small class="text-muted">
              Updated: {{ formatToday() }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useHRData } from '../composables/useHRData.js'

export default {
  name: 'Dashboard',
  setup() {
    const {
      employeesList,
      requestsList,
      hasApprovedTimeOff,
      fetchEmployees
    } = useHRData()

    onMounted(fetchEmployees)

    const totalEmployees = computed(() => employeesList.value.length)

    const pendingRequests = computed(() =>
      requestsList.value.filter(r => r.status === 'pending').length
    )

    const upcomingBirthdays = computed(() => {
      const today = new Date()
      const limit = new Date()
      limit.setDate(today.getDate() + 30)

      return employeesList.value
        .map(emp => {
          const dob = new Date(emp.date_of_birth)
          const birthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
          if (birthday < today) birthday.setFullYear(today.getFullYear() + 1)
          return { employee: emp, birthday }
        })
        .filter(b => b.birthday <= limit)
        .sort((a, b) => a.birthday - b.birthday)
    })

    const attendanceToday = computed(() => {
      const today = new Date().toISOString().split('T')[0]
      let onLeave = 0

      employeesList.value.forEach(emp => {
        if (hasApprovedTimeOff(emp.id, today)) onLeave++
      })

      return {
        present: employeesList.value.length - onLeave,
        onLeave,
        total: employeesList.value.length
      }
    })

    const formatBirthday = (date) =>
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    const formatToday = () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })

    return {
      totalEmployees,
      pendingRequests,
      upcomingBirthdays,
      attendanceToday,
      formatBirthday,
      formatToday
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
