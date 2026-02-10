<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() => {
  if (props.course.imagen?.url) {
    return `${import.meta.env.VITE_CMS_API_URL}${props.course.imagen.url}`;
  }
  return 'https://via.placeholder.com/400x225?text=Curso';
});

const badgeClass = computed(() => {
  return props.course.esGratuito
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
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
    class="group flex flex-col h-full bg-[#17102C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#b62667] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[#b62667]/20 hover:-translate-y-1"
  >
    <!-- Image Container -->
    <div class="relative h-44 overflow-hidden bg-[#2a1630]">
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
        class="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md"
        :class="badgeClass"
      >
        {{ badgeText }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-grow p-5">
      <!-- Provider -->
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[11px] font-bold text-[#b62667] uppercase tracking-widest bg-[#b62667]/10 px-2 py-0.5 rounded">
          {{ course.proveedor }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-white leading-tight mb-3 line-clamp-2 group-hover:text-[#ff5a9e] transition-colors">
        {{ course.titulo }}
      </h3>

      <!-- Metadata -->
      <div class="mt-auto flex items-center gap-4 text-xs text-gray-400 border-t border-white/5 pt-4">
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
        <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300 text-[#b62667]">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </a>
</template>
