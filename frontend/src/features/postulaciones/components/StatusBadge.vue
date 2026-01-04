<template>
  <span
    class="estado-badge"
    :class="estadoClass"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: String,
})

const label = computed(() => {
  if (props.status === 'enviada') return 'Enviada'
  if (props.status === 'en_proceso') return 'En proceso'
  if (props.status === 'cerrada') return 'Cerrada'
  return props.status
})

const estadoClass = computed(() => {
  if (props.status === 'enviada') return 'estado-activa'
  if (props.status === 'cerrada') return 'estado-cerrada'
  return 'estado-default'
})
</script>
