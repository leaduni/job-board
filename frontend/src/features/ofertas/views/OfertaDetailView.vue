<template>
  <section class="page-section offer-detail-layout">
    <div class="container">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/ofertas">Bolsa Laboral</router-link>
        <span class="dot">›</span>
        <span>Detalle de Oferta</span>
      </nav>

      <!-- Loading -->
      <p v-if="loading" class="loading">
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
        <div class="offer-grid">

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
      <p v-else class="text-muted">
        No se pudo cargar la oferta.
      </p>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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

// Acciones
async function postular() {
  if (!oferta.value) return

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

function guardarOferta() {
  console.log('Guardar oferta', oferta.value?.id)
  // futuro
}

function compartirOferta() {
  console.log('Compartir oferta', oferta.value?.id)
  // futuro
}
</script>
