<template>
  <div class="flex items-center justify-center gap-2 mt-10">

    <!-- Botón anterior -->
    <button
      class="px-3 py-2 rounded-lg border border-gray-700 text-gray-300
             hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      ‹
    </button>

    <!-- Páginas -->
    <button
      v-for="page in totalPages"
      :key="page"
      class="px-4 py-2 rounded-lg border text-sm font-medium"
      :class="page === currentPage
        ? 'bg-purple-600 border-purple-600 text-white'
        : 'border-gray-700 text-gray-300 hover:bg-gray-800'"
      @click="$emit('update:page', page)"
    >
      {{ page }}
    </button>

    <!-- Botón siguiente -->
    <button
      class="px-3 py-2 rounded-lg border border-gray-700 text-gray-300
             hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      ›
    </button>

  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})
</script>
