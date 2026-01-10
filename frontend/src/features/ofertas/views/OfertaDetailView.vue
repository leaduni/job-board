<template>
  <section class="min-h-screen pt-[calc(var(--nav-height)+24px)] pb-[56px]">
    <div class="max-w-[var(--container-max)] mx-auto py-[40px] px-[32px] lg:py-[28px] lg:px-[20px]">

      <!-- Breadcrumb -->
      <nav class="text-[var(--muted-2)] mb-[18px] flex gap-[8px] items-center text-[14px]">
        <router-link to="/ofertas" class="text-[var(--muted-2)] no-underline">Bolsa Laboral</router-link>
        <span class="text-[rgba(255,255,255,0.16)] mx-[6px]">›</span>
        <span>Detalle de Oferta</span>
      </nav>

      <!-- Loading -->
      <p v-if="loading" class="py-[32px] px-0 text-[var(--muted-2)]">
        Cargando oferta...
      </p>

      <!-- Content -->
      <template v-else-if="oferta">

        <!-- Header -->
        <OfferHeader :oferta="oferta">
          <!-- Acciones futuras (guardar / compartir) -->
          <template #actions>
            <!-- reservado -->
          </template>
        </OfferHeader>

        <!-- Main grid -->
        <div class="grid grid-cols-[1fr_360px] gap-[28px] items-start max-[1100px]:grid-cols-1">

          <!-- Columna principal -->
          <OfferMainContent :oferta="oferta" />

          <!-- Sidebar -->
          <OfferApplySidebar
            :oferta="oferta"
            :yaPostulado="yaPostulado"
            :postulando="postulando"
            :mensaje="mensaje"
            @postular="postular"
            @guardar="guardarOferta"
            @compartir="compartirOferta"
          >
            <!-- Summary debajo del CTA -->
            <OfferSummaryCard :oferta="oferta" />
          </OfferApplySidebar>

        </div>
      </template>

      <!-- Error / empty -->
      <p v-else class="text-[var(--muted-2)] text-[13px]">
        No se pudo cargar la oferta.
      </p>

    </div>

    <LoginModal
      :open="showLoginModal"
      @close="showLoginModal = false"
      @success="showLoginModal = false"
    />

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import LoginModal from '@/components/auth/LoginModal.vue'

// Auth (simulado)
const { isAuthenticated, user } = useAuth()
const showLoginModal = ref(false)

// Servicios
import { obtenerOfertaPorId } from '../services/ofertas.service'
import { postularOferta } from '../../postulaciones/services/postulaciones.service'

// Componentes
import OfferHeader from '../components/detail/OfferHeader.vue'
import OfferMainContent from '../components/detail/OfferMainContent.vue'
import OfferApplySidebar from '../components/detail/OfferApplySidebar.vue'
import OfferSummaryCard from '../components/detail/OfferSummaryCard.vue'

// Estado
const route = useRoute()
const oferta = ref(null)
const loading = ref(true)

const yaPostulado = ref(false)
const postulando = ref(false)
const mensaje = ref('')

// Lifecycle
onMounted(async () => {
  try {
    const id = route.params.id
    const data = await obtenerOfertaPorId(id)

    oferta.value = data

    // TODO: cuando exista endpoint real
    yaPostulado.value = false
  } catch (error) {
    console.error('Error cargando oferta:', error)
  } finally {
    loading.value = false
  }
})

function guardarOferta() {
  console.log('Guardar oferta', oferta.value?.id)
  // futuro
}

function compartirOferta() {
  console.log('Compartir oferta', oferta.value?.id)
  // futuro
}

async function postular() {
  if (!oferta.value) return

  // 🔒 1. Validar autenticación
  if (!isAuthenticated.value) {
    showLoginModal.value = true
    return
  }

  // 🧩 2. Postulación real
  try {
    postulando.value = true
    mensaje.value = ''

    await postularOferta(oferta.value)

    yaPostulado.value = true
    mensaje.value = 'Postulación enviada correctamente'
  } catch (error) {
    console.error(error)
    mensaje.value = 'Error al postular. Intenta nuevamente'
  } finally {
    postulando.value = false
  }
}

</script>
