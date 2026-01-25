<!-- OfferSummaryCard.vue -->
<template>
  <aside class="p-[18px] px-[20px] rounded-[12px] bg-gradient-to-t from-[rgba(24,8,40,0.55)] to-[rgba(10,8,35,0.65)] border-2 border-[#b62667]">
    <h2 class="font-heading text-2xl mb-[12px] text-[rgba(255,255,255,0.95)]">Resumen de la oferta</h2>

    <ul>
      <li class="flex justify-between items-center py-[6px]">
        <span class="text-[13px] text-[rgba(255,255,255,0.45)]">Salario mensual</span>
        <strong class="text-[13px] text-[rgba(255,255,255,0.95)] font-semibold">{{ salarioTexto }}</strong>
      </li>
      <li class="flex justify-between items-center py-[6px]">
        <span class="text-[13px] text-[rgba(255,255,255,0.45)]">Experiencia</span>
        <strong class="text-[13px] text-[rgba(255,255,255,0.95)] font-semibold">{{ experienciaTexto }}</strong>
      </li>
      <li class="flex justify-between items-center py-[6px]">
        <span class="text-[13px] text-[rgba(255,255,255,0.45)]">Ubicación</span>
        <strong class="text-[13px] text-[rgba(255,255,255,0.95)] font-semibold">{{ ubicacionTexto }}</strong>
      </li>
      <li class="flex justify-between items-center py-[6px]">
        <span class="text-[13px] text-[rgba(255,255,255,0.45)]">Vacantes</span>
        <strong class="text-[13px] text-[rgba(255,255,255,0.95)] font-semibold">{{ vacantesTexto }}</strong>
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
  const valor = props.oferta?.nivel_experiencia;
  if (!valor) return 'No especificado';

  // Diccionario de traducción para consistencia total
  const map = {
    'sin_experiencia': 'Sin experiencia',
    'menos_1_anio': 'Menos de 1 año',
    '1_3_anios': '1 - 3 años',
    '3_5_anios': '3 - 5 años',
    'mas_3_anios': 'Más de 3 años',
    'mas_5_anios': 'Más de 5 años'
  };

  // Si el valor no está en el mapa, limpiamos los guiones bajos por seguridad
  return map[valor] || valor.replace(/_/g, ' ');
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
