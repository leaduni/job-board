<template>
  <section class="bg-[#09092a] min-h-screen pt-[calc(72px+24px)]">
    <div class="max-w-[1240px] mx-auto px-4 md:px-8 py-10">

      <!-- Header -->
      <header class="mb-10">
        <h1 class="font-['League_Spartan',_sans-serif] text-3xl mb-2">
          Ofertas Laborales
        </h1>
        <p class="text-[rgba(255,255,255,0.45)] m-0">
          Encuentra prácticas, empleos junior y primeras oportunidades profesionales
        </p>
      </header>

      <!-- Search + Sort row -->
      <div class="flex flex-col md:flex-row items-stretch gap-4 mb-8">
        <!-- SearchBar -->
        <div class="flex-grow bg-[#121225] rounded-xl border-2 border-[#b62667] focus-within:ring-2 focus-within:ring-[#b62667]/30 transition-all duration-300">
          <SearchBar v-model="filters.search" />
        </div>

        <!-- Sort by -->
        <div class="relative flex items-center w-full md:w-auto">
          <label for="sort" class="text-sm text-gray-400 mr-3 shrink-0">Ordenar por:</label>

          <div class="relative h-full w-full">
            <select id="sort" v-model="sort" class="appearance-none bg-[#121225] text-white border-2 border-[#b62667] rounded-xl px-4 pr-10 h-full w-full focus:outline-none focus:ring-2 focus:ring-[#b62667]/50">
              <option value="recent" class="bg-[#0a0a14] text-white">Más recientes</option>
              <option value="old" class="bg-[#0a0a14] text-white">Más antiguas</option>

            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón Filtros Móvil -->
      <div class="mb-5 md:hidden">
        <button
          @click="isFilterSidebarOpen = true"
          class="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg bg-[#121225] border-2 border-[#b62667] hover:bg-[#b62667]/10 transition-colors"
        >
          <i class="fas fa-sliders-h"></i>
          Filtros de búsqueda
        </button>
      </div>

      <!-- Layout columns -->
      <div class="flex flex-col md:flex-row gap-7 items-start">
        <!-- Sidebar -->

        <aside class="hidden md:block w-72 shrink-0">
          <FilterSidebar ref="desktopSidebar" :is-mobile="false" />
        </aside>

        <!-- Mobile Filter Sidebar (Drawer) -->
        <div v-if="isFilterSidebarOpen" class="fixed inset-0 z-[60]">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50" @click="isFilterSidebarOpen = false"></div>
          <!-- Panel -->
          <div class="absolute top-[72px] right-0 bg-[#121225] w-[80%] max-w-sm h-[calc(100%-72px)] flex flex-col">
            <!-- Header -->
            <div class="flex items-center justify-between p-2 border-b border-gray-800 sticky top-0 bg-[#121225] z-10">
              <h2 class="text-white font-bold text-lg pl-4">Filtros de búsqueda</h2>
              <button @click="isFilterSidebarOpen = false" class="p-4 text-white">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
            <!-- Filters -->
            <div class="flex-grow overflow-y-auto">
              <FilterSidebar ref="mobileSidebar" :is-mobile="true" />
            </div>
            <!-- Footer -->
            <div class="p-6 border-t border-gray-800 sticky bottom-0 bg-[#121225] z-10">
              <button
                @click="clearMobileFilters"
                class="w-full flex items-center justify-center gap-2 text-sm text-[#b62667] hover:text-white"
              >
                <i class="fas fa-trash-alt"></i>
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>


        <!-- Contenido -->
        <main class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-3 my-3 mb-5">
            <h2 class="m-0 text-xl font-['League_Spartan',_sans-serif]">{{ pagination.totalDocs }} Ofertas encontradas</h2>
            <div class="text-[rgba(255,255,255,0.45)]" v-if="pagination.totalDocs > 0">
              <span class="text-sm">Mostrando {{ startItem }}-{{ endItem }} de {{ pagination.totalDocs }}</span>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="py-20 text-center">
             <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#b62667]"></div>
             <p class="mt-4 text-[rgba(255,255,255,0.45)]">Cargando ofertas...</p>
          </div>


          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <JobCard
              v-for="oferta in ofertas"
              :key="oferta.id"
              :oferta="oferta"
            />
          </div>

          <!-- Pagination -->
          <div v-if="!loading && pagination.totalPages > 1" class="flex justify-center mt-10">
            <Pagination
              :current-page="pagination.page"
              :total-pages="pagination.totalPages"
              @update:page="changePage"
            />
          </div>
        </main>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { listarOfertas } from '../services/ofertas.service'

