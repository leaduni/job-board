<template>
  <section
    class="bg-[rgb(9,9,42)] min-h-screen pt-[calc(72px+24px)] sm:pt-[calc(72px+32px)]"
  >
    <div
      class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
    >
      <!-- Header -->
      <header class="mb-6 sm:mb-8 lg:mb-10">
        <h1
          class="font-['League_Spartan',_sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-white bg-clip-text text-transparent"
        >
          Ofertas Laborales
        </h1>
        <p class="text-white/70 m-0 text-sm sm:text-base">
          Encuentra prácticas, empleos junior y primeras oportunidades
          profesionales
        </p>
      </header>

      <!-- Panel de búsqueda mejorado -->
      <div
        class="mb-6 sm:mb-8 rounded-2xl border-2 border-[#a6249d] bg-gradient-to-br from-[#121225] to-[#0d0d1a] p-4 sm:p-5 shadow-xl shadow-[#a6249d]/5 focus-within:ring-2 focus-within:ring-[#a6249d]/30 focus-within:shadow-[#a6249d]/10 transition-all duration-300"
      >
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
          <!-- Buscador principal -->
          <div class="flex-1 min-w-0">
            <label
              class="block text-xs font-bold text-[#ff6ec7] uppercase tracking-wider mb-1.5"
              >Buscar ofertas</label
            >
            <div
              class="rounded-xl border-2 border-[#a6249d]/50 bg-[#0a0a14]/80 focus-within:border-[#a6249d] focus-within:ring-2 focus-within:ring-[#a6249d]/20 transition-all"
            >
              <SearchBar v-model="filters.search" />
            </div>
          </div>
          <!-- Ordenar y filtros rápido (desktop) -->
          <div
            class="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:border-l lg:border-gray-700/50 lg:pl-6"
          >
            <div class="flex items-center gap-2 shrink-0">
              <label
                for="sort"
                class="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0"
                >Ordenar</label
              >
              <div class="relative flex-1 sm:flex-initial min-w-0">
                <select
                  id="sort"
                  v-model="filters.sort"
                  class="w-full sm:w-auto appearance-none bg-[#0a0a14] text-white border border-gray-700 rounded-lg px-4 pr-9 py-2.5 min-h-[44px] sm:min-h-0 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 text-sm"
                >
                  <option value="-createdAt" class="bg-[#0a0a14] text-white">
                    Más recientes
                  </option>
                  <option value="createdAt" class="bg-[#0a0a14] text-white">
                    Más antiguas
                  </option>
                  <option value="titulo" class="bg-[#0a0a14] text-white">
                    A → Z
                  </option>
                  <option value="-titulo" class="bg-[#0a0a14] text-white">
                    Z → A
                  </option>
                  <option
                    v-if="showAffinitySection"
                    value="affinity"
                    class="bg-[#0a0a14] text-white"
                  >
                    Por afinidad
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              v-if="filterCount > 0"
              class="hidden sm:flex items-center text-sm text-[#a6249d]/90"
            >
              <span class="inline-flex items-center gap-1.5">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {{ filterCount }} filtro{{
                  filterCount > 1 ? "s" : ""
                }}
                activo{{ filterCount > 1 ? "s" : "" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: Botón para abrir filtros -->
      <button
        type="button"
        @click="showFiltersMobile = true"
        class="lg:hidden flex items-center gap-2 mb-4 px-4 py-3 w-full sm:w-auto bg-[#121225] border-2 border-[#a6249d] rounded-xl text-white font-medium hover:bg-[#1a1a35] transition-colors"
      >
        <svg
          class="w-5 h-5 text-[#d93340]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filtros
        <span
          v-if="filterCount > 0"
          class="ml-1 px-2 py-0.5 rounded-full bg-[#a6249d] text-xs"
          >{{ filterCount }}</span
        >
      </button>

      <!-- Backdrop móvil -->
      <Transition name="fade">
        <div
          v-if="showFiltersMobile"
          class="lg:hidden fixed inset-0 bg-black/60 z-40"
          aria-hidden="true"
          @click="showFiltersMobile = false"
        />
      </Transition>

      <!-- Layout columns -->
      <div class="flex gap-4 sm:gap-6 lg:gap-7 items-start relative">
        <!-- Sidebar: drawer en móvil, fijo en desktop -->
        <div
          :class="[
            'lg:relative lg:block lg:w-72 lg:shrink-0',
            'fixed top-0 left-0 h-full z-50 w-[min(320px,90vw)] transition-transform duration-300 ease-out',
            showFiltersMobile
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0',
          ]"
        >
          <FilterSidebar
            :initial-filters="{
              modalidades: filters.modalidades,
              tiposContrato: filters.tiposContrato,
              nivelesExperiencia: filters.nivelesExperiencia,
              affinityMin: filters.affinityMin,
            }"
            :show-affinity="showAffinitySection"
            :show-close="showFiltersMobile"
            @filter-change="handleSidebarFilter"
            @close="showFiltersMobile = false"
          />
        </div>

        <!-- Contenido -->
        <main class="flex-1 min-w-0 w-full">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 my-3 mb-4 sm:mb-5"
          >
            <h2
              class="m-0 text-lg sm:text-xl font-['League_Spartan',_sans-serif] font-bold text-white"
            >
              {{ pagination.totalDocs }} Ofertas encontradas
            </h2>
            <div class="text-white/70" v-if="pagination.totalDocs > 0">
              <span class="text-xs sm:text-sm"
                >Mostrando {{ startItem }}-{{ endItem }} de
                {{ pagination.totalDocs }}</span
              >
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="py-20 text-center">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d93340]"
            ></div>
            <p class="mt-4 text-[rgba(255,255,255,0.45)]">
              Cargando ofertas...
            </p>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="ofertas.length === 0"
            class="py-20 text-center bg-[#121225]/50 rounded-2xl border border-white/5 border-dashed"
          >
            <svg
              class="mx-auto h-12 w-12 text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 class="text-xl font-bold text-white mb-2">
              No encontramos ofertas
            </h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Prueba ajustando los filtros o buscando con otras palabras clave.
            </p>
          </div>

          <!-- Grid -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7 items-start"
          >
            <JobCard
              v-for="oferta in ofertas"
              :key="oferta.id"
              :oferta="oferta"
              :affinity="getAffinityForOffer(oferta)"
              :require-auth="!isAuthenticated"
              @auth-required="showLoginModal = true"
            />
          </div>

          <!-- Pagination -->
          <div
            v-if="!loading && pagination.totalPages > 1"
            class="flex justify-center mt-6 sm:mt-8 lg:mt-10"
          >
            <Pagination
              :current-page="pagination.page"
              :total-pages="pagination.totalPages"
              @update:page="changePage"
            />
          </div>
        </main>
      </div>
    </div>

    <LoginRequiredModal
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @login="handleGoToLogin"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { listarOfertas } from "../services/ofertas.service";
import { useAuth } from "@/composables/useAuth";
import { getMySkills } from "@/services/skillsApi";
import { filterByAffinity, sortByAffinity, computeAffinity } from "@/composables/useAffinity";

