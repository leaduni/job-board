<template>
  <div class="postulaciones-filters">
    <button
      v-for="op in opciones"
      :key="op.value"
      class="filter-btn"
      :class="{ active: modelValue === op.value }"
      @click="$emit('update:modelValue', op.value)"
    >
      {{ op.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
})

const opciones = [
  { label: 'Todas', value: 'all' },
  { label: 'En proceso', value: 'en_proceso' },
  { label: 'Enviadas', value: 'enviada' },
  { label: 'Cerradas', value: 'cerrada' },
]
</script>
