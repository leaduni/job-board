<template>
  <section class="page-section">
    <div class="container">

      <!-- Header -->
      <header class="page-header">
        <h1 class="page-title">Ofertas Laborales</h1>
        <p class="page-subtitle">
          Encuentra prácticas, empleos junior y primeras oportunidades profesionales
        </p>
      </header>

      <!-- Search + Sort row -->
      <div class="search-sort-row">
        <div class="search-row">
          <SearchBar v-model="search" />
        </div>

        <div class="sort-row">
          <label class="sort-label">Ordenar por:</label>
          <select v-model="sort" class="select-sort">
            <option value="recent">Más recientes</option>
            <option value="old">Más antiguas</option>
          </select>
        </div>
      </div>

      <!-- Layout columns -->
      <div class="layout">
        <!-- Sidebar -->
        <FilterSidebar />

        <!-- Contenido -->
        <main class="main-content">
          <div class="results-header">
            <h2 class="results-title">{{ totalResults }} Ofertas encontradas</h2>
            <div class="results-meta">
              <span class="results-range">Mostrando {{ startItem }}-{{ endItem }} de {{ totalResults }}</span>
            </div>
          </div>

          <div v-if="loading" class="loading text-muted">
            Cargando ofertas...
          </div>

          <div v-else class="grid-ofertas">
            <JobCard
              v-for="oferta in paginatedOfertas"
              :key="oferta.id"
              :oferta="oferta"
            />
          </div>

          <div v-if="!loading && totalPages > 1" class="pagination-area">
            <Pagination
              :current-page="currentPage"
              :total-pages="totalPages"
              @update:page="currentPage = $event"
            />
          </div>
        </main>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { listarOfertas } from '../services/ofertas.service'

import JobCard from '../components/JobCard.vue'
import FilterSidebar from '../components/FilterSidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import Pagination from '../components/Pagination.vue'

const ofertas = ref([])
const loading = ref(true)
const search = ref('')
const sort = ref('recent')
const currentPage = ref(1)
const itemsPerPage = 6

const paginatedOfertas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return ofertas.value.slice(start, end)
})

const totalPages = computed(() =>
  Math.ceil(ofertas.value.length / itemsPerPage)
)

const totalResults = computed(() => ofertas.value.length)
const startItem = computed(() => ofertas.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, ofertas.value.length))

onMounted(async () => {
  try {
    ofertas.value = await listarOfertas()
  } catch (error) {
    console.error('Error cargando ofertas', error)
  } finally {
    loading.value = false
  }
})
</script>