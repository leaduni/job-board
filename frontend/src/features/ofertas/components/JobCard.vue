<template>

  <article class="w-full bg-[rgba(9,9,42,0.6)] border-2 border-[#b62667] rounded-[12px] p-[20px] flex flex-col justify-between h-full shadow-[0_8px_26px_rgba(0,0,0,0.6)] text-white/95 transition-transform duration-150 ease-in-out min-h-0 hover:-translate-y-[8px] hover:border-[#b62667] hover:shadow-[0_40px_100px_rgba(6,6,28,0.76),_0_12px_40px_rgba(0,0,0,0.7)]">
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
          <span class="inline-flex items-center justify-center px-[12px] py-[6px] rounded-full bg-white/2 border border-[#b62667]/3 text-white/45 text-[12px] leading-[1] mr-[8px] whitespace-nowrap transition-colors duration-150 ease-out hover:bg-white/4 hover:-translate-y-[1px]">{{ getDisplayLabel(oferta.modalidad) }}</span>
        </div>
        <div class="inline-flex items-center gap-[6px]">
          <span class="inline-flex items-center justify-center px-[12px] py-[6px] rounded-full bg-white/2 border border-[#b62667]/3 text-white/45 text-[12px] leading-[1] mr-[8px] whitespace-nowrap transition-colors duration-150 ease-out hover:bg-white/4 hover:-translate-y-[1px]">{{ getDisplayLabel(oferta.nivel_experiencia) }}</span>
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
  'practicas_pre': 'Prácticas Pre',
  'practicas_pro': 'Prácticas Pro',
  'tiempo_completo': 'Full Time',
  'medio_tiempo': 'Part Time',
  'freelance': 'Freelance',

  // Niveles de Experiencia
  'sin_experiencia': 'Sin experiencia',
  'menos_1_anio': '< 1 año',
  '1_3_anios': '1-3 años',
  'mas_3_anios': '> 3 años',
};

const getDisplayLabel = (key) => {
  if (!key) return '';
  // Intenta buscar en el mapa, si no, formatea el string (quita guiones bajos y capitaliza)
  const mapped = LABELS_MAP[key.toLowerCase()];
  if (mapped) return mapped;
  
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Extracción segura de texto para descripción
const descripcionCorta = computed(() => {
  const desc = props.oferta.descripcion;
  
  // Caso 1: String directo
  if (typeof desc === 'string') return desc;
  
  // Caso 2: Rich Text de Payload CMS
  if (desc?.root?.children) {
    try {
      // Intentamos extraer el texto del primer párrafo que tenga contenido
      const nodes = desc.root.children;
      for (const node of nodes) {
        if (node.children) {
          const text = node.children.map(c => c.text).join(' ').trim();
          if (text) return text;
        }
      }
    } catch (e) {
      console.warn('Error parseando rich text', e);
    }
  }
  
  return 'Sin descripción disponible';
});

const estadoClasses = computed(() => {
  switch (props.oferta.estado) {
    case 'activa':
      return 'px-[8px] py-[4px] rounded-[6px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'cerrada':
      return 'px-[8px] py-[4px] rounded-[6px] bg-gray-500/10 text-gray-400 border border-gray-500/20';
    default:
      return 'px-[8px] py-[4px] rounded-[6px] bg-purple-500/10 text-purple-400 border border-purple-500/20';
  }
});
</script>
