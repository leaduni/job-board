<template>
  <div :class="!isMobile ? 'w-72 bg-[#121225] border-2 border-[#b62667] rounded-2xl p-6 shadow-lg' : 'p-6'">
    <div v-if="!isMobile" class="flex items-center justify-between mb-5">
      <h2 class="text-white font-bold text-lg flex items-center gap-2">
        <svg class="w-5 h-5 text-[#b62667]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
      </h2>
      <button @click="clearAllFilters" class="text-sm text-[#b62667] underline hover:no-underline focus:outline-none">Limpiar todo</button>
    </div>

    <!-- Modalidad -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">MODALIDAD</h3>
      <ul class="space-y-2">
        <li v-for="(modalidad, i) in modalidades" :key="i" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="modalidad" v-model="selectedModalidades"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#b62667] checked:bg-[#b62667] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#b62667]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ modalidad }}</span>
          </label>
          <span class="text-slate-500 ml-auto text-sm">12</span>
        </li>
      </ul>
    </section>

    <!-- Tipo de Contrato -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">TIPO DE CONTRATO</h3>
      <ul class="space-y-2">
        <li v-for="(tipo, i) in tiposContrato" :key="i" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="tipo" v-model="selectedTiposContrato"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#b62667] checked:bg-[#b62667] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#b62667]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ tipo }}</span>
          </label>
          <span class="text-slate-500 ml-auto text-sm">8</span>
        </li>
      </ul>
    </section>
    
    <!-- Nivel de Experiencia -->
    <section class="py-4">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">NIVEL DE EXPERIENCIA</h3>
      <ul class="space-y-2">
        <li v-for="(nivel, i) in nivelesExperiencia" :key="i" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="nivel" v-model="selectedNivelesExperiencia"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#b62667] checked:bg-[#b62667] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#b62667]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ nivel }}</span>
          </label>
          <span class="text-slate-500 ml-auto text-sm">5</span>
        </li>
      </ul>
    </section>

    <!-- CTA Box -->
    <div v-if="!isMobile" class="mt-6 p-5 rounded-xl bg-gradient-to-br from-pink-900/20 to-purple-900/10 border border-[#b62667] text-center">
      <h4 class="font-bold text-white mb-1 text-base">¡Sube tu CV!</h4>
      <p class="text-sm text-gray-400 mb-4">Las empresas buscan perfiles como el tuyo.</p>
      <button class="w-full bg-gradient-to-r from-[#a0218b] to-[#b62667] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#b62667]">
        Actualizar Perfil
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineExpose } from 'vue';

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['filter-change']);

const modalidades = [
  'Presencial',
  'Remoto',
  'Híbrido',
];

const tiposContrato = [
  'Prácticas Pre-profesionales',
  'Prácticas Profesionales',
  'Tiempo Completo',
  'Medio Tiempo',
  'Freelance',
];

const nivelesExperiencia = [
  'Sin experiencia',
  'Menos de 1 año',
  '1-3 años',
  'Más de 3 años',
];

const selectedModalidades = ref([]);
const selectedTiposContrato = ref([]);
const selectedNivelesExperiencia = ref([]);

const clearAllFilters = () => {
  selectedModalidades.value = [];
  selectedTiposContrato.value = [];
  selectedNivelesExperiencia.value = [];
};

defineExpose({
  clearAllFilters
});

watch([selectedModalidades, selectedTiposContrato, selectedNivelesExperiencia], () => {
  emit('filter-change', {
    modalidades: selectedModalidades.value,
    tiposContrato: selectedTiposContrato.value,
    nivelesExperiencia: selectedNivelesExperiencia.value,
  });
}, { deep: true });
</script>
