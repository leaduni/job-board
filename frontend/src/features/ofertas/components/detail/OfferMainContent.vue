<template>
  <section class="bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.92)] rounded-[12px] px-[28px] py-[26px] border-2 border-[#b62667] shadow-[0_20px_60px_rgba(6,6,28,0.6)]" v-if="oferta">
    <!-- Acerca del puesto -->
    <div class="bg-transparent mb-[20px]">
      <h2 class="font-heading text-2xl mb-[12px] text-[rgba(255,255,255,0.95)]">Acerca del Puesto</h2>

      <div class="text-[rgba(255,255,255,0.45)] leading-[1.65] mb-[18px] whitespace-pre-line">
        {{ descripcionTexto }}
      </div>
    </div>

    <!-- 2 columnas: Requisitos y otros detalles -->
    <div class="bg-transparent mb-[20px] grid grid-cols-1 md:grid-cols-2 gap-[22px] mt-[12px]">
      <!-- Requisitos -->
      <div>
        <h3 class="text-[16px] text-lead-500 mb-[10px] font-bold">Requisitos</h3>

        <div class="text-[rgba(255,255,255,0.45)] whitespace-pre-line" v-if="requisitosTexto">
          {{ requisitosTexto }}
        </div>
        
        <p v-else class="text-[rgba(255,255,255,0.45)]">
          No especificados
        </p>
      </div>

      <!-- Carreras Objetivo (Nuevo) -->
      <div>
        <h3 class="text-[16px] text-lead-500 mb-[10px] font-bold">Carreras Afines</h3>

        <div class="text-[rgba(255,255,255,0.45)]" v-if="carrerasTexto">
          {{ carrerasTexto }}
        </div>

        <p v-else class="text-[rgba(255,255,255,0.45)]">
          Todas las carreras
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

// Función auxiliar para extraer texto de Rich Text (Payload CMS)
function extractTextFromRichText(richText) {
  if (!richText || !richText.root || !richText.root.children) return '';
  
  return richText.root.children.map(node => {
    if (node.children) {
      return node.children.map(child => child.text || '').join('');
    }
    return '';
  }).join('\n\n');
}

// Extrae texto de la descripción
const descripcionTexto = computed(() => {
  if (typeof props.oferta?.descripcion === 'string') {
    return props.oferta.descripcion;
  }
  return extractTextFromRichText(props.oferta?.descripcion) || 'Sin descripción disponible.';
});

// Requisitos raw
const requisitosTexto = computed(() => {
  if (typeof props.oferta?.requisitos === 'string') {
    return props.oferta.requisitos;
  }
  return extractTextFromRichText(props.oferta?.requisitos);
});

// Carreras (en API viene como string simple "carreras_afines")
const carrerasTexto = computed(() => {
  return props.oferta?.carreras_afines || '';
});

</script>
