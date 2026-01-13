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
  <div class="grid grid-cols-4 gap-[18px] mt-6 mb-7">
    <div
      class="rounded-2xl border-[1.5px] border-[rgba(255,255,255,0.18)] bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.9)] px-[22px] py-5 text-white shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
    >
      <span class="mb-1.5 block text-[13px] font-semibold">Total</span>
      <span class="block font-heading text-[28px] font-extrabold">{{ total }}</span>
    </div>

    <div
      class="rounded-2xl border-[1.5px] border-[rgba(255,193,7,0.45)] bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.9)] px-[22px] py-5 text-[#facc15] shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
    >
      <span class="mb-1.5 block text-[13px] font-semibold">En proceso</span>
      <span class="block font-heading text-[28px] font-extrabold">{{ enProceso }}</span>
    </div>

    <div
      class="rounded-2xl border-[1.5px] border-[rgba(22,199,132,0.45)] bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.9)] px-[22px] py-5 text-[#16c784] shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
    >
      <span class="mb-1.5 block text-[13px] font-semibold">Enviadas</span>
      <span class="block font-heading text-[28px] font-extrabold">{{ enviadas }}</span>
    </div>

    <div
      class="rounded-2xl border-[1.5px] border-[rgba(239,68,68,0.45)] bg-gradient-to-b from-[rgba(23,16,44,0.85)] to-[rgba(18,13,38,0.9)] px-[22px] py-5 text-[#f87171] shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
    >
      <span class="mb-1.5 block text-[13px] font-semibold">Cerradas</span>
      <span class="block font-heading text-[28px] font-extrabold">{{ cerradas }}</span>
    </div>
  </div>
</template>
