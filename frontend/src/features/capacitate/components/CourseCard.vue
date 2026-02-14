<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() => {
  // 1. Prioridad: Logos locales de marcas conocidas
  if (props.course.proveedor) {
    const p = props.course.proveedor.toLowerCase().trim();
    
    if (p.includes('platzi')) return '/platzi.png';
    if (p.includes('edteam') || p.includes('ed team')) return '/edteam.png';
    if (p.includes('google')) return '/google.png';
    if (p.includes('fazt')) return '/Fazt.jpg';
    if (p.includes('lead uni') || p.includes('lead')) return '/icono-lead.png';
  }

  // 2. Imagen de la API (si existe)
  if (props.course.imagen?.url) {
    return `${import.meta.env.VITE_CMS_API_URL}${props.course.imagen.url}`;
  }

  // 3. Fallback genérico local
  return '/generico.jpg';
});

const badgeClass = computed(() => {
  return props.course.esGratuito
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-[#a6249d]/10 text-[#ff6ec7] border-[#a6249d]/30';
});

const badgeText = computed(() => {
  return props.course.esGratuito ? 'Gratis' : 'Pago';
});
</script>

<template>
  <a
    :href="course.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex flex-row sm:flex-col h-auto sm:h-full min-w-0 bg-[#1A0B2E]/90 backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-[#a6249d]/30 hover:border-[#a6249d]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#a6249d]/20 hover:-translate-y-1 shadow-lg"
  >
    <!-- Imagen: horizontal en móvil portrait, vertical en sm+ -->
    <div class="relative w-24 sm:w-full h-24 sm:h-36 lg:h-44 flex-shrink-0 overflow-hidden bg-[#2a1630]">
      <img
        :src="imageUrl"
        :alt="course.titulo"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#17102C] to-transparent opacity-60"></div>

      <!-- Price/Status Badge -->
      <div
        class="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border backdrop-blur-md"
        :class="badgeClass"
      >
        {{ badgeText }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-grow p-3 sm:p-4 lg:p-5 min-w-0 justify-center">
      <!-- Provider -->
      <div class="flex items-center gap-2 mb-1 sm:mb-2">
        <span class="text-[10px] sm:text-[11px] font-bold text-[#d93340] uppercase tracking-widest bg-[#a6249d]/10 px-1.5 sm:px-2 py-0.5 rounded truncate">
          {{ course.proveedor }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight mb-1 sm:mb-3 line-clamp-2 group-hover:text-[#ff6ec7] transition-colors">
        {{ course.titulo }}
      </h3>

      <!-- Metadata -->
      <div class="sm:mt-auto flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-400 border-t border-white/5 pt-1.5 sm:pt-4">
        <div v-if="course.duracionHoras" class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ course.duracionHoras }}h
        </div>
        
        <div v-if="course.nivel" class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ course.nivel }}
        </div>
        
        <!-- Arrow Icon (Visual cue for external link) -->
        <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300 text-[#d93340]">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </a>
</template>
