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
          <div class="flex flex-col gap-[28px]">
            <OfferMainContent :oferta="oferta" />
            <SkillGapBridge />
          </div>

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
import { useRoute, useRouter } from 'vue-router'
import RedirectionModal from '@/components/modals/RedirectionModal.vue'

// Servicios
import { obtenerOfertaPorId } from '../services/ofertas.service'
import { coreApi } from '@/services/coreApi'
import { useAuth } from '@/composables/useAuth'

// Componentes
import OfferHeader from '../components/detail/OfferHeader.vue'
import OfferMainContent from '../components/detail/OfferMainContent.vue'
import OfferApplySidebar from '../components/detail/OfferApplySidebar.vue'
import OfferSummaryCard from '../components/detail/OfferSummaryCard.vue'
import SkillGapBridge from '../../capacitate/components/SkillGapBridge.vue'

// Estado
const route = useRoute()
const router = useRouter()
const { user, isAuthenticated } = useAuth()

const showRedirectionModal = ref(false)
const oferta = ref(null)
const loading = ref(true)

const yaPostulado = ref(false)
const postulando = ref(false)
const mensaje = ref('')

const externalUrl = ref('') // URL para redirección

// Lifecycle
onMounted(async () => {
  try {
    const id = route.params.id
    const data = await obtenerOfertaPorId(id)

    if (data) {
      oferta.value = data
    } else {
      console.error('La API retornó null o undefined')
    }

    // TODO: Verificar si ya postuló (requeriría endpoint adicional)
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
  navigator.clipboard.writeText(window.location.href)
  alert('Enlace copiado al portapapeles')
}

function handleRedirectionConfirm() {
  if (externalUrl.value) {
    window.open(externalUrl.value, '_blank')
  }
  showRedirectionModal.value = false
}


async function postular() {
  if (!oferta.value) return

  // 1. Validar Autenticación
  if (!isAuthenticated.value) {
    router.push('/auth/login')
    return
  }
  
  // 2. Revisar tipo de postulación
  
  // Caso Link Externo
  if (oferta.value.link_postulacion) {
    externalUrl.value = oferta.value.link_postulacion
    showRedirectionModal.value = true
    return
  }

  // Caso Email
  if (oferta.value.email_contacto) {
    window.location.href = `mailto:${oferta.value.email_contacto}?subject=Postulación: ${oferta.value.titulo}`
    return
  }
  
  // 3. Caso Interno (API Postulaciones)
  postulando.value = true
  mensaje.value = ''

  try {
    const payload = {
      oferta_id: oferta.value.id,
      empresa_id: oferta.value.company?.id,
      perfil_id: user.value.id, // ID del usuario autenticado
      estado: 'enviada'
    }

    await coreApi.post('/api/postulaciones', payload)

    yaPostulado.value = true
    mensaje.value = '¡Postulación enviada con éxito!'
    
  } catch (error) {
    console.error('Error al postular:', error)
    mensaje.value = 'Ocurrió un error al enviar tu postulación. Intenta nuevamente.'
  } finally {
    postulando.value = false
  }
}

</script>
