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
          <SearchBar v-model="search" />
        </div>

        <!-- Sort by -->
        <div class="relative flex items-center">
          <label for="sort" class="text-sm text-gray-400 mr-3 shrink-0">Ordenar por:</label>
          <div class="relative h-full">
            <select id="sort" v-model="sort" class="appearance-none bg-[#121225] text-white border-2 border-[#b62667] rounded-xl px-4 pr-10 h-full focus:outline-none focus:ring-2 focus:ring-[#b62667]/50">
              <option value="recent" class="bg-[#0a0a14] text-white">Más recientes</option>
              <option value="old" class="bg-[#0a0a14] text-white">Más antiguas</option>
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
        <FilterSidebar />

        <!-- Contenido -->
        <main class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-3 my-3 mb-5">
            <h2 class="m-0 text-xl font-['League_Spartan',_sans-serif]">{{ totalResults }} Ofertas encontradas</h2>
            <div class="text-[rgba(255,255,255,0.45)]">
              <span class="text-sm">Mostrando {{ startItem }}-{{ endItem }} de {{ totalResults }}</span>
            </div>
          </div>

          <div v-if="loading" class="py-8 text-[rgba(255,255,255,0.45)] text-sm">
            Cargando ofertas...
          </div>

          <div v-else class="grid grid-cols-3 gap-7 items-start">
            <JobCard
              v-for="oferta in paginatedOfertas"
              :key="oferta.id"
              :oferta="oferta"
            />
          </div>

          <div v-if="!loading && totalPages > 1" class="flex justify-center mt-7">
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