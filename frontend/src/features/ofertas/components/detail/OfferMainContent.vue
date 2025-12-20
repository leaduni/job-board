<template>
  <section class="offer-main-card" v-if="oferta">
    <!-- Acerca del puesto -->
    <div class="offer-section">
      <h2 class="section-title">Acerca del Puesto</h2>

      <p class="offer-description">
        {{ descripcionTexto || 'Sin descripción disponible.' }}
      </p>
    </div>

    <!-- 2 columnas: Responsabilidades / Requisitos -->
    <div class="offer-section two-columns">
      <!-- Responsabilidades (placeholder por ahora) -->
      <div class="offer-col">
        <h3 class="sub-title">Responsabilidades</h3>

        <ul v-if="responsabilidades.length">
          <li v-for="(item, idx) in responsabilidades" :key="idx">{{ item }}</li>
        </ul>

        <p v-else class="muted">
          (Pendiente de contenido / backend)
        </p>
      </div>

      <!-- Requisitos -->
      <div class="offer-col">
        <h3 class="sub-title">Requisitos</h3>

        <ul v-if="requisitosList.length">
          <li v-for="(item, idx) in requisitosList" :key="idx">{{ item }}</li>
        </ul>

        <p v-else class="muted">
          Sin requisitos registrados.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  oferta: { type: Object, required: true },
});

// Extrae texto simple (tu misma lógica actual)
const descripcionTexto = computed(() => {
  return (
    props.oferta?.descripcion?.root?.children?.[0]?.children?.[0]?.text ||
    ''
  );
});

// Requisitos: ahora viene como rich text similar
const requisitosTexto = computed(() => {
  return (
    props.oferta?.requisitos?.root?.children?.[0]?.children?.[0]?.text ||
    ''
  );
});

// Convertimos requisitos a lista (simple por ahora)
// Si luego viene con saltos de línea o items, esto ya te sirve.
const requisitosList = computed(() => {
  const txt = requisitosTexto.value.trim();
  if (!txt) return [];
  // separa por saltos o puntos y coma (ajustable)
  return txt
    .split(/\n|•|- /g)
    .map(s => s.trim())
    .filter(Boolean);
});

// Placeholder: luego conectar a CMS/Backend
const responsabilidades = computed(() => {
  return [];
});
</script>
