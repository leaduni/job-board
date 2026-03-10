<script setup>
import CourseCard from '@/features/capacitate/components/CourseCard.vue';
import CapacitateFilterSidebar from '@/features/capacitate/components/CapacitateFilterSidebar.vue';
import SearchBar from '@/features/ofertas/components/SearchBar.vue';
import { ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { cmsApi } from '@/services/cmsApi';

const route = useRoute();

// Estado
const courses = ref([]);
const loading = ref(true);
const pagination = ref({
  page: 1,
  limit: 12,
  totalPages: 1,
  hasPrevPage: false,
  hasNextPage: false,
  totalDocs: 0,
});

// Filtros de búsqueda (panel principal)
const filters = ref({
  search: '',
  provider: '',
});

// Filtros del sidebar (proveedor, nivel, duración, gratis, orden)
const sidebarFilters = ref({
  proveedor: '',
  niveles: [],
  duracion: '',
  soloGratis: false,
  sort: '-createdAt',
});

// Drawer móvil
const showFiltersMobile = ref(false);

const filterCount = computed(() => {
  const sf = sidebarFilters.value;
  let count = (sf.niveles?.length || 0) + (sf.soloGratis ? 1 : 0);
  if (sf.duracion) count += 1;
  if (sf.proveedor?.trim()) count += 1;
  return count;
});

// Debounce
let timeout = null;
const debouncedFetch = () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => fetchCourses(1), 500);
};

async function fetchCourses(page = 1) {
  loading.value = true;
  try {
    const params = {
      limit: pagination.value.limit,
      page,
      sort: sidebarFilters.value.sort,
    };

    if (filters.value.search) {
      params['where[titulo][like]'] = filters.value.search;
    }
    // Proveedor: prioridad al selector del sidebar (exacto), sino búsqueda por texto del panel
    if (sidebarFilters.value.proveedor?.trim()) {
      params['where[proveedor][equals]'] = sidebarFilters.value.proveedor.trim();
    } else if (filters.value.provider?.trim()) {
      params['where[proveedor][like]'] = filters.value.provider.trim();
    }
    if (sidebarFilters.value.soloGratis) {
      params['where[esGratuito][equals]'] = true;
    }

    // Niveles (múltiples)
    if (sidebarFilters.value.niveles?.length > 0) {
      sidebarFilters.value.niveles.forEach((val, i) => {
        params[`where[nivel][in][${i}]`] = val;
      });
    }

    // Duración (rango)
    const dur = sidebarFilters.value.duracion;
    if (dur === '0-5') {
      params['where[duracionHoras][less_than]'] = 5;
    } else if (dur === '5-20') {
      params['where[duracionHoras][greater_than_equal]'] = 5;
      params['where[duracionHoras][less_than_equal]'] = 20;
    } else if (dur === '20-50') {
      params['where[duracionHoras][greater_than_equal]'] = 20;
      params['where[duracionHoras][less_than_equal]'] = 50;
    } else if (dur === '50+') {
      params['where[duracionHoras][greater_than]'] = 50;
    }

    const response = await cmsApi.getCourses(params);
    courses.value = response.docs || [];
    pagination.value = {
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      totalDocs: response.totalDocs,
    };
  } catch (error) {
    console.error('Error cargando cursos:', error);
    courses.value = [];
  } finally {
    loading.value = false;
  }
}

function handleSidebarFilter(newFilters) {
  sidebarFilters.value = {
    proveedor: newFilters.proveedor || '',
    niveles: newFilters.niveles || [],
    duracion: newFilters.duracion || '',
    soloGratis: newFilters.soloGratis || false,
    sort: newFilters.sort || '-createdAt',
  };
  pagination.value.page = 1;
}

const sidebarKey = ref(0);
function clearAllFilters() {
  filters.value = { search: '', provider: '' };
  sidebarFilters.value = { proveedor: '', niveles: [], duracion: '', soloGratis: false, sort: '-createdAt' };
  sidebarKey.value += 1; // Reinicia estado del sidebar
  fetchCourses(1);
  showFiltersMobile.value = false;
}

watch(() => filters.value.search, debouncedFetch);
watch(() => filters.value.provider, debouncedFetch);
watch(sidebarFilters, () => fetchCourses(1), { deep: true });

watch(showFiltersMobile, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});
onUnmounted(() => { document.body.style.overflow = ''; });

onMounted(() => {
  const search = route.query.search;
  if (search && typeof search === 'string') {
    filters.value.search = search.trim();
  }
  fetchCourses();
});

const nextPage = () => { if (pagination.value.hasNextPage) fetchCourses(pagination.value.page + 1); };
const prevPage = () => { if (pagination.value.hasPrevPage) fetchCourses(pagination.value.page - 1); };
const goToPage = (p) => { if (p !== pagination.value.page) fetchCourses(p); };
</script>

