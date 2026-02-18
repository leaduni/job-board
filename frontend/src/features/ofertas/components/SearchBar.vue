<template>
  <div class="relative w-full h-full flex items-center">
    <span class="absolute left-4 flex items-center pointer-events-none" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#a6249d]/70">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="M21 21l-4.35-4.35"></path>
      </svg>
    </span>
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="w-full h-full pl-12 pr-11 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
      aria-label="Buscar ofertas"
    />
    <button
      v-if="modelValue"
      type="button"
      @click="clear"
      class="absolute right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Limpiar búsqueda"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Puesto, empresa o palabra clave...' },
})
const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
function clear() {
  emit('update:modelValue', '')
}
</script>