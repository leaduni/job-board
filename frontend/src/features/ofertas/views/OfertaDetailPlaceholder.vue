<template>
  <div class="p-6">
    <h1 class="text-xl font-semibold">Detalle de oferta</h1>
    <p class="text-gray-600">ID: {{ id }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
})
</script>
