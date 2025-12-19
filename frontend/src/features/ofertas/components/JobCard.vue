<template>
  <article :class="['oferta-card', { 'oferta-featured': oferta.destacado }]">
    <!-- Header -->
    <div class="card-header">
      <div class="card-info">
        <div class="card-avatar" v-if="oferta.logo">
          <img :src="oferta.logo" alt="" />
        </div>
        <h3 class="card-title">{{ oferta.titulo }}</h3>
        <p class="card-company">{{ oferta.company?.nombre_comercial }}</p>
      </div>

      <!-- Estado -->
      <div class="card-right">
        <span v-if="oferta.estado" class="estado-badge" :class="estadoClasses">
          {{ oferta.estado }}
        </span>
      </div>
    </div>

    <!-- Meta info -->
    <div class="card-meta">
      <div class="meta-item">
        <span class="pill">{{ oferta.modalidad }}</span>
      </div>
      <div class="meta-item">
        <span class="pill">{{ oferta.nivel_experiencia }}</span>
      </div>
    </div>

    <!-- Descripción -->
    <p class="card-desc">
      {{ descripcionCorta }}
    </p>

    <!-- Acción -->
    <router-link :to="`/ofertas/${oferta.id}`" class="card-action">
      <button class="btn-primary">Ver detalles</button>
    </router-link>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  oferta: {
    type: Object,
    required: true,
  },
});

const descripcionCorta = computed(() => {
  return (
    props.oferta?.descripcion?.root?.children?.[0]?.children?.[0]?.text ||
    'Sin descripción disponible'
  );
});

const estadoClasses = computed(() => {
  switch (props.oferta.estado) {
    case 'activa':
      return 'estado-activa';
    case 'cerrada':
      return 'estado-cerrada';
    default:
      return 'estado-default';
  }
});
</script>