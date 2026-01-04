<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
  enviadas: {
    type: Number,
    required: true,
  },
  enProceso: {
    type: Number,
    required: true,
  },
  cerradas: {
    type: Number,
    required: true,
  },
})
</script>

<template>
    <div class="stats-grid">
        <div class="stat-card stat-total">
            <span class="stat-label">Total</span>
            <span class="stat-value">2</span>
        </div>

        <div class="stat-card stat-proceso">
            <span class="stat-label">En proceso</span>
            <span class="stat-value">0</span>
        </div>

        <div class="stat-card stat-enviadas">
            <span class="stat-label">Enviadas</span>
            <span class="stat-value">2</span>
        </div>

        <div class="stat-card stat-cerradas">
            <span class="stat-label">Cerradas</span>
            <span class="stat-value">0</span>
        </div>
    </div>
</template>

<style scoped>
/* Estilos mínimos solo para estructura visual básica */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