import JobCard from "../components/JobCard.vue";
import FilterSidebar from "../components/FilterSidebar.vue";
import SearchBar from "../components/SearchBar.vue";
import Pagination from "../components/Pagination.vue";
import LoginRequiredModal from "@/components/modals/LoginRequiredModal.vue";

const route = useRoute();
const router = useRouter();
const { isAuthenticated } = useAuth();

// Estado
const ofertas = ref([]);
const mySkills = ref([]);
const loading = ref(true);
const showLoginModal = ref(false);

function handleGoToLogin() {
  showLoginModal.value = false;
  router.push("/auth/login");
}

// Estado de paginación
const pagination = ref({
  page: 1,
  limit: 9, // Ajustado a múltiplo de 3 para mejor grid
  totalPages: 1,
  totalDocs: 0,
  hasPrevPage: false,
  hasNextPage: false,
});

// Valores iniciales desde URL (antes del primer render)
function getInitialFilters() {
  const q = route.query;
  let search = "";
  let tiposContrato = [];
  if (q.search) search = String(q.search).trim();
  if (q.tipo_contrato) {
    const valid = [
      "practicas_pre",
      "practicas_pro",
      "tiempo_completo",
      "medio_tiempo",
      "freelance",
    ];
    const values = String(q.tipo_contrato)
      .split(",")
      .map((v) => v.trim());
    tiposContrato = [...new Set(values.filter((v) => valid.includes(v)))];
  }
  return { search, tiposContrato };
}

const initialFromUrl = getInitialFilters();

// Filtros reactivos
const filters = ref({
  search: initialFromUrl.search,
  sort: "-createdAt",
  modalidades: [],
  tiposContrato: initialFromUrl.tiposContrato,
  nivelesExperiencia: [],
  affinityMin: "",
});

// Helpers para texto "Mostrando X-Y de Z"
const startItem = computed(
  () => (pagination.value.page - 1) * pagination.value.limit + 1,
);
const endItem = computed(() =>
  Math.min(
    pagination.value.page * pagination.value.limit,
    pagination.value.totalDocs,
  ),
);

// Drawer de filtros en móvil
const showFiltersMobile = ref(false);
const showAffinitySection = computed(
  () => isAuthenticated.value && mySkills.value.length > 0,
);

