
<template>
  <div>
    <h1>Employees</h1>

    <EmployeeDetails 
      :employees="employees" 
      @select="goToEmployee"
      @delete="deleteEmployee"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import EmployeeDetails from "@/views/EmployeeDetails.vue"
import employeesData from "@/data/employees.js"
import { useRouter } from "vue-router"

const router = useRouter()
const employees = ref([...employeesData])

function goToEmployee(emp) {
  router.push(`/employees/${emp.employeeId}`)
}

function deleteEmployee(id) {
  employees.value = employees.value.filter(e => e.employeeId !== id)
}
</script>
