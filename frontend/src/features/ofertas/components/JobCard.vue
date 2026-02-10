<template>
  <article class="h-full bg-[rgba(9,9,42,0.6)] border-2 border-[#b62667] rounded-[12px] p-[20px] flex flex-col gap-[12px] shadow-[0_8px_26px_rgba(0,0,0,0.6)] text-white/95 transition-transform transition-shadow duration-150 ease-in-out min-h-0 hover:-translate-y-[8px] hover:border-[#b62667] hover:shadow-[0_40px_100px_rgba(6,6,28,0.76),_0_12px_40px_rgba(0,0,0,0.7)]">
    
    <!-- Header -->
    <div class="flex items-start justify-between gap-[12px]">
      <div class="flex-1 min-w-0">
        <!-- Title with line clamp -->
        <h3 class="font-['League_Spartan',sans-serif] text-[18px] mb-[4px] text-white/95 line-clamp-2 leading-tight min-h-[44px]" :title="oferta.titulo">
          {{ oferta.titulo }}
        </h3>
        <p class="text-[13px] text-white/45 truncate">{{ oferta.company?.nombre_comercial || 'Empresa Confidencial' }}</p>
      </div>

      <!-- Badge Estado -->
      <div class="flex-shrink-0 ml-[8px]">
        <span v-if="oferta.estado" class="text-[10px] uppercase font-bold" :class="estadoClasses">
          {{ oferta.estado }}
        </span>
      </div>
    </div>

    <!-- Tags -->
    <div class="flex gap-[8px] items-center flex-wrap text-white/45 text-[13px]">
      <span v-if="oferta.modalidad" class="inline-flex items-center justify-center px-[10px] py-[4px] rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] whitespace-nowrap">
        {{ getDisplayLabel(oferta.modalidad) }}
      </span>
      <span v-if="oferta.nivel_experiencia" class="inline-flex items-center justify-center px-[10px] py-[4px] rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] whitespace-nowrap">
        {{ getDisplayLabel(oferta.nivel_experiencia) }}
      </span>
    </div>

    <!-- Descripción (Truncada) -->
    <div class="flex-grow">
      <p class="text-white/50 text-[13px] leading-[1.5] line-clamp-3">
        {{ descripcionCorta }}
      </p>
    </div>

    <!-- Footer Action -->
    <div class="mt-auto pt-2">
      <router-link :to="`/ofertas/${oferta.id}`" class="block w-full">
        <button class="w-full px-[12px] py-[10px] rounded-[10px] bg-gradient-to-r from-[#a0218b] to-[#b62667] text-white font-bold text-sm shadow-[0_6px_18px_rgba(182,38,103,0.18)] hover:shadow-[0_10px_24px_rgba(182,38,103,0.3)] transition-all duration-200">
          Ver detalles
        </button>
      </router-link>
    </div>
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
