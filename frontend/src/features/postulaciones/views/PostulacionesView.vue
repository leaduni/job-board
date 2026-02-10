<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { coreApi } from "@/services/coreApi"; // Usar coreApi

// componentes
import PostulacionesStats from "../components/PostulacionesStats.vue";
import PostulacionesFilters from "../components/PostulacionesFilters.vue";
import PostulacionesList from "../components/PostulacionesList.vue";

// --- auth ---
const { user, isAuthenticated } = useAuth();

// --- estado ---
const loading = ref(false);
const error = ref(null);
const postulaciones = ref([]);

// filtro activo: 'all' | 'enviada' | 'en_proceso' | 'cerrada'
const filtroEstado = ref("all");

// --- fetch ---
async function cargarPostulaciones() {
  if (!user.value?.id) return;

  loading.value = true;
  error.value = null;

  try {
    const { data } = await coreApi.get("/api/postulaciones", {
      params: { perfil_id: user.value.id },
    });

    // El backend ya devuelve { ..., titulo, nombre_comercial }
    postulaciones.value = data || [];
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar las postulaciones";
  } finally {
    loading.value = false;
  }
}

// --- derivados ---

// postulaciones del perfil autenticado
const postulacionesUsuario = computed(() => {
  return postulaciones.value;
});

// filtradas por estado
const postulacionesFiltradas = computed(() => {
  if (filtroEstado.value === "all") {
    return postulacionesUsuario.value;
  }
  return postulacionesUsuario.value.filter(
    (p) => p.estado === filtroEstado.value,
  );
});

// stats
const stats = computed(() => {
  const total = postulacionesUsuario.value.length;

  const enviadas = postulacionesUsuario.value.filter(
    (p) => p.estado === "enviada",
  ).length;

  const enProceso = postulacionesUsuario.value.filter(
    (p) => p.estado === "en_proceso",
  ).length;

  const cerradas = postulacionesUsuario.value.filter(
    (p) => p.estado === "cerrada",
  ).length;

  return {
    total,
    enviadas,
    enProceso,
    cerradas,
  };
});

// --- lifecycle ---
onMounted(() => {
  if (isAuthenticated.value) {
    cargarPostulaciones();
  }
});

postulaciones.value = data || [];

// Obtener detalles de las ofertas
// Nota: El backend ya filtra, así que 'data' son solo las del usuario
const idsOfertas = [...new Set(postulaciones.value.map((p) => p.oferta_id))];

await Promise.all(idsOfertas.map(cargarOferta));

// --- derivados ---

// postulaciones del perfil autenticado

// filtradas por estado

// stats

const ofertasMap = ref({});

async function cargarOferta(ofertaId) {
  if (ofertasMap.value[ofertaId]) return;

  try {
    // Usar el servicio de ofertas existente o coreApi si es al CMS
    // Asumiendo que /api/projects/:id es del CMS y coreApi apunta al backend core...
    // Espera, el endpoint de ofertas es del CMS.
    // Si 'coreApi' apunta al backend (localhost:3001) y las ofertas están en CMS (railway),
    // necesitamos usar el cliente correcto.

    // Revisando tu código anterior:
    // axios.get(`https://api-leaduni.up.railway.app/api/projects/${ofertaId}`)
    // Eso parece ser el CMS.

    // Voy a mantener axios directo para las ofertas si son del CMS externo,
    // o importar cmsApi si ya lo tienes configurado.
    // Usaré axios directo por seguridad para no romper importaciones circulares,
    // pero idealmente usaría cmsApi.getProjectById(ofertaId).

    // Mejor aún: import { obtenerOfertaPorId } from '@/features/ofertas/services/ofertas.service'

    // Pero para mantener la consistencia con el código original que usaba axios directo a esa URL:
    // (Nota: coreApi apunta a VITE_CORE_API_URL, verifica si es la misma)

    // Asumiré que VITE_CMS_API_URL es la correcta para proyectos.
    const response = await axios.get(
      `${import.meta.env.VITE_CMS_API_URL}/api/projects/${ofertaId}`,
    );
    ofertasMap.value[ofertaId] = response.data;
  } catch (e) {
    console.error("Error cargando oferta", ofertaId);
  }
}

