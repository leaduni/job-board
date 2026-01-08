<template>
  <aside class="flex flex-col gap-[18px] text-white/[0.95] sticky top-[80px]">
    <div class="p-[18px] bg-gradient-to-b from-[#17102C]/80 to-[#120D26]/90 rounded-[12px] border-2 border-[#b62667] shadow-[0_12px_36px_rgba(6,6,28,0.6)]">
      <h3 class="mb-[12px] font-bold">¿Te interesa este puesto?</h3>

      <button
        class="w-full py-[10px] px-[12px] rounded-[10px] bg-gradient-to-r from-[#a0218b] to-[#b62667] text-white font-bold cursor-pointer shadow-[0_6px_18px_rgba(182,38,103,0.18)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(182,38,103,0.2)] mb-[14px]"
        :disabled="yaPostulado || postulando"
        @click="$emit('postular')"
      >
        {{ yaPostulado ? 'Ya postulado' : postulando ? 'Postulando...' : 'Postular a esta oferta' }}
      </button>

      <div class="flex gap-[10px]">
        <button class="flex-1 w-full py-[10px] px-[12px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] text-[rgba(255,255,255,0.95)] text-[13px] cursor-pointer hover:bg-white/[0.08]" @click="$emit('guardar')">Guardar</button>
        <button class="flex-1 w-full py-[10px] px-[12px] rounded-[9px] bg-white/[0.04] border border-white/[0.08] text-[rgba(255,255,255,0.95)] text-[13px] cursor-pointer hover:bg-white/[0.08]" @click="$emit('compartir')">Compartir</button>
      </div>

      <p v-if="mensaje" class="text-white/[0.45] text-[13px]">{{ mensaje }}</p>
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
