<script setup>
import PostulacionItem from './PostulacionItem.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  ofertasMap: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <section class="postulaciones-list">
    <!-- Estado vacío -->
    <div v-if="!items || items.length === 0" class="empty-state">
      <h3 class="empty-title">No hay postulaciones</h3>
      <p class="empty-subtitle">
        No encontramos postulaciones para el filtro seleccionado.
      </p>
    </div>

    <!-- Listado -->
    <div v-else class="list-container">
        <PostulacionItem
            v-for="p in items"
            :key="p.id"
            :postulacion="p"
            :oferta="ofertasMap[p.oferta_id]"
        />
    </div>
  </section>
</template>

<style scoped>
/* Estilos mínimos solo para estructura */
.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  padding: 1.25rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.empty-subtitle {
  margin: 0;
  opacity: 0.8;
  font-size: 0.875rem;
}
</style>
