<template>
  <section class="bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.92)] rounded-[12px] px-[24px] sm:px-[28px] py-[24px] sm:py-[28px] border-2 border-[#a6249d] shadow-[0_20px_60px_rgba(6,6,28,0.6)]" v-if="oferta">
    <!-- Acerca del puesto -->
    <div class="mb-[24px]">
      <h2 class="font-heading text-xl sm:text-2xl mb-[14px] text-white font-bold">Acerca del Puesto</h2>

      <div class="text-[rgba(255,255,255,0.92)] text-[15px] sm:text-base leading-[1.8] mb-0 whitespace-pre-line max-w-3xl">
        {{ descripcionTexto }}
      </div>
    </div>

    <!-- 2 columnas: Requisitos y Carreras Afines -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[24px] pt-[20px] border-t border-white/10">
      <!-- Requisitos -->
      <div class="bg-white/[0.03] rounded-xl p-[18px] border border-white/5">
        <h3 class="text-[15px] sm:text-base text-[#ff6ec7] mb-[12px] font-bold tracking-wide">Requisitos</h3>

        <div class="text-[rgba(255,255,255,0.88)] text-[14px] sm:text-[15px] leading-[1.75] whitespace-pre-line" v-if="requisitosTexto">
          {{ requisitosTexto }}
        </div>
        
        <p v-else class="text-[rgba(255,255,255,0.7)] text-sm italic">
          No especificados
        </p>
      </div>

      <!-- Carreras Afines -->
      <div class="bg-white/[0.03] rounded-xl p-[18px] border border-white/5">
        <h3 class="text-[15px] sm:text-base text-[#ff6ec7] mb-[12px] font-bold tracking-wide">Carreras Afines</h3>

        <div class="text-[rgba(255,255,255,0.88)] text-[14px] sm:text-[15px] leading-[1.75] whitespace-pre-line" v-if="carrerasTexto">
          {{ carrerasTexto }}
        </div>

        <p v-else class="text-[rgba(255,255,255,0.7)] text-sm italic">
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

// Requisitos: separa por punto seguido de mayúscula (nueva oración) o por párrafos.
// NO separa por comas, ya que se usan dentro de un mismo requisito (ej: "7mo, 8vo o 9no ciclo").
function formatRequisitosWithHyphens(text) {
  if (!text || typeof text !== 'string') return '';
  const items = text
    .split(/(?:\.\s*(?=[A-ZÁÉÍÓÚ])|\n\n+)/)
    .map(s => s.trim().replace(/\.$/, ''))
    .filter(Boolean);
  if (items.length === 0) return '';
  return items.map(item => `- ${item}`).join('\n');
}

// Carreras: separa por comas, cada carrera es un ítem distinto
function formatCarrerasWithHyphens(text) {
  if (!text || typeof text !== 'string') return '';
  const items = text
    .split(/[,;\n]+/)
    .map(s => s.trim())
    .filter(Boolean);
  if (items.length === 0) return '';
  return items.map(item => `- ${item}`).join('\n');
}

// Extrae texto de la descripción
const descripcionTexto = computed(() => {
  if (typeof props.oferta?.descripcion === 'string') {
    return props.oferta.descripcion;
  }
  return extractTextFromRichText(props.oferta?.descripcion) || 'Sin descripción disponible.';
});

// Requisitos formateados con guiones para mejor legibilidad
const requisitosTexto = computed(() => {
  let raw = '';
  if (typeof props.oferta?.requisitos === 'string') {
    raw = props.oferta.requisitos;
  } else {
    raw = extractTextFromRichText(props.oferta?.requisitos) || '';
  }
  return formatRequisitosWithHyphens(raw);
});

// Carreras afines formateadas con guiones para mejor legibilidad
const carrerasTexto = computed(() => {
  return formatCarrerasWithHyphens(props.oferta?.carreras_afines || '');
});

</script>