import JobCard from '../components/JobCard.vue'
import FilterSidebar from '../components/FilterSidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import Pagination from '../components/Pagination.vue'

// Estado
const ofertas = ref([])
const loading = ref(true)
const search = ref('')
const sort = ref('recent')
const currentPage = ref(1)
const itemsPerPage = 6

const isFilterSidebarOpen = ref(false)
const mobileSidebar = ref(null)

const clearMobileFilters = () => {
  if (mobileSidebar.value) {
    mobileSidebar.value.clearAllFilters()
  }
}

const paginatedOfertas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return ofertas.value.slice(start, end)

})

// Helpers para texto "Mostrando X-Y de Z"
const startItem = computed(() => (pagination.value.page - 1) * pagination.value.limit + 1)
const endItem = computed(() => Math.min(pagination.value.page * pagination.value.limit, pagination.value.totalDocs))

// Debounce para búsqueda
let timeout = null
watch(() => filters.value.search, () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    pagination.value.page = 1 // Reset página al buscar
    fetchOfertas()
  }, 500)
})

watch(() => filters.value.sort, () => {
  pagination.value.page = 1
  fetchOfertas()
})

// Handler del Sidebar
const handleSidebarFilter = (newFilters) => {
  filters.value.modalidades = newFilters.modalidades
  filters.value.tiposContrato = newFilters.tiposContrato
  filters.value.nivelesExperiencia = newFilters.nivelesExperiencia
  
  pagination.value.page = 1 // Reset página al filtrar
  fetchOfertas()
}

// Cambio de página
const changePage = (newPage) => {
  pagination.value.page = newPage
  fetchOfertas()
  // Scroll suave al top de los resultados
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lógica principal de fetch
async function fetchOfertas() {
  loading.value = true
  try {
    const params = {
      limit: pagination.value.limit,
      page: pagination.value.page,
      sort: filters.value.sort,
    }

    // Construcción de query params para Payload CMS (MongoDB syntax)
    
    // 1. Búsqueda por título
    if (filters.value.search) {
      params['where[titulo][like]'] = filters.value.search
    }

    // 2. Filtros OR (Payload 'in' operator)
    if (filters.value.modalidades.length > 0) {
      // where[modalidad][in][0]=remoto&where[modalidad][in][1]=hibrido
      filters.value.modalidades.forEach((val, index) => {
        params[`where[modalidad][in][${index}]`] = val
      })
    }

    if (filters.value.tiposContrato.length > 0) {
      filters.value.tiposContrato.forEach((val, index) => {
        params[`where[tipo_contrato][in][${index}]`] = val
      })
    }

    if (filters.value.nivelesExperiencia.length > 0) {
      filters.value.nivelesExperiencia.forEach((val, index) => {
        params[`where[nivel_experiencia][in][${index}]`] = val
      })
    }

    // Solo ofertas activas (Opcional, pero recomendado)
    // params['where[estado][equals]'] = 'activa'

    const data = await listarOfertas(params)
    
    if (data.docs) {
      ofertas.value = data.docs
      pagination.value = {
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
        totalDocs: data.totalDocs,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage
      }
    } else {
      // Fallback si la respuesta no es paginada
      ofertas.value = Array.isArray(data) ? data : []
    }
    
  } catch (error) {
    console.error('Error fetching ofertas:', error)
    ofertas.value = []
  } finally {
    loading.value = false
  }
}

// Inicialización
onMounted(() => {
  fetchOfertas()
})
</script>