const hasAffinityActive = computed(
  () =>
    showAffinitySection.value &&
    (filters.value.affinityMin || filters.value.sort === "affinity"),
);

const filterCount = computed(() => {
  const f = filters.value;
  let count =
    (f.modalidades?.length || 0) +
    (f.tiposContrato?.length || 0) +
    (f.nivelesExperiencia?.length || 0);
  if (f.affinityMin) count += 1;
  if (f.sort === "affinity") count += 1;
  return count;
});

// Debounce para búsqueda
let timeout = null;
watch(
  () => filters.value.search,
  () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      pagination.value.page = 1; // Reset página al buscar
      fetchOfertas();
    }, 500);
  },
);

watch(
  () => filters.value.sort,
  () => {
    pagination.value.page = 1;
    fetchOfertas();
  },
);

// Handler del Sidebar
const handleSidebarFilter = (newFilters) => {
  filters.value.modalidades = newFilters.modalidades;
  filters.value.tiposContrato = newFilters.tiposContrato;
  filters.value.nivelesExperiencia = newFilters.nivelesExperiencia;
  filters.value.affinityMin = newFilters.affinityMin || "";

  pagination.value.page = 1; // Reset página al filtrar
  fetchOfertas();
};

// Cambio de página
const changePage = (newPage) => {
  pagination.value.page = newPage;
  fetchOfertas();
  // Scroll suave al top de los resultados
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Lógica principal de fetch
const AFFINITY_BATCH_SIZE = 150;

async function fetchOfertas() {
  loading.value = true;
  try {
    const sortForApi = filters.value.sort === "affinity" ? "-createdAt" : filters.value.sort;
    const params = {
      limit: hasAffinityActive.value ? AFFINITY_BATCH_SIZE : pagination.value.limit,
      page: hasAffinityActive.value ? 1 : pagination.value.page,
      sort: sortForApi,
    };

    // Construcción de query params para Payload CMS (MongoDB syntax)
    if (filters.value.search) {
      params["where[titulo][like]"] = filters.value.search;
    }
    if (filters.value.modalidades.length > 0) {
      filters.value.modalidades.forEach((val, index) => {
        params[`where[modalidad][in][${index}]`] = val;
      });
    }
    if (filters.value.tiposContrato.length > 0) {
      filters.value.tiposContrato.forEach((val, index) => {
        params[`where[tipo_contrato][in][${index}]`] = val;
      });
    }
    if (filters.value.nivelesExperiencia.length > 0) {
      filters.value.nivelesExperiencia.forEach((val, index) => {
        params[`where[nivel_experiencia][in][${index}]`] = val;
      });
    }

    const data = await listarOfertas(params);
    let docs = data.docs || (Array.isArray(data) ? data : []);

    if (hasAffinityActive.value && docs.length > 0) {
      let filtered = filterByAffinity(docs, mySkills.value, filters.value.affinityMin);
      if (filters.value.sort === "affinity") {
        filtered = sortByAffinity(filtered, mySkills.value);
      }
      const limit = pagination.value.limit;
      const totalDocs = filtered.length;
      const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
      const page = Math.min(pagination.value.page, totalPages) || 1;
      const start = (page - 1) * limit;
      ofertas.value = filtered.slice(start, start + limit);
      pagination.value = {
        page,
        limit,
        totalPages,
        totalDocs,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      };
    } else {
      ofertas.value = docs;
      if (data.docs) {
        pagination.value = {
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages,
          totalDocs: data.totalDocs,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching ofertas:", error);
    ofertas.value = [];
  } finally {
    loading.value = false;
  }
}

// Bloquear scroll del body cuando el drawer de filtros está abierto en móvil
watch(showFiltersMobile, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});

function getAffinityForOffer(oferta) {
  if (!showAffinitySection.value) return null;
  const { matched, total } = computeAffinity(oferta, mySkills.value);
  if (total === 0) return null;
  return { matched, total };
}

async function loadMySkills() {
  if (!isAuthenticated.value) {
    mySkills.value = [];
    return;
  }
  try {
    mySkills.value = await getMySkills();
  } catch (err) {
    console.error("Error fetching user skills:", err);
    mySkills.value = [];
  }
}

watch(isAuthenticated, () => loadMySkills());

// Si mySkills carga después de que el usuario activó filtro afinidad, refetch
watch(
  () => mySkills.value.length,
  (newLen, oldLen) => {
    if (
      oldLen === 0 &&
      newLen > 0 &&
      (filters.value.affinityMin || filters.value.sort === "affinity")
    ) {
      pagination.value.page = 1;
      fetchOfertas();
    }
  },
);

// Inicialización
onMounted(() => {
  window.scrollTo(0, 0);
  loadMySkills();
  fetchOfertas();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
