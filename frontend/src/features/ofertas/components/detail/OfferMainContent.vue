<template>
  <section class="bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.92)] rounded-[12px] px-[28px] py-[26px] border-2 border-[#b62667] shadow-[0_20px_60px_rgba(6,6,28,0.6)]" v-if="oferta">
    <!-- Acerca del puesto -->
    <div class="bg-transparent mb-[20px]">
      <h2 class="font-heading text-2xl mb-[12px] text-[rgba(255,255,255,0.95)]">Acerca del Puesto</h2>

      <p class="text-[rgba(255,255,255,0.45)] leading-[1.65] mb-[18px]">
        {{ descripcionTexto || 'Sin descripción disponible.' }}
      </p>
    </div>

    <!-- 2 columnas: Responsabilidades / Requisitos -->
    <div class="bg-transparent mb-[20px] grid grid-cols-2 gap-[22px] mt-[12px]">
      <!-- Responsabilidades (placeholder por ahora) -->
      <div>
        <h3 class="text-[16px] text-lead-500 mb-[10px] font-bold">Responsabilidades</h3>

        <ul class="m-0 pl-[18px] text-[rgba(255,255,255,0.45)] list-disc" v-if="responsabilidades.length">
          <li v-for="(item, idx) in responsabilidades" :key="idx">{{ item }}</li>
        </ul>

        <p v-else class="text-[rgba(255,255,255,0.45)]">
          (Pendiente de contenido / backend)
        </p>
      </div>

      <!-- Requisitos -->
      <div>
        <h3 class="text-[16px] text-lead-500 mb-[10px] font-bold">Requisitos</h3>

        <ul class="m-0 pl-[18px] text-[rgba(255,255,255,0.45)] list-disc" v-if="requisitosList.length">
          <li v-for="(item, idx) in requisitosList" :key="idx">{{ item }}</li>
        </ul>

        <p v-else class="text-[rgba(255,255,255,0.45)]">
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
