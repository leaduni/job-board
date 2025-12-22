<!-- OfferSummaryCard.vue -->
<template>
  <aside class="offer-summary-card">
    <h4 class="summary-title">Resumen de la oferta</h4>

    <ul class="summary-list">
      <li>
        <span>Salario mensual</span>
        <strong>No especificado</strong>
      </li>
      <li>
        <span>Experiencia</span>
        <strong>{{ oferta.nivel_experiencia }}</strong>
      </li>
      <li>
        <span>Ubicación</span>
        <strong>Remoto / No especificado</strong>
      </li>
      <li>
        <span>Vacantes</span>
        <strong>No especificado</strong>
      </li>
    </ul>
  </aside>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
  oferta: { type: Object, required: true },
});

const salarioTexto = computed(() => {
  const c = props.oferta?.compensacion;
  if (!c || c.mostrar_salario === false) return 'No especificado';
  const min = c.salario_min;
  const max = c.salario_max;
  if (min && max) return `$${min} - $${max}`;
  if (min) return `Desde $${min}`;
  if (max) return `Hasta $${max}`;
  return 'No especificado';
});

const experienciaTexto = computed(() => {
  return props.oferta?.nivel_experiencia || 'No especificado';
});

const ubicacionTexto = computed(() => {
  const u = props.oferta?.ubicacion;
  const dep = u?.departamento;
  const dist = u?.distrito;
  if (dep && dist) return `${dist}, ${dep}`;
  if (dep) return dep;
  if (dist) return dist;
  return 'Remoto / No especificado';
});

const vacantesTexto = computed(() => {
  // No existe en tu JSON actual
  return 'No especificado';
});
</script>