<template>
  <div class="bg-[rgb(9,9,42)] text-white min-h-screen pt-[calc(72px+24px)] sm:pt-[calc(72px+32px)] pb-20">
    <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

      <!-- Header -->
      <header class="mb-6 sm:mb-8 lg:mb-10">
        <h1 class="font-['League_Spartan',_sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-white bg-clip-text text-transparent">
          Explora Cursos
        </h1>
        <p class="text-white/70 m-0 text-sm sm:text-base max-w-2xl">
          Descubre recursos educativos seleccionados para impulsar tu carrera profesional.
        </p>
      </header>

      <!-- Panel de búsqueda mejorado -->
      <div class="mb-6 sm:mb-8 rounded-2xl border-2 border-[#a6249d] bg-gradient-to-br from-[#121225] to-[#0d0d1a] p-4 sm:p-5 shadow-xl shadow-[#a6249d]/5 focus-within:ring-2 focus-within:ring-[#a6249d]/30 transition-all duration-300">
        <div class="flex flex-col lg:flex-row lg:items-end gap-4">
          <div class="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#ff6ec7] uppercase tracking-wider mb-1.5">Título del curso</label>
              <div class="rounded-xl border-2 border-[#a6249d]/50 bg-[#0a0a14]/80 focus-within:border-[#a6249d] transition-all">
                <SearchBar v-model="filters.search" placeholder="Ej. Desarrollo Web, Python..." />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-[#ff6ec7] uppercase tracking-wider mb-1.5">Proveedor / Plataforma</label>
              <div class="rounded-xl border-2 border-[#a6249d]/50 bg-[#0a0a14]/80 focus-within:border-[#a6249d] transition-all">
                <div class="relative">
                  <span class="absolute left-4 inset-y-0 flex items-center">
                    <svg class="w-5 h-5 text-[#a6249d]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  <input
                    v-model="filters.provider"
                    type="text"
                    placeholder="Ej. Coursera, Platzi..."
                    class="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="filterCount > 0 || filters.search || filters.provider" class="lg:pl-4 lg:border-l lg:border-gray-700/50">
            <button
              type="button"
              @click="clearAllFilters"
              class="text-sm text-[#d93340] hover:text-[#ff6ec7] font-medium underline underline-offset-2"
            >
              Limpiar búsqueda y filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Botón filtros móvil -->
      <button
        type="button"
        @click="showFiltersMobile = true"
        class="lg:hidden flex items-center gap-2 mb-4 px-4 py-3 w-full sm:w-auto bg-[#121225] border-2 border-[#a6249d] rounded-xl text-white font-medium hover:bg-[#1a1a35] transition-colors"
      >
        <svg class="w-5 h-5 text-[#d93340]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
        <span v-if="filterCount > 0" class="ml-1 px-2 py-0.5 rounded-full bg-[#a6249d] text-xs">{{ filterCount }}</span>
      </button>

      <Transition name="fade">
        <div v-if="showFiltersMobile" class="lg:hidden fixed inset-0 bg-black/60 z-40" aria-hidden="true" @click="showFiltersMobile = false" />
      </Transition>

      <!-- Layout: sidebar + main -->
      <div class="flex gap-4 sm:gap-6 lg:gap-7 items-start relative">
        <div
          :class="[
            'lg:relative lg:block lg:w-72 lg:shrink-0',
            'fixed top-0 left-0 h-full z-50 w-[min(320px,90vw)] transition-transform duration-300 ease-out',
            showFiltersMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          ]"
        >
          <CapacitateFilterSidebar
            :key="sidebarKey"
            :initial-filters="{ proveedor: sidebarFilters.proveedor, niveles: sidebarFilters.niveles, duracion: sidebarFilters.duracion, soloGratis: sidebarFilters.soloGratis, sort: sidebarFilters.sort }"
            :show-close="showFiltersMobile"
            @filter-change="handleSidebarFilter"
            @close="showFiltersMobile = false"
          />
        </div>

        <main class="flex-1 min-w-0 w-full">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-5">
            <h2 class="m-0 text-lg sm:text-xl font-['League_Spartan',_sans-serif] font-bold text-white">
              {{ pagination.totalDocs }} curso{{ pagination.totalDocs !== 1 ? 's' : '' }} encontrado{{ pagination.totalDocs !== 1 ? 's' : '' }}
            </h2>
            <span v-if="pagination.totalDocs > 0" class="text-xs sm:text-sm text-white/70">
              Página {{ pagination.page }} de {{ pagination.totalPages }}
            </span>
          </div>

          <div v-if="loading" class="py-20 text-center">
            <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#d93340]"></div>
            <p class="mt-4 text-gray-400">Buscando cursos...</p>
          </div>

          <div v-else-if="courses.length === 0" class="py-20 text-center bg-[#121225]/50 rounded-2xl border border-[#a6249d]/20 border-dashed">
            <svg class="mx-auto h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 class="text-xl font-bold text-white mb-2">No encontramos cursos</h3>
            <p class="text-gray-500 max-w-md mx-auto">Prueba ajustando los filtros o buscando con otros términos.</p>
            <button @click="clearAllFilters" class="mt-6 text-[#d93340] hover:text-[#ff6ec7] font-medium underline">
              Limpiar filtros
            </button>
          </div>

          <div v-else>
            <div class="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <CourseCard v-for="course in courses" :key="course.id" :course="course" />
            </div>

            <div v-if="pagination.totalPages > 1" class="flex justify-center items-center gap-2 mt-8 flex-wrap">
              <button
                @click="prevPage"
                :disabled="!pagination.hasPrevPage"
                class="p-2.5 rounded-lg border border-[#a6249d]/30 hover:bg-[#a6249d]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white min-h-[44px]"
                title="Anterior"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <template v-for="p in pagination.totalPages" :key="p">
                <button
                  v-if="p === 1 || p === pagination.totalPages || (p >= pagination.page - 1 && p <= pagination.page + 1)"
                  @click="goToPage(p)"
                  class="w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm transition-all min-h-[44px]"
                  :class="p === pagination.page ? 'bg-[#d93340] text-white' : 'bg-[#1e1e3a] text-gray-400 hover:bg-[#2a2a4a] hover:text-white'"
                >
                  {{ p }}
                </button>
                <span v-else-if="p === pagination.page - 2 || p === pagination.page + 2" class="flex items-center px-1 text-gray-500">…</span>
              </template>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNextPage"
                class="p-2.5 rounded-lg border border-[#a6249d]/30 hover:bg-[#a6249d]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white min-h-[44px]"
                title="Siguiente"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
