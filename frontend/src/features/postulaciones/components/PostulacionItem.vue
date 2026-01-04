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
  <article class="postulacion-item">
    <!-- Lado izquierdo: info principal -->
    <div class="item-main">
        <h3 class="item-title">
            {{ oferta?.titulo || `Oferta #${postulacion.oferta_id}` }}
        </h3>

        <p class="item-subtitle">
            {{ oferta?.company?.nombre_comercial || `Empresa #${postulacion.empresa_id}` }}
        </p>

      <p class="item-meta">
        Postulado el {{ fechaPostulacion }}
      </p>
    </div>

    <!-- Lado derecho: estado -->
    <div class="item-status">
      <StatusBadge :status="postulacion.estado" />
    </div>
  </article>
</template>

<style scoped>
/* Estilos mínimos solo para estructura */
.postulacion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.item-subtitle {
  font-size: 0.875rem;
  opacity: 0.85;
  margin: 0.25rem 0;
}

.item-meta {
  font-size: 0.75rem;
  opacity: 0.7;
  margin: 0;
}

.item-status {
  margin-left: 1rem;
}
</style>
