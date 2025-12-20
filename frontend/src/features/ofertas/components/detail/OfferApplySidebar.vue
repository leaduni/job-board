<template>
  <aside class="offer-aside">
    <div class="apply-box">
      <h3 class="apply-title">¿Te interesa este puesto?</h3>

      <button
        class="btn-primary btn-apply"
        :disabled="yaPostulado || postulando"
        @click="$emit('postular')"
      >
        {{ yaPostulado ? 'Ya postulado' : postulando ? 'Postulando...' : 'Postular a esta oferta' }}
      </button>

      <div class="apply-actions">
        <button class="btn-secondary" @click="$emit('guardar')">Guardar</button>
        <button class="btn-secondary" @click="$emit('compartir')">Compartir</button>
      </div>

      <p v-if="mensaje" class="text-muted">{{ mensaje }}</p>
    </div>

    <slot />
  </aside>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
  oferta: { type: Object, required: true },
  yaPostulado: { type: Boolean, default: false },
  postulando: { type: Boolean, default: false },
  mensaje: { type: String, default: '' },
});

const emit = defineEmits(['postular', 'guardar', 'compartir']);

const disabled = computed(() => props.postulando || props.yaPostulado);

const textoBoton = computed(() => {
  if (props.yaPostulado) return 'Ya postulado';
  if (props.postulando) return 'Postulando...';
  return 'Postular a esta oferta';
});

function onPostular() {
  emit('postular');
}

function onGuardar() {
  emit('guardar');
}

function onCompartir() {
  emit('compartir');
}
</script>
