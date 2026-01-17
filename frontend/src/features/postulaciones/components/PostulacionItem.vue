<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  postulacion: Object,
  oferta: Object,
})

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
</script>

<template>
  <article class="flex items-center justify-between rounded-lg bg-white/5 p-4">
    <!-- Lado izquierdo: info principal -->
    <div class="flex-grow">
        <h3 class="m-0 text-base font-semibold">
            {{ oferta?.titulo || `Oferta #${postulacion.oferta_id}` }}
        </h3>

        <p class="my-1 text-sm opacity-85">
            {{ oferta?.company?.nombre_comercial || `Empresa #${postulacion.empresa_id}` }}
        </p>

      <p class="m-0 text-xs opacity-70">
        Postulado el {{ fechaPostulacion }}
      </p>
    </div>

    <!-- Lado derecho: estado -->
    <div class="ml-4">
      <StatusBadge :status="postulacion.estado" />
    </div>
  </article>
</template>
