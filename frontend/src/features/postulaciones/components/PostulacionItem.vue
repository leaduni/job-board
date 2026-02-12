<script setup>
import { computed, ref } from 'vue'
import StatusBadge from './StatusBadge.vue'
import { coreApi } from '@/services/coreApi'

const props = defineProps({
  postulacion: Object,
})

const isUpdating = ref(false)

// Fecha formateada simple
const fechaPostulacion = computed(() => {
  if (!props.postulacion.created_at) return '-'
  const date = new Date(props.postulacion.created_at)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
})

const canCancel = computed(() => {
  return !['cerrada', 'rechazada'].includes(props.postulacion.estado)
})

async function cancelarPostulacion() {
  if (!confirm('¿Estás seguro de que deseas retirar esta postulación?')) return
  
  isUpdating.value = true
  try {
    const { data } = await coreApi.patch(`/api/postulaciones/${props.postulacion.id}/estado`, {
      estado: 'cerrada'
    })
    props.postulacion.estado = data.estado
  } catch (error) {
    console.error('Error actualizando estado:', error)
    alert('No se pudo actualizar el estado')
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <article class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg bg-[#16162a] border border-white/5 p-5 transition-colors hover:border-[#a6249d]/30">
    <!-- Lado izquierdo: info principal -->
    <div class="flex-grow">
        <h3 class="m-0 text-lg font-bold text-white mb-1">
            <router-link :to="`/ofertas/${postulacion.oferta_id}`" class="hover:text-[#ff6ec7] transition-colors">
              {{ postulacion.titulo || `Oferta #${postulacion.oferta_id}` }}
            </router-link>
        </h3>

        <p class="text-sm text-white/60 mb-2 font-medium">
            {{ postulacion.nombre_comercial || `Empresa #${postulacion.empresa_id}` }}
        </p>

      <p class="text-xs text-white/40">
        Postulado el {{ fechaPostulacion }}
      </p>
    </div>

    <!-- Lado derecho: estado y acciones -->
    <div class="flex items-center gap-4 self-end sm:self-auto">
      <StatusBadge :status="postulacion.estado" />
      
      <button 
        v-if="canCancel"
        @click="cancelarPostulacion"
        :disabled="isUpdating"
        class="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-all border border-transparent hover:border-red-500/20"
        title="Retirar postulación"
      >
        {{ isUpdating ? '...' : 'Retirar' }}
      </button>
    </div>
  </article>
</template>
