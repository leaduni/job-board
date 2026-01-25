<template>
  <section class="flex items-center justify-between gap-[18px] p-[22px] rounded-[12px] bg-gradient-to-t from-[rgba(18,13,38,0.92)] to-[rgba(23,16,44,0.88)] border-2 border-[#b62667] shadow-[0_20px_60px_rgba(6,6,28,0.6)]" v-if="oferta">
    <div class="flex gap-[18px] items-start flex-1 min-w-0">
      <!-- Logo -->
      <div class="w-12 h-12 lg:w-[84px] lg:h-[84px] aspect-square rounded-[12px] overflow-hidden flex items-center justify-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] flex-shrink-0">
        <!-- Si luego tienes logo real, cambias esto por <img :src="..." /> -->
        <img
          v-if="logoUrl"
          :src="logoUrl"
          alt="Logo empresa"
          class="w-full h-full object-cover"
        />
        <div v-else class="text-lg font-bold">
          {{ inicialEmpresa }}
        </div>
      </div>

      <!-- Título + empresa + meta -->
      <div class="flex flex-col flex-1 min-w-0">
        <h1 class="font-['League_Spartan'] text-[28px] mb-[8px] text-[var(--text)] leading-[1.03]">{{ oferta.titulo }}</h1>

        <div class="text-[var(--muted-2)] text-[14px] flex gap-[8px] items-center mb-[8px] flex-wrap">
          <span class="font-bold text-[var(--accent-pink-2)]">{{ oferta.company?.nombre_comercial || 'Empresa' }}</span>
          <span class="text-[rgba(255,255,255,0.16)] mx-[6px]">•</span>
          <span class="text-[var(--muted-2)]">{{ publicadoTexto }}</span>
        </div>

        <!-- Tags / pills -->
        <div class="flex gap-[10px] items-center flex-wrap">
          <span class="inline-flex items-center justify-center py-[6px] px-[10px] rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[var(--muted-2)] text-[12px] leading-none mr-[8px] whitespace-nowrap transition-all duration-100 ease-in-out hover:bg-[rgba(255,255,255,0.04)] hover:-translate-y-px" v-if="oferta.tipo_contrato">{{ contratoTexto }}</span>
          <span class="inline-flex items-center justify-center py-[6px] px-[10px] rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[var(--muted-2)] text-[12px] leading-none mr-[8px] whitespace-nowrap transition-all duration-100 ease-in-out hover:bg-[rgba(255,255,255,0.04)] hover:-translate-y-px" v-if="oferta.modalidad">{{ oferta.modalidad }}</span>
          <span class="inline-flex items-center justify-center py-[6px] px-[10px] rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[var(--muted-2)] text-[12px] leading-none mr-[8px] whitespace-nowrap transition-all duration-100 ease-in-out hover:bg-[rgba(255,255,255,0.04)] hover:-translate-y-px" v-if="oferta.estado" :class="estadoClasses">{{ estadoTexto }}</span>
          <span class="inline-flex items-center justify-center py-[6px] px-[10px] rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[var(--muted-2)] text-[12px] leading-none mr-[8px] whitespace-nowrap transition-all duration-100 ease-in-out hover:bg-[rgba(255,255,255,0.04)] hover:-translate-y-px" v-if="oferta.nivel_experiencia">{{ experienciaTexto }}</span>
        </div>
      </div>
    </div>

    <!-- Right slot (opcional): botones guardar/compartir, etc. -->
    <div class="flex gap-[8px] items-center">
      <slot name="actions" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  oferta: { type: Object, required: true },
});

// Por ahora: logo null en tu JSON => fallback
const logoUrl = computed(() => props.oferta?.company?.logo || null);

const inicialEmpresa = computed(() => {
  const n = props.oferta?.company?.nombre_comercial?.trim();
  return n ? n.slice(0, 1).toUpperCase() : 'E';
});

// Texto "Publicado hace X días" (simple, luego lo mejoramos)
const publicadoTexto = computed(() => {
  const fecha = props.oferta?.fecha_publicacion;
  if (!fecha) return 'Publicado recientemente';
  try {
    const d = new Date(fecha);
    const diffMs = Date.now() - d.getTime();
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    if (days === 0) return 'Publicado hoy';
    if (days === 1) return 'Publicado hace 1 día';
    return `Publicado hace ${days} días`;
  } catch {
    return 'Publicado recientemente';
  }
});

const estadoTexto = computed(() => {
  const e = props.oferta?.estado;
  if (!e) return '';
  // tu backend usa 'activa', 'cerrada'...
  return e === 'activa' ? 'Oferta Activa' : e === 'cerrada' ? 'Oferta Cerrada' : e;
});

const estadoClasses = computed(() => {
  switch (props.oferta?.estado) {
    case 'activa':
      return 'bg-[rgba(var(--state-bg-deep),_0.18)] text-[var(--state-green)] border border-[rgba(22,199,132,0.16)] py-[6px] px-[10px] rounded-[10px] font-bold text-[12px] inline-block shadow-[inset_0_1px_0_rgba(255,255,255,0.02),_0_8px_18px_rgba(3,45,36,0.45)]';
    case 'cerrada':
      return 'bg-gradient-to-r from-[#6b7280] to-[#4b5563] text-[#111827]';
    default:
      return 'bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white';
  }
});

// Mappers simples (luego los refinamos)
const contratoTexto = computed(() => {
  const v = props.oferta?.tipo_contrato;
  if (!v) return '';
  const map = {
    practicas_pre: 'Prácticas (Pre)',
    practicas_pro: 'Prácticas (Pro)',
    tiempo_completo: 'Tiempo Completo',
    medio_tiempo: 'Medio Tiempo',
    freelance: 'Freelance',
  };
  return map[v] || v.replace(/_/g, ' ');
});

const experienciaTexto = computed(() => {
  const v = props.oferta?.nivel_experiencia;
  if (!v) return '';
  const map = {
    'sin_experiencia': 'Sin experiencia',
    'menos_1_anio': 'Menos de 1 año',
    '1_3_anios': '1 - 3 años',
    'mas_3_anios': 'Más de 3 años',
  };
  return map[v] || v.replace(/_/g, ' '); // Fallback to replacing underscores if not in map
});
</script>
