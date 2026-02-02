<template>
  <div class="payslip-container">
    <h1>Payslip</h1>

    <div class="payslip-box">
      <p><strong>Employee:</strong> {{ payslip.name }}</p>
      <p><strong>Gross Pay:</strong> R {{ payslip.grossPay }}</p>
      <p><strong>Overtime Pay:</strong> R {{ payslip.overtimePay }}</p>
      <p><strong>Deductions:</strong> R {{ payslip.totalDeductions }}</p>

      <h2>Net Pay: R {{ payslip.netPay }}</h2>
    </div>

    <button @click="downloadPDF">Download PDF</button>
  </div>
</template>

<script setup>
import { jsPDF } from "jspdf";
import { useRoute } from "vue-router";

const route = useRoute();

const payslip = {
  name: route.query.name,
  grossPay: Number(route.query.grossPay),
  overtimePay: Number(route.query.overtimePay),
  pension: Number(route.query.pension),
  netPay: Number(route.query.netPay),
};

function downloadPDF() {
  const doc = new jsPDF();

  doc.text(`Payslip for ${payslip.name}`, 10, 10);
  doc.text(`Gross Pay: R ${payslip.grossPay}`, 10, 20);
  doc.text(`Overtime Pay: R ${payslip.overtimePay}`, 10, 30);
  doc.text(`Pension (1%): R ${payslip.pension}`, 10, 40);
  doc.text(`Net Pay: R ${payslip.netPay}`, 10, 50);

  doc.save("payslip.pdf");
}
</script>


<style>
.payslip-container {
  max-width: 500px;
  margin: auto;
}

.payslip-box {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
}
</style>
