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
  <section class="min-h-screen pt-[96px]">
    <div class="mx-auto max-w-[1240px] px-8 py-10">
      <!-- Header -->
      <header class="mb-10">
        <h1 class="font-heading text-[32px] m-0 mb-2">Mis Postulaciones</h1>
        <p class="m-0 text-white/45">Seguimiento de tus oportunidades</p>
      </header>

      <!-- Layout columns -->
      <div class="flex items-start gap-7">
        <!-- Contenido principal -->
        <main class="min-w-0 flex-1">
          <!-- No autenticado -->
          <div v-if="!isAuthenticated" class="text-[13px] text-white/45">
            Inicia sesión para ver tus postulaciones.
          </div>

          <!-- Cargando -->
          <div v-else-if="loading" class="py-8 text-[13px] text-white/45">
            Cargando postulaciones...
          </div>

          <!-- Error -->
          <div v-else-if="error" class="text-red-500">
            {{ error }}
          </div>

          <!-- Contenido -->
          <div v-else>
            <!-- Results header -->
            <div class="mt-3 mb-5 flex items-center justify-between gap-3">
              <h2 class="font-heading m-0 text-xl">
                {{ stats.total }} Postulaciones
              </h2>
              <div class="text-white/45">
                <span>
                  Mostrando {{ postulacionesFiltradas.length }} de
                  {{ stats.total }}
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
            <PostulacionesFilters v-model="filtroEstado" />

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