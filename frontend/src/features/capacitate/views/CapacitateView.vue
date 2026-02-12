<script setup>
import CourseCard from '@/features/capacitate/components/CourseCard.vue';
import { ref, onMounted, watch } from 'vue';
import { cmsApi } from '@/services/cmsApi';

// Estado de datos
const courses = ref([]);
const loading = ref(true);
const pagination = ref({
  page: 1,
  limit: 12,
  totalPages: 1,
  hasPrevPage: false,
  hasNextPage: false,
  totalDocs: 0
});

// Filtros
const filters = ref({
  search: '',
  provider: '',
  isFree: false
});

// Debounce helper simple
let timeout = null;
const debouncedFetch = () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetchCourses(1); // Reset a pág 1 al filtrar
  }, 500);
};

// Función principal de carga
async function fetchCourses(page = 1) {
  loading.value = true;
  try {
    const params = {
      limit: pagination.value.limit,
      page: page,
    };

    // Construcción de query params para Payload CMS
    if (filters.value.search) {
      params['where[titulo][like]'] = filters.value.search;
    }
    
    if (filters.value.provider) {
      params['where[proveedor][like]'] = filters.value.provider;
    }

    if (filters.value.isFree) {
      params['where[esGratuito][equals]'] = true;
    }

    // Ordenar por más reciente por defecto
    params.sort = '-createdAt';

    const response = await cmsApi.getCourses(params);
    
    courses.value = response.docs || [];
    pagination.value = {
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      totalDocs: response.totalDocs
    };

  } catch (error) {
    console.error('Error cargando cursos:', error);
    courses.value = [];
  } finally {
    loading.value = false;
  }
}

// Watchers
watch(() => filters.value.search, debouncedFetch);
watch(() => filters.value.provider, debouncedFetch);
watch(() => filters.value.isFree, () => fetchCourses(1)); // Checkbox inmediato

// Lifecycle
onMounted(() => {
  fetchCourses();
});

// Paginación handlers
const nextPage = () => {
  if (pagination.value.hasNextPage) fetchCourses(pagination.value.page + 1);
};
const prevPage = () => {
  if (pagination.value.hasPrevPage) fetchCourses(pagination.value.page - 1);
};
const goToPage = (p) => {
  if (p !== pagination.value.page) fetchCourses(p);
};
</script>

<template>
  <div class="bg-[rgb(9,9,42)] text-white min-h-screen pt-[calc(72px+24px)] pb-20 font-sans">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      
      <!-- Header -->
      <div class="mb-10 text-center md:text-left">
        <h1 class="font-['League_Spartan',_sans-serif] text-4xl font-extrabold text-transparent bg-clip-text bg-white mb-3">
          Explora Cursos
        </h1>
        <p class="text-white/70 text-lg max-w-2xl">
          Descubre recursos educativos seleccionados para impulsar tu carrera profesional.
        </p>
      </div>

      <!-- Filters Bar -->
      <div class="bg-[#121225] p-6 rounded-2xl border-2 border-[#a6249d] mb-10 shadow-xl shadow-black/20 focus-within:ring-2 focus-within:ring-[#a6249d]/30 transition-all duration-300">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          <!-- Buscador Principal -->
          <div class="md:col-span-5 relative">
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buscar por título</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                v-model="filters.search"
                type="text" 
                placeholder="Ej. Desarrollo Web..." 
                class="block w-full pl-10 pr-3 py-3 bg-[#1e1e3a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a6249d] focus:border-transparent transition-all"
              >
            </div>
          </div>

          <!-- Buscador Proveedor -->
          <div class="md:col-span-4 relative">
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Proveedor</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <input 
                v-model="filters.provider"
                type="text" 
                placeholder="Ej. Platzi, Udemy..." 
                class="block w-full pl-10 pr-3 py-3 bg-[#1e1e3a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a6249d] focus:border-transparent transition-all"
              >
            </div>
          </div>

          <!-- Filtro Gratis -->
          <div class="md:col-span-3 flex items-center h-full pb-3">
            <label class="flex items-center space-x-3 cursor-pointer group select-none">
              <div class="relative">
                <input type="checkbox" v-model="filters.isFree" class="sr-only peer">
                <div class="w-12 h-7 bg-gray-700 rounded-full peer-focus:ring-2 peer-focus:ring-[#a6249d] peer-checked:bg-[#a6249d] transition-colors duration-300 ease-in-out"></div>
                <div class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full peer-checked:translate-x-5 transition-transform duration-300 shadow-md"></div>
              </div>
              <span class="text-gray-300 font-medium group-hover:text-white transition-colors">Solo Gratuitos</span>
            </label>
          </div>

        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-32 text-center">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#d93340]"></div>
        <p class="mt-4 text-gray-400 animate-pulse">Buscando cursos...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="courses.length === 0" class="py-32 text-center bg-[#121225]/50 rounded-2xl border border-[#a6249d]/20 border-dashed">
        <svg class="mx-auto h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-bold text-white mb-2">No encontramos resultados</h3>
        <p class="text-gray-500 max-w-md mx-auto">Intenta ajustar tus filtros o buscar con otros términos.</p>
        <button @click="filters = { search: '', provider: '', isFree: false }" class="mt-6 text-[#d93340] hover:text-[#ff6ec7] font-medium underline underline-offset-4">
          Limpiar filtros
        </button>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Courses Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          <CourseCard
            v-for="course in courses"
            :key="course.id"
            :course="course"
          />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-2 mt-8" v-if="pagination.totalPages > 1">
          <!-- Prev Button -->
          <button 
            @click="prevPage"
            :disabled="!pagination.hasPrevPage"
            class="p-2 rounded-lg border border-[#a6249d]/30 hover:bg-[#a6249d]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
            title="Anterior"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Page Numbers (Simplified logic: show all or max 5 around current) -->
          <div class="flex gap-2 mx-2">
            <template v-for="p in pagination.totalPages" :key="p">
              <!-- Show first, last, current, and surrounding pages logic could be added here. For now, simple list if not too large -->
              <button 
                v-if="p === 1 || p === pagination.totalPages || (p >= pagination.page - 1 && p <= pagination.page + 1)"
                @click="goToPage(p)"
                class="w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-200"
                :class="p === pagination.page ? 'bg-[#d93340] text-white shadow-lg shadow-[#a6249d]/20' : 'bg-[#1e1e3a] text-gray-400 hover:bg-[#2a2a4a] hover:text-white'"
              >
                {{ p }}
              </button>
              <span v-else-if="p === pagination.page - 2 || p === pagination.page + 2" class="flex items-end px-1 text-gray-600">...</span>
            </template>
          </div>

          <!-- Next Button -->
          <button 
            @click="nextPage"
            :disabled="!pagination.hasNextPage"
            class="p-2 rounded-lg border border-[#a6249d]/30 hover:bg-[#a6249d]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
            title="Siguiente"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Results count text -->
        <div class="text-center mt-6 text-sm text-white/70">
          Mostrando {{ courses.length }} de {{ pagination.totalDocs }} resultados
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar if needed */
</style>
