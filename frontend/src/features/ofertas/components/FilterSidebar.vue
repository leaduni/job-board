<template>
  <aside class="w-full lg:w-72 h-full lg:h-auto overflow-y-auto lg:overflow-visible bg-[#121225] border-2 border-[#a6249d] rounded-none lg:rounded-2xl p-4 sm:p-6 shadow-lg">
    <div class="flex items-center justify-between mb-5 sticky top-0 bg-[#121225] pt-2 pb-2 -mt-2 z-10 lg:static lg:pt-0 lg:pb-0 lg:mt-0">
      <h2 class="text-white font-bold text-base sm:text-lg flex items-center gap-2">
        <svg class="w-5 h-5 text-[#d93340] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
      </h2>
      <div class="flex items-center gap-2">
        <button @click="clearAllFilters" class="text-sm text-[#d93340] underline hover:no-underline focus:outline-none">Limpiar todo</button>
        <button
          v-if="showClose"
          type="button"
          @click="$emit('close')"
          class="lg:hidden p-2 -m-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Cerrar filtros"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Modalidad -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">MODALIDAD</h3>
      <ul class="space-y-2">
        <li v-for="(item, i) in modalidades" :key="i" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="item.value" v-model="selectedModalidades"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#a6249d] checked:bg-[#a6249d] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#a6249d]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </section>

    <!-- Tipo de Contrato -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">TIPO DE CONTRATO</h3>
      <ul class="space-y-2">
        <li v-for="(item, i) in tiposContrato" :key="i" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="item.value" v-model="selectedTiposContrato"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#a6249d] checked:bg-[#a6249d] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#a6249d]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </section>
    
    <!-- Afinidad (solo si logueado y tiene skills) -->
    <section v-if="showAffinity" class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">AFINIDAD CON TU PERFIL</h3>
      <p class="text-gray-400 text-xs mb-3">Ofertas que coinciden con tus skills</p>
      <ul class="space-y-2">
        <li v-for="opt in affinityOptions" :key="opt.value" class="flex items-center gap-3">
          <label
            class="flex items-center gap-3 cursor-pointer group flex-1"
            @click.prevent="toggleAffinity(opt.value)"
          >
            <input
              type="radio"
              :value="opt.value"
              v-model="selectedAffinity"
              class="w-4 h-4 accent-[#a6249d] focus:ring-[#a6249d] pointer-events-none"
            />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ opt.label }}</span>
          </label>
        </li>
      </ul>
    </section>

    <!-- Nivel de Experiencia -->
    <section class="py-4">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">NIVEL DE EXPERIENCIA</h3>
      <ul class="space-y-2">
        <li v-for="(item, i) in nivelesExperiencia" :key="i" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="item.value" v-model="selectedNivelesExperiencia"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#a6249d] checked:bg-[#a6249d] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#a6249d]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs">{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </section>

    <!-- CTA Box -->
    <div class="mt-6 p-5 rounded-xl bg-gradient-to-br from-pink-900/20 to-purple-900/10 border border-[#a6249d] text-center">
      <h4 class="font-bold text-white mb-1 text-base">¡Sube tu CV!</h4>
      <p class="text-sm text-gray-400 mb-4">Las empresas buscan perfiles como el tuyo.</p>
      <button class="w-full bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#a6249d]">
        Actualizar Perfil
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({}),
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  showAffinity: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['filter-change', 'close']);

// Mapa de valores: [Label legible, Valor backend]
const modalidades = [
  { label: 'Presencial', value: 'presencial' },
  { label: 'Remoto', value: 'remoto' },
  { label: 'Híbrido', value: 'hibrido' },
];

const tiposContrato = [
  { label: 'Prácticas Pre-profesionales', value: 'practicas_pre' },
  { label: 'Prácticas Profesionales', value: 'practicas_pro' },
  { label: 'Tiempo Completo', value: 'tiempo_completo' },
  { label: 'Medio Tiempo', value: 'medio_tiempo' },
  { label: 'Freelance', value: 'freelance' },
];

const nivelesExperiencia = [
  { label: 'Sin experiencia', value: 'sin_experiencia' },
  { label: 'Menos de 1 año', value: 'menos_1_anio' },
  { label: '1-3 años', value: '1_3_anios' },
  { label: 'Más de 3 años', value: 'mas_3_anios' },
];

const selectedModalidades = ref([]);
const selectedTiposContrato = ref([]);
const selectedNivelesExperiencia = ref([]);
const selectedAffinity = ref('');

const affinityOptions = [
  { label: 'Sin filtro', value: '' },
  { label: 'Al menos 1 skill', value: '1' },
  { label: 'Al menos 2 skills', value: '2' },
  { label: 'Al menos 3 skills', value: '3' },
  { label: 'Todas las skills', value: 'all' },
];

function toggleAffinity(value) {
  if (selectedAffinity.value === value) {
    selectedAffinity.value = '';
  } else {
    selectedAffinity.value = value;
  }
}

const clearAllFilters = () => {
  selectedModalidades.value = [];
  selectedTiposContrato.value = [];
  selectedNivelesExperiencia.value = [];
  selectedAffinity.value = '';
};

onMounted(() => {
  const init = props.initialFilters;
  if (init.modalidades?.length) selectedModalidades.value = [...init.modalidades];
  if (init.tiposContrato?.length) selectedTiposContrato.value = [...init.tiposContrato];
  if (init.nivelesExperiencia?.length) selectedNivelesExperiencia.value = [...init.nivelesExperiencia];
  if (init.affinityMin != null) selectedAffinity.value = init.affinityMin;
});

watch([selectedModalidades, selectedTiposContrato, selectedNivelesExperiencia, selectedAffinity], () => {
  emit('filter-change', {
    modalidades: selectedModalidades.value,
    tiposContrato: selectedTiposContrato.value,
    nivelesExperiencia: selectedNivelesExperiencia.value,
    affinityMin: selectedAffinity.value,
  });
}, { deep: true });
</script>