// --- lifecycle ---
onMounted(() => {
  if (isAuthenticated.value) {
    cargarPostulaciones();
  }
});
</script>

<template>
  <section class="min-h-screen pt-[96px] bg-[#09092a] font-sans pb-20">
    <div class="mx-auto max-w-[1240px] px-6 py-8">
      <!-- HEADER -->
      <header class="mb-10 text-center md:text-left">
        <h1 class="font-['League_Spartan'] text-4xl font-bold text-white mb-2">
          Mis Postulaciones
        </h1>
        <p class="text-white/50 text-lg">
          Seguimiento de tus oportunidades laborales
        </p>
      </header>

      <!-- CONTENT STATES -->

      <!-- 1. GUEST STATE (No autenticado) -->
      <div
        v-if="!isAuthenticated"
        class="flex flex-col items-center justify-center py-20 text-center bg-[#121225]/50 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm"
      >
        <div
          class="w-20 h-20 bg-gradient-to-br from-[#a0218b] to-[#5a124d] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#a0218b]/30"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-3">Acceso Requerido</h2>
        <p class="text-white/60 max-w-md mb-8 leading-relaxed">
          Para ver el estado de tus postulaciones y gestionar tus procesos de
          selección, necesitas iniciar sesión en tu cuenta.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center"
        >
          <router-link
            to="/auth/login"
            class="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#a0218b] to-[#b62667] text-white font-bold text-center hover:opacity-90 transition-all shadow-lg shadow-[#a0218b]/20"
          >
            Iniciar Sesión
          </router-link>
          <router-link
            to="/auth/register/estudiante"
            class="flex-1 py-3 px-6 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-center hover:bg-white/10 transition-all"
          >
            Crear Cuenta
          </router-link>
        </div>
      </div>

      <!-- 2. LOADING STATE -->
      <div
        v-else-if="loading"
        class="flex flex-col items-center justify-center py-32"
      >
        <div
          class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#b62667]"
        ></div>
        <p class="mt-4 text-white/50 animate-pulse">
          Cargando tus postulaciones...
        </p>
      </div>

      <!-- 3. ERROR STATE -->
      <div
        v-else-if="error"
        class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-200"
      >
        <p class="font-bold mb-2">Algo salió mal</p>
        <p class="text-sm opacity-80">{{ error }}</p>
        <button
          @click="cargarPostulaciones"
          class="mt-4 text-sm underline hover:text-white"
        >
          Intentar nuevamente
        </button>
      </div>

      <!-- 4. EMPTY STATE (Autenticado pero sin datos) -->
      <div
        v-else-if="postulacionesUsuario.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center bg-[#121225]/50 rounded-3xl border border-white/5 border-dashed"
      >
        <div
          class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-500"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Aún no has postulado</h3>
        <p class="text-white/50 max-w-sm mb-8">
          Explora las ofertas disponibles y da el primer paso hacia tu próximo
          empleo.
        </p>
        <router-link
          to="/ofertas"
          class="py-3 px-8 rounded-xl bg-white text-[#09092a] font-bold hover:bg-gray-100 transition-colors"
        >
          Explorar Ofertas
        </router-link>
      </div>

      <!-- 5. AUTHENTICATED CONTENT (Lista) -->
      <div v-else class="flex flex-col lg:flex-row gap-8 items-start">
        <!-- Main List -->
        <main class="flex-1 w-full">
          <!-- Controls Bar -->
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-[#121225] p-4 rounded-xl border border-white/5"
          >
            <h2 class="text-white font-bold text-lg">
              <span class="text-[#b62667]">{{
                postulacionesFiltradas.length
              }}</span>
              Solicitudes activas
            </h2>

            <!-- Filter Component Wrapper -->
            <div class="w-full sm:w-auto">
              <PostulacionesFilters v-model="filtroEstado" />
            </div>
          </div>

          <!-- List Component -->
          <PostulacionesList :items="postulacionesFiltradas" />
        </main>

        <!-- Sidebar Stats (Desktop only preferably, or stack on mobile) -->
        <aside class="w-full lg:w-80 flex-shrink-0">
          <PostulacionesStats
            :total="stats.total"
            :enviadas="stats.enviadas"
            :enProceso="stats.enProceso"
            :cerradas="stats.cerradas"
          />
        </aside>
      </div>
    </div>
  </section>
</template>
