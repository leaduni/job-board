<template>
  <article class="group h-full flex flex-col bg-[#1A0B2E]/90 backdrop-blur-lg rounded-2xl border border-[#a6249d]/30 hover:border-[#a6249d]/50 p-6 gap-4 shadow-lg text-white/95 transition-all duration-300 min-h-0 hover:-translate-y-1 hover:shadow-xl">
    <!-- Fila superior: logo+título a la izquierda, estado (ACTIVA) a la derecha -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-start gap-3 min-w-0 flex-1">
        <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white/80 font-bold text-xl uppercase flex-shrink-0">
          {{ oferta.company?.nombre_comercial?.[0] || 'E' }}
        </div>
        <div class="min-w-0 flex-1">
          <h3 class="font-['League_Spartan',sans-serif] text-lg font-bold mb-1 text-white/95 line-clamp-2 leading-tight group-hover:text-[#ff6ec7] transition-colors" :title="oferta.titulo">
            {{ oferta.titulo }}
          </h3>
          <p class="text-sm text-white/60 truncate">{{ oferta.company?.nombre_comercial || 'Empresa Confidencial' }}</p>
        </div>
      </div>
      <span v-if="oferta.estado" class="flex-shrink-0 text-[10px] uppercase font-bold" :class="estadoClasses">{{ oferta.estado }}</span>
    </div>

    <!-- Tags: modalidad y nivel_experiencia al costado, mismo color y alineados -->
    <div class="flex gap-2 flex-wrap items-center">
      <span v-if="oferta.modalidad" class="inline-flex items-center justify-center px-[10px] py-[4px] rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] whitespace-nowrap leading-none">
        {{ getDisplayLabel(oferta.modalidad) }}
      </span>
      <span v-if="oferta.nivel_experiencia" class="inline-flex items-center justify-center px-[10px] py-[4px] rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] whitespace-nowrap leading-none">
        {{ getDisplayLabel(oferta.nivel_experiencia) }}
      </span>
    </div>

    <!-- Descripción (Truncada) -->
    <div class="flex-grow">
      <p class="text-white/50 text-sm leading-relaxed line-clamp-3">
        {{ descripcionCorta }}
      </p>
    </div>

    <!-- Footer -->
    <div class="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
      <span class="text-sm font-medium text-white/90 capitalize">{{ oferta.tipo_contrato ? getDisplayLabel(oferta.tipo_contrato) : 'Ver detalles' }}</span>
      <router-link :to="`/ofertas/${oferta.id}`" class="shrink-0">
        <button class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white font-bold text-sm shadow-lg shadow-[#a6249d]/20 hover:shadow-[#a6249d]/30 transition-all duration-200">
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
