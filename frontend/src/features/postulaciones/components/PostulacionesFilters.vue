<template>
  <div class="flex gap-3.5 mt-[18px] mb-8">
    <button
      v-for="op in opciones"
      :key="op.value"
      :class="[
        'cursor-pointer rounded-full px-[22px] py-3 text-sm font-bold text-white transition duration-150 ease-in-out hover:-translate-y-px',
        modelValue === op.value
          ? 'border-transparent bg-gradient-to-r from-[#a0218b] to-[#b62667] shadow-[0_10px_30px_rgba(160,33,139,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]'
          : 'border-2 border-[#b62667] bg-black shadow-none',
      ]"
      @click="$emit('update:modelValue', op.value)"
    >
      {{ op.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
})

const opciones = [
  { label: 'Todas', value: 'all' },
  { label: 'En proceso', value: 'en_proceso' },
  { label: 'Enviadas', value: 'enviada' },
  { label: 'Cerradas', value: 'cerrada' },
]
</script>
