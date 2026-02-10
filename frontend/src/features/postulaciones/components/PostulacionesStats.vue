<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
  enviadas: {
    type: Number,
    required: true,
  },
  enProceso: {
    type: Number,
    required: true,
  },
  cerradas: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mt-6 mb-7">
    <div
      class="rounded-xl border border-white/10 bg-[#121225] p-4 text-white shadow-lg"
    >
      <span class="mb-1 block text-xs font-semibold text-white/60 uppercase tracking-wider">Total</span>
      <span class="block font-['League_Spartan'] text-3xl font-bold">{{ total }}</span>
    </div>

    <div
      class="rounded-xl border border-yellow-500/20 bg-[#121225] p-4 text-yellow-400 shadow-lg"
    >
      <span class="mb-1 block text-xs font-semibold text-yellow-400/60 uppercase tracking-wider">En proceso</span>
      <span class="block font-['League_Spartan'] text-3xl font-bold">{{ enProceso }}</span>
    </div>

    <div
      class="rounded-xl border border-emerald-500/20 bg-[#121225] p-4 text-emerald-400 shadow-lg"
    >
      <span class="mb-1 block text-xs font-semibold text-emerald-400/60 uppercase tracking-wider">Enviadas</span>
      <span class="block font-['League_Spartan'] text-3xl font-bold">{{ enviadas }}</span>
    </div>

    <div
      class="rounded-xl border border-red-500/20 bg-[#121225] p-4 text-red-400 shadow-lg"
    >
      <span class="mb-1 block text-xs font-semibold text-red-400/60 uppercase tracking-wider">Cerradas</span>
      <span class="block font-['League_Spartan'] text-3xl font-bold">{{ cerradas }}</span>
    </div>
  </div>
</template>
