<template>
  <section class="bg-[#09092a] min-h-screen pt-[calc(72px+24px)]">
    <div class="max-w-[1240px] mx-auto px-8 py-10">

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
      <div class="flex items-stretch gap-4 mb-8">
        <!-- SearchBar -->
        <div class="flex-grow bg-[#121225] rounded-xl border-2 border-[#b62667] focus-within:ring-2 focus-within:ring-[#b62667]/30 transition-all duration-300">
          <SearchBar v-model="filters.search" />
        </div>

        <!-- Sort by -->
        <div class="relative flex items-center">
          <label for="sort" class="text-sm text-gray-400 mr-3 shrink-0">Ordenar por:</label>
          <div class="relative h-full">
            <select id="sort" v-model="filters.sort" class="appearance-none bg-[#121225] text-white border-2 border-[#b62667] rounded-xl px-4 pr-10 h-full focus:outline-none focus:ring-2 focus:ring-[#b62667]/50">
              <option value="-createdAt" class="bg-[#0a0a14] text-white">Más recientes</option>
              <option value="createdAt" class="bg-[#0a0a14] text-white">Más antiguas</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout columns -->
      <div class="flex gap-7 items-start">
        <!-- Sidebar -->
        <FilterSidebar @filter-change="handleSidebarFilter" />

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

          <!-- Empty State -->
          <div v-else-if="ofertas.length === 0" class="py-20 text-center bg-[#121225]/50 rounded-2xl border border-white/5 border-dashed">
            <svg class="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 class="text-xl font-bold text-white mb-2">No encontramos ofertas</h3>
            <p class="text-gray-500 max-w-md mx-auto">Prueba ajustando los filtros o buscando con otras palabras clave.</p>
          </div>

          <!-- Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start">
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

// Estado de paginación
const pagination = ref({
  page: 1,
  limit: 9, // Ajustado a múltiplo de 3 para mejor grid
  totalPages: 1,
  totalDocs: 0,
  hasPrevPage: false,
  hasNextPage: false
})

// Filtros reactivos
const filters = ref({
  search: '',
  sort: '-createdAt',
  modalidades: [],
  tiposContrato: [],
  nivelesExperiencia: []
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
