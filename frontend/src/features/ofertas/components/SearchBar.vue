<template>
  <div class="relative w-full h-full">
    <span class="absolute left-4 inset-y-0 flex items-center" aria-hidden="true">
      <!-- ícono lupa -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="text-gray-400">
        <circle cx="11" cy="11" r="6"></circle>
        <path d="M21 21l-4.35-4.35"></path>
      </svg>
    </span>

    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Buscar por puesto, empresa o palabra clave..."
      class="w-full h-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
      aria-label="Buscar ofertas"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
defineEmits(['update:modelValue'])
</script>