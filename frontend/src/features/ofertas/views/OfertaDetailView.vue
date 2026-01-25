<template>
  <section class="min-h-screen pt-[calc(var(--nav-height)+24px)] pb-[56px]">
    <div class="max-w-[var(--container-max)] mx-auto py-[40px] px-[32px] lg:py-[28px] lg:px-[20px]">

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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <!-- Columna Izquierda (Header, Contenido, Skills) -->
          <div class="contents md:flex md:flex-col md:col-span-2 gap-6">
            <OfferHeader :oferta="oferta" class="order-1 w-full" />
            <OfferMainContent :oferta="oferta" class="order-2 w-full" />
            <SkillGapBridge class="order-4 w-full" />
          </div>

          <!-- Columna Derecha (Acciones, Resumen) -->
          <div class="contents md:flex md:flex-col md:col-span-1 gap-6">
            <OfferApplySidebar
              :oferta="oferta"
              :yaPostulado="yaPostulado"
              :postulando="postulando"
              :mensaje="mensaje"
              @postular="postular"
              @guardar="guardarOferta"
              @compartir="compartirOferta"
              class="order-3 w-full"
            />
            <OfferSummaryCard :oferta="oferta" class="order-5 w-full" />
          </div>
        </div>
      </template>

      <!-- Error / empty -->
      <p v-else class="text-[var(--muted-2)] text-[13px]">
        No se pudo cargar la oferta.
      </p>

    </div>

    <RedirectionModal
      v-if="showRedirectionModal"
      :company-name="oferta.company?.nombre_comercial || 'la empresa'"
      @close="showRedirectionModal = false"
      @confirm="handleRedirectionConfirm"
    />

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RedirectionModal from '@/components/modals/RedirectionModal.vue'

const showRedirectionModal = ref(false)

// Servicios
import { obtenerOfertaPorId } from '../services/ofertas.service'

// Componentes
import OfferHeader from '../components/detail/OfferHeader.vue'
import OfferMainContent from '../components/detail/OfferMainContent.vue'
import OfferApplySidebar from '../components/detail/OfferApplySidebar.vue'
import OfferSummaryCard from '../components/detail/OfferSummaryCard.vue'
import SkillGapBridge from '../../capacitate/components/SkillGapBridge.vue'

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

function handleRedirectionConfirm() {
  // La lógica de console.log está en el modal.
  // Aquí solo cerramos y podemos añadir notificaciones en el futuro.
  showRedirectionModal.value = false
  // alert('Función en desarrollo')
}


async function postular() {
  if (!oferta.value) return

  // ✨ Mostrar modal de redirección para flujo externo
  showRedirectionModal.value = true
}

</script>
