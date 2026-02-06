<template>
  <div class="dashboard container-fluid py-4 mt-3">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="mb-3">
          <i class="bi bi-speedometer2 me-2"></i>Dashboard
        </h1>
        <p class="text-muted">Welcome to ModernTechHR Dashboard</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Employees -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted text-uppercase mb-2">Total Employees</h6>
              <h2 class="mb-0">{{ totalEmployees }}</h2>
            </div>
            <div class="bg-primary bg-opacity-10 p-3 rounded-circle">
              <i class="bi bi-people fs-1 text-primary"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Requests -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted text-uppercase mb-2">Pending Requests</h6>
              <h2 class="mb-0">{{ pendingRequests }}</h2>
            </div>
            <div class="bg-warning bg-opacity-10 p-3 rounded-circle">
              <i class="bi bi-calendar-x fs-1 text-warning"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Birthdays -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted text-uppercase mb-2">Upcoming Birthdays</h6>
              <h2 class="mb-0">{{ upcomingBirthdays.length }}</h2>
            </div>
            <div class="bg-success bg-opacity-10 p-3 rounded-circle">
              <i class="bi bi-gift fs-1 text-success"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Attendance -->
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="text-muted text-uppercase mb-2">Today's Attendance</h6>
              <h2 class="mb-0">{{ attendanceToday.present }}</h2>
              <small class="text-muted">
                Present / {{ attendanceToday.total }} Total
              </small>
            </div>
            <div class="bg-info bg-opacity-10 p-3 rounded-circle">
              <i class="bi bi-bar-chart fs-1 text-info"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Birthdays List -->
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light">
            <h5 class="mb-0"><i class="bi bi-gift me-2"></i>Upcoming Birthdays (Next 30 Days)</h5>
          </div>
          <div class="card-body">
            <ul v-if="upcomingBirthdays.length > 0" class="list-group list-group-flush">
              <li v-for="b in upcomingBirthdays" :key="b.employee.id" class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{{ b.employee.name }}</strong><br />
                  <small class="text-muted">{{ b.employee.department }}</small>
                </div>
                <span class="badge bg-success">{{ formatBirthdayDate(b.birthday) }}</span>
              </li>
            </ul>
            <div v-else class="text-center text-muted py-3">
              No upcoming birthdays
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance Today -->
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light">
            <h5 class="mb-0"><i class="bi bi-calendar-check me-2"></i>Today's Attendance Overview</h5>
          </div>
          <div class="card-body text-center">
            <div class="row">
              <div class="col-4">
                <h3 class="text-success mb-1">{{ attendanceToday.present }}</h3>
                <small>Present</small>
              </div>
              <div class="col-4">
                <h3 class="text-danger mb-1">{{ attendanceToday.absent }}</h3>
                <small>Absent</small>
              </div>
              <div class="col-4">
                <h3 class="text-info mb-1">{{ attendanceToday.onLeave }}</h3>
                <small>On Leave</small>
              </div>
            </div>
            <hr />
            <small class="text-muted">Last updated: {{ formatCurrentDate() }}</small>
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
  name: 'Dashboard',
  setup() {
    const {
      employeesList,
      requestsList,
      fetchEmployees,
      fetchTimeOffRequests,
      hasApprovedTimeOff
    } = useHRData()

    const totalEmployees = computed(() => employeesList.value.length)
    const pendingRequests = computed(() => requestsList.value.filter(r => r.status === 'pending').length)

    const upcomingBirthdays = computed(() => {
      const today = new Date()
      const in30Days = new Date()
      in30Days.setDate(today.getDate() + 30)
      return employeesList.value
        .map(emp => {
          const dob = new Date(emp.dateOfBirth)
          let birthdayThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
          if (birthdayThisYear < today) birthdayThisYear.setFullYear(today.getFullYear() + 1)
          return { employee: emp, birthday: birthdayThisYear }
        })
        .filter(b => b.birthday >= today && b.birthday <= in30Days)
        .sort((a, b) => a.birthday - b.birthday)
    })

    const attendanceToday = computed(() => {
      const today = new Date().toISOString().split('T')[0]
      let present = 0, absent = 0, onLeave = 0
      employeesList.value.forEach(emp => {
        if (hasApprovedTimeOff(emp.id, today)) onLeave++
        else present++
      })
      return { present, absent, onLeave, total: employeesList.value.length }
    })

    const formatBirthdayDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const formatCurrentDate = () => new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

    onMounted(async () => {
      await fetchEmployees()
      await fetchTimeOffRequests()
    })

    return { totalEmployees, pendingRequests, upcomingBirthdays, attendanceToday, formatBirthdayDate, formatCurrentDate }
  }
}
</script>
