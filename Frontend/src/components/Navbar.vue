<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <i class="bi bi-briefcase-fill me-2"></i> <strong>ModernTechHR</strong>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              to="/dashboard"
              class="nav-link"
              active-class="active"
              exact-active-class="active"
            >
              <i class="bi bi-speedometer2 me-1"></i>Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/employees" class="nav-link" active-class="active">
              <i class="bi bi-people me-1"></i>Employees
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/timeoff" class="nav-link" active-class="active">
              <i class="bi bi-calendar-check me-1"></i>Time Off
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/attendance"
              class="nav-link"
              active-class="active"
            >
              <i class="bi bi-calendar3 me-1"></i>Attendance
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/hr-payroll" class="nav-link" active-class="active">
              <i class="bi bi-cash-coin me-1"></i>Payroll
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default { name: "Navbar" };
</script>
<style scoped>
.navbar {
  padding: 1rem 0;
}
.navbar-brand {
  font-size: 1.25rem;
  font-weight: 600;
}
.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 0 0.25rem;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}
.navbar-toggler {
  border: none;
}
.navbar-toggler:focus {
  box-shadow: none;
}
@media (max-width: 991px) {
  .navbar-nav {
    margin-top: 1rem;
  }
  .nav-link {
    margin: 0.25rem 0;
  }
}
</style>
 