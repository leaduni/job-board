<template>
  <aside class="w-full bg-[#121225] border-2 border-[#a6249d] rounded-2xl p-6 shadow-lg h-fit">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-[#a6249d] rounded-full"></div>
        <h2 class="text-white font-bold text-lg">Filtros de Capacitación</h2>
      </div>
    </div>

    <form @submit.prevent="applyFilters">
      <div class="space-y-4">
        <!-- Rol Objetivo Dropdown -->
        <section class="py-4 border-t border-gray-800">
          <h3 class="text-white/90 font-bold text-sm tracking-wider mb-4">TU OBJETIVO PROFESIONAL</h3>
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              type="button"
              class="w-full flex items-center justify-between bg-[#1e1e3a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50"
            >
              <span>{{ selectedRoleName }}</span>
              <svg :class="['w-5 h-5 text-[#d93340] transition-transform duration-300', isOpen && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="isOpen" class="absolute z-10 mt-2 w-full bg-[#1e1e3a] border border-[#a6249d] rounded-md shadow-lg">
                <ul class="py-1">
                  <li
                    v-for="role in roles"
                    :key="role.id"
                    @click="selectRole(role.id)"
                    class="px-4 py-2 text-sm text-white/80 hover:bg-[#a6249d]/20 cursor-pointer transition-colors"
                  >
                    {{ role.name }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </section>

        <!-- Hard Skills -->
        <section v-if="filters.role && currentSkills.length" class="py-4 border-t border-gray-800">
          <h3 class="text-white/90 font-bold text-sm tracking-wider mb-4">HARD SKILLS RECOMENDADAS</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="skill in currentSkills"
              :key="skill"
              @click="toggleSkill(skill)"
              type="button"
              :class="[
                'px-3 py-1 text-sm rounded-full transition-colors',
                filters.skills.includes(skill)
                  ? 'bg-[#a6249d] text-white font-semibold'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-white/80'
              ]"
            >
              {{ skill }}
            </button>
          </div>
        </section>

        <!-- Inversión -->
        <section class="py-4 border-t border-gray-800">
          <h3 class="text-white/90 font-bold text-sm tracking-wider mb-3">INVERSIÓN</h3>
          <div class="flex bg-gray-700/30 rounded-lg p-1">
            <button
              v-for="option in investmentOptions"
              :key="option.value"
              @click="filters.investment = option.value"
              type="button"
              :class="[
                'w-1/2 py-1.5 text-sm font-semibold rounded-md transition-colors',
                filters.investment === option.value ? 'bg-[#a6249d] text-white' : 'text-white/60 hover:text-white'
              ]"
            >
              {{ option.label }}
            </button>
          </div>
        </section>
        
        <!-- Valor Curricular -->
        <section class="py-4 border-t border-gray-800">
           <label class="flex items-center cursor-pointer group w-fit">
              <input type="checkbox" v-model="filters.certificate" class="sr-only peer">
              <div class="w-5 h-5 bg-gray-700/50 rounded-md flex-shrink-0 flex items-center justify-center ring-1 ring-transparent peer-focus:ring-[#a6249d]/50 peer-checked:bg-[#a6249d] peer-checked:border-transparent">
                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="ml-3 text-white/70 group-hover:text-white transition-colors font-medium">Con Certificado</span>
            </label>
        </section>
      </div>

      <!-- Reset Button -->
      <div class="mt-6 border-t border-gray-800 pt-5">
        <button @click="clearFilters" type="button" class="text-sm text-white/50 underline hover:text-white transition-colors w-full text-center">
          Limpiar filtros
        </button>
      </div>
    </form>
  </aside>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['filter-change']);

// --- STATE ---
const isOpen = ref(false);
const dropdownRef = ref(null);

const roles = [
  { id: 'backend', name: 'Backend' },
  { id: 'data', name: 'Analista de Datos' },
  { id: 'logistica', name: 'Logística' },
  { id: 'consultor', name: 'Consultor SAP' },
];

const roleSkills = {
  backend: ['Java', 'Node.js', 'SQL', 'Python', 'Go'],
  data: ['Python', 'Power BI', 'SQL', 'Excel Avanzado', 'R'],
  logistica: ['SAP', 'Excel Avanzado', 'Supply Chain', 'Power BI'],
  consultor: ['SAP', 'SQL', 'Gestión de Proyectos'],
};

const investmentOptions = [
  { label: 'Gratis', value: 'free' },
  { label: 'De Pago', value: 'paid' },
];

const initialFilters = {
  role: null,
  skills: [],
  investment: 'paid',
  certificate: false,
};

const filters = ref({ ...initialFilters, skills: [] });


// --- COMPUTED ---
const currentSkills = computed(() => {
  return filters.value.role ? roleSkills[filters.value.role] : [];
});

const selectedRoleName = computed(() => {
  if (!filters.value.role) return 'Seleccionar rol';
  return roles.find(r => r.id === filters.value.role)?.name || 'Seleccionar rol';
});


// --- METHODS ---
function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectRole(roleId) {
  filters.value.role = roleId;
  filters.value.skills = []; // Reset skills when role changes
  isOpen.value = false;
}

function toggleSkill(skill) {
  const index = filters.value.skills.indexOf(skill);
  if (index > -1) {
    filters.value.skills.splice(index, 1);
  } else {
    filters.value.skills.push(skill);
  }
}

function clearFilters() {
  filters.value = { ...initialFilters, skills: [] };
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
}


// --- LIFECYCLE & WATCHERS ---
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(filters, (newFilters) => {
  emit('filter-change', newFilters);
}, { deep: true });
</script>