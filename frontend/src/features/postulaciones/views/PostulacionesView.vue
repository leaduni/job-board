<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import axios from 'axios'

// componentes (los iremos creando después)
import PostulacionesStats from '../components/PostulacionesStats.vue'
import PostulacionesFilters from '../components/PostulacionesFilters.vue'
import PostulacionesList from '../components/PostulacionesList.vue'

// --- auth ---
const { user, isAuthenticated } = useAuth()

// --- estado ---
const loading = ref(false)
const error = ref(null)
const postulaciones = ref([])

// filtro activo: 'all' | 'enviada' | 'en_proceso' | 'cerrada'
const filtroEstado = ref('all')

// --- fetch ---
async function cargarPostulaciones() {
  loading.value = true
  error.value = null

  try {
    const { data } = await axios.get(
      'https://api-leaduni.up.railway.app/api/postulaciones'
    )

    postulaciones.value = data

    const idsUnicos = [
      ...new Set(
        data
          .filter(p => p.perfil_id === user.value.id)
          .map(p => p.oferta_id)
      ),
    ]

    await Promise.all(idsUnicos.map(cargarOferta))
  } catch (err) {
    error.value = 'No se pudieron cargar las postulaciones'
  } finally {
    loading.value = false
  }
}

// --- derivados ---

// postulaciones del perfil autenticado
const postulacionesUsuario = computed(() => {
  if (!isAuthenticated.value || !user.value) return []
  return postulaciones.value.filter(
    (p) => p.perfil_id === user.value.id
  )
})

// filtradas por estado
const postulacionesFiltradas = computed(() => {
  if (filtroEstado.value === 'all') {
    return postulacionesUsuario.value
  }
  return postulacionesUsuario.value.filter(
    (p) => p.estado === filtroEstado.value
  )
})

// stats
const stats = computed(() => {
  const total = postulacionesUsuario.value.length

  const enviadas = postulacionesUsuario.value.filter(
    (p) => p.estado === 'enviada'
  ).length

  const enProceso = postulacionesUsuario.value.filter(
    (p) => p.estado === 'en_proceso'
  ).length

  const cerradas = postulacionesUsuario.value.filter(
    (p) => p.estado === 'cerrada'
  ).length

  return {
    total,
    enviadas,
    enProceso,
    cerradas,
  }
})

const ofertasMap = ref({})

async function cargarOferta(ofertaId) {
  if (ofertasMap.value[ofertaId]) return

  const { data } = await axios.get(
  `/cms/api/projects/${ofertaId}`
)

  ofertasMap.value[ofertaId] = data
}


// --- lifecycle ---
onMounted(() => {
  if (isAuthenticated.value) {
    cargarPostulaciones()
  }
})
</script>

<template>
  <section class="page-section">
    <div class="container">

      <!-- Header -->
      <header class="page-header">
        <h1 class="page-title">Mis Postulaciones</h1>
        <p class="page-subtitle">
          Seguimiento de tus oportunidades
        </p>
      </header>

      <!-- Layout columns -->
      <div class="layout">

        <!-- Contenido principal -->
        <main class="main-content">

          <!-- No autenticado -->
          <div v-if="!isAuthenticated" class="text-muted">
            Inicia sesión para ver tus postulaciones.
          </div>

          <!-- Cargando -->
          <div v-else-if="loading" class="loading text-muted">
            Cargando postulaciones...
          </div>

          <!-- Error -->
          <div v-else-if="error" class="text-error">
            {{ error }}
          </div>

          <!-- Contenido -->
          <div v-else>

            <!-- Results header -->
            <div class="results-header">
              <h2 class="results-title">
                {{ stats.total }} Postulaciones
              </h2>
              <div class="results-meta">
                <span class="results-range">
                  Mostrando {{ postulacionesFiltradas.length }} de {{ stats.total }}
                </span>
              </div>
            </div>

            <!-- Stats -->
            <PostulacionesStats
              :total="stats.total"
              :enviadas="stats.enviadas"
              :enProceso="stats.enProceso"
              :cerradas="stats.cerradas"
            />

            <!-- Filtros -->
            <PostulacionesFilters
              v-model="filtroEstado"
            />

            <!-- Lista -->
            <PostulacionesList
              :items="postulacionesFiltradas"
              :ofertasMap="ofertasMap"
            />

          </div>
        </main>
      </div>

    </div>
  </section>
</template>

