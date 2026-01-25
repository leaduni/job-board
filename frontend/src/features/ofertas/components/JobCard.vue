<template>
  <article class="w-full bg-[rgba(9,9,42,0.6)] border-2 border-[#b62667] rounded-[12px] p-[20px] flex flex-col justify-between h-full shadow-[0_8px_26px_rgba(0,0,0,0.6)] text-white/95 transition-transform transition-shadow duration-150 ease-in-out min-h-0 hover:-translate-y-[8px] hover:border-[#b62667] hover:shadow-[0_40px_100px_rgba(6,6,28,0.76),_0_12px_40px_rgba(0,0,0,0.7)]">
    <div class="flex flex-col gap-[12px]">
      <!-- Header: título y empresa a la izquierda, badge de estado a la derecha -->
      <div class="flex items-start justify-between gap-[12px] mb-[8px]">
        <div class="flex-1">
          <h3 class="font-['League_Spartan',sans-serif] text-[18px] mb-[4px] text-white/95">{{ oferta.titulo }}</h3>
          <p class="text-[13px] text-white/45">{{ oferta.company?.nombre_comercial }}</p>
        </div>

        <!-- Estado: alineado a la derecha del header -->
        <div class="flex items-start ml-[12px]">
          <span v-if="oferta.estado" class="text-[12px] font-bold inline-block" :class="estadoClasses">
            {{ oferta.estado }}
          </span>
        </div>
      </div>

      <!-- Meta info -->
      <div class="flex gap-[12px] items-center flex-wrap my-[8px] text-white/45 text-[13px]">
        <div class="inline-flex items-center gap-[6px]">
          <span class="inline-flex items-center justify-center px-[12px] py-[6px] rounded-full bg-white/2 border border-[#b62667]/3 text-white/45 text-[12px] leading-[1] mr-[8px] whitespace-nowrap transition-colors duration-150 ease-out transition-transform duration-100 ease-out hover:bg-white/4 hover:-translate-y-[1px]">{{ getDisplayLabel(oferta.modalidad) }}</span>
        </div>
        <div class="inline-flex items-center gap-[6px]">
          <span class="inline-flex items-center justify-center px-[12px] py-[6px] rounded-full bg-white/2 border border-[#b62667]/3 text-white/45 text-[12px] leading-[1] mr-[8px] whitespace-nowrap transition-colors duration-150 ease-out transition-transform duration-100 ease-out hover:bg-white/4 hover:-translate-y-[1px]">{{ getDisplayLabel(oferta.nivel_experiencia) }}</span>
        </div>
      </div>

      <!-- Descripción -->
      <p class="text-white/45 mb-[8px] leading-[1.4]">
        {{ descripcionCorta }}
      </p>
    </div>

    <!-- Acción -->
    <router-link :to="`/ofertas/${oferta.id}`" class="card-action mt-4">
      <button class="w-full px-[12px] py-[10px] rounded-[10px] bg-gradient-to-r from-[#a0218b] to-[#b62667] text-white font-bold border-none cursor-pointer shadow-[0_6px_18px_rgba(182,38,103,0.18)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(182,38,103,0.2)]">Ver detalles</button>
    </router-link>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  oferta: {
    type: Object,
    required: true,
  },
});

const LABELS_MAP = {
  // Modalidades
  'presencial': 'Presencial',
  'remoto': 'Remoto',
  'hibrido': 'Híbrido',

  // Tipos de Contrato
  'practicas_preprofesionales': 'Prácticas Pre-profesionales',
  'practicas_profesionales': 'Prácticas Profesionales',
  'tiempo_completo': 'Tiempo Completo',
  'medio_tiempo': 'Medio Tiempo',
  'freelance': 'Freelance',

  // Niveles de Experiencia
  'sin_experiencia': 'Sin experiencia',
  'menos_1_anio': 'Menos de 1 año',
  'menos_de_1_ano': 'Menos de 1 año', // Keep existing for robustness
  '1_3_anios': '1 - 3 años',
  '1_3_anos': '1 - 3 años', // Keep existing for robustness
  'mas_3_anios': 'Más de 3 años',
  'mas_de_3_anos': 'Más de 3 años', // Keep existing for robustness
};

const getDisplayLabel = (key) => {
  if (!key) return '';
  const mapped = LABELS_MAP[key.toLowerCase()];
  return mapped || key.replace(/_/g, ' ');
};

const descripcionCorta = computed(() => {
  return (
    props.oferta?.descripcion?.root?.children?.[0]?.children?.[0]?.text ||
    'Sin descripción disponible'
  );
});

const estadoClasses = computed(() => {
  switch (props.oferta.estado) {
    case 'activa':
      return 'px-[10px] py-[6px] rounded-[10px] bg-[#06322b]/30 text-[#16c784] border border-[#16c784] shadow-[inset_0_1px_0_rgba(255,255,255,0.02),_0_8px_18px_rgba(3,45,36,0.45)]';
    case 'cerrada':
      return 'px-[10px] py-[4px] rounded-full bg-gradient-to-r from-[#6b7280] to-[#4b5563] text-[#111827] shadow-none';
    default:
      return 'px-[10px] py-[4px] rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white shadow-none';
  }
});
</script>