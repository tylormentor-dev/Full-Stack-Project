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

    
    <div class="row g-4 mb-4">
     
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
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
      </div>

      
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
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
      </div>

      
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
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
      </div>

     
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm h-100 border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
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
    </div>

    
    <div class="row g-4">
      
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light">
            <h5 class="mb-0">
              <i class="bi bi-gift me-2"></i>Upcoming Birthdays (Next 30 Days)
            </h5>
          </div>
          <div class="card-body">
            <div v-if="upcomingBirthdays.length > 0">
              <ul class="list-group list-group-flush">
                <li
                  v-for="birthday in upcomingBirthdays"
                  :key="birthday.employee.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{{ birthday.employee.name }}</strong>
                    <br />
                    <small class="text-muted">{{ birthday.employee.department }}</small>
                  </div>
                  <span class="badge bg-success">
                    {{ formatBirthdayDate(birthday.birthday) }}
                  </span>
                </li>
              </ul>
            </div>
            <div v-else class="text-center text-muted py-3">
              No upcoming birthdays in the next 30 days
            </div>
          </div>
        </div>
      </div>

      
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light">
            <h5 class="mb-0">
              <i class="bi bi-calendar-check me-2"></i>Today's Attendance Overview
            </h5>
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-4">
                <div class="p-3">
                  <h3 class="text-success mb-1">{{ attendanceToday.present }}</h3>
                  <small class="text-muted">Present</small>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3">
                  <h3 class="text-danger mb-1">{{ attendanceToday.absent }}</h3>
                  <small class="text-muted">Absent</small>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3">
                  <h3 class="text-info mb-1">{{ attendanceToday.onLeave }}</h3>
                  <small class="text-muted">On Leave</small>
                </div>
              </div>
            </div>
            <hr />
            <div class="text-center">
              <p class="mb-0">
                <strong>Total Employees:</strong> {{ attendanceToday.total }}
              </p>
              <p class="mb-0 text-muted">
                <small>Last updated: {{ formatCurrentDate() }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useHRData } from '../composables/useHRData.js'

export default {
  name: 'Dashboard',
  setup() {
    const {
      getEmployees,
      getTimeOffRequests,
      getPendingRequests,
      hasApprovedTimeOff
    } = useHRData()

    const employees = getEmployees()
    const timeOffRequests = getTimeOffRequests()

    
    const totalEmployees = computed(() => employees.length)

  
    const pendingRequests = computed(() => {
      return getPendingRequests().length
    })

    
    const upcomingBirthdays = computed(() => {
      const today = new Date()
      const thirtyDaysFromNow = new Date(today)
      thirtyDaysFromNow.setDate(today.getDate() + 30)

      const birthdays = []

      employees.forEach(employee => {
        const birthDate = new Date(employee.dateOfBirth)
        const thisYearBirthday = new Date(
          today.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate()
        )

        
        const birthdayToCheck =
          thisYearBirthday < today
            ? new Date(
                today.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
              )
            : thisYearBirthday

        if (birthdayToCheck >= today && birthdayToCheck <= thirtyDaysFromNow) {
          birthdays.push({
            employee: employee,
            birthday: birthdayToCheck
          })
        }
      })

      
      birthdays.sort((a, b) => a.birthday - b.birthday)

      return birthdays
    })

   
    const attendanceToday = computed(() => {
      const today = new Date().toISOString().split('T')[0]
      let present = 0
      let absent = 0
      let onLeave = 0

      
      employees.forEach(employee => {
        
        const hasTimeOff = hasApprovedTimeOff(employee.id, today)

        if (hasTimeOff) {
          onLeave++
        } else {
          
          present++
        }
      })

      return {
        present,
        absent,
        onLeave,
        total: employees.length
      }
    })

    
    const formatBirthdayDate = (date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }

    
    const formatCurrentDate = () => {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      totalEmployees,
      pendingRequests,
      upcomingBirthdays,
      attendanceToday,
      formatBirthdayDate,
      formatCurrentDate
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
}

.card {
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
}

.card-header {
  border-radius: 8px 8px 0 0 !important;
  background-color: #f8f9fa !important;
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #e9ecef;
}

.list-group-item:last-child {
  border-bottom: none;
}

.bg-opacity-10 {
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
}

.bg-warning.bg-opacity-10 {
  background-color: rgba(var(--bs-warning-rgb), 0.1) !important;
}

.bg-success.bg-opacity-10 {
  background-color: rgba(var(--bs-success-rgb), 0.1) !important;
}

.bg-info.bg-opacity-10 {
  background-color: rgba(var(--bs-info-rgb), 0.1) !important;
}
</style>
