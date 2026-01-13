<template>
  <span
    :class="estadoClass"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: String,
})

const label = computed(() => {
  if (props.status === 'enviada') return 'Enviada'
  if (props.status === 'en_proceso') return 'En proceso'
  if (props.status === 'cerrada') return 'Cerrada'
  return props.status
})

const estadoClass = computed(() => {
  if (props.status === 'enviada') { // estado-activa's styles
    return 'inline-block text-xs font-bold py-1.5 px-2.5 rounded-[10px] border border-[rgba(22,199,132,0.16)] bg-[rgba(6,50,43,0.18)] text-[#16c784] shadow-[inset_0_1px_0_rgba(255,255,255,0.02),_0_8px_18px_rgba(3,45,36,0.45)]';
  }
  
  const baseLayout = 'inline-block rounded-full py-1 px-2.5 text-xs font-bold shadow-none';
  const badgeBorder = 'border border-[rgba(16,185,129,0.08)]'; // from estado-badge

  if (props.status === 'cerrada') { // estado-badge layout + estado-cerrada colors
    return `${baseLayout} ${badgeBorder} bg-gradient-to-r from-[#6b7280] to-[#4b5563] text-gray-900`;
  }
  
  // 'en_proceso' and default: estado-badge layout + estado-default colors
  return `${baseLayout} ${badgeBorder} bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white`;
})
</script>