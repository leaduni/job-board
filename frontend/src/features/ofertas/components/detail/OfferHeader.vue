<template>
  <section class="offer-header-card" v-if="oferta">
    <div class="offer-header-left">
      <!-- Logo -->
      <div class="offer-logo">
        <!-- Si luego tienes logo real, cambias esto por <img :src="..." /> -->
        <img
          v-if="logoUrl"
          :src="logoUrl"
          alt="Logo empresa"
        />
        <div v-else class="offer-logo-fallback">
          {{ inicialEmpresa }}
        </div>
      </div>

      <!-- Título + empresa + meta -->
      <div class="offer-title-area">
        <h1 class="offer-title">{{ oferta.titulo }}</h1>

        <div class="offer-company">
          <span class="company-name">{{ oferta.company?.nombre_comercial || 'Empresa' }}</span>
          <span class="dot">•</span>
          <span class="muted">{{ publicadoTexto }}</span>
        </div>

        <!-- Tags / pills -->
        <div class="offer-tags">
          <span class="pill" v-if="oferta.tipo_contrato">{{ contratoTexto }}</span>
          <span class="pill" v-if="oferta.modalidad">{{ oferta.modalidad }}</span>
          <span class="pill" v-if="oferta.estado" :class="estadoClasses">{{ estadoTexto }}</span>
          <span class="pill" v-if="oferta.nivel_experiencia">{{ experienciaTexto }}</span>
        </div>
      </div>
    </div>

    <!-- Right slot (opcional): botones guardar/compartir, etc. -->
    <div class="offer-header-right">
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
      return 'estado-activa';
    case 'cerrada':
      return 'estado-cerrada';
    default:
      return 'estado-default';
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
  return map[v] || v;
});

const experienciaTexto = computed(() => {
  const v = props.oferta?.nivel_experiencia;
  if (!v) return '';
  const map = {
    '0_1_anio': 'Nivel Junior',
    '1_3_anios': '1 - 3 años',
    '3_5_anios': '3 - 5 años',
  };
  return map[v] || v;
});
</script>
