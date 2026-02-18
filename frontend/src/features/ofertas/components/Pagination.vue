<template>
  <div class="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 flex-wrap">

    <!-- Botón anterior -->
    <button
      class="px-3 py-2.5 sm:py-2 rounded-lg border border-gray-700 text-gray-300 text-sm
             hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] sm:min-h-0"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
      aria-label="Página anterior"
    >
      ‹
    </button>

    <!-- En móvil: solo mostrar página actual cuando hay muchas páginas -->
    <template v-if="totalPages <= 5">
      <button
        v-for="page in totalPages"
        :key="page"
        class="px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border text-sm font-medium min-w-[44px] sm:min-w-0 min-h-[44px] sm:min-h-0"
        :class="page === currentPage
          ? 'bg-purple-600 border-purple-600 text-white'
          : 'border-gray-700 text-gray-300 hover:bg-gray-800'"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </button>
    </template>
    <template v-else>
      <!-- Versión compacta: Primera, ..., actual, ..., última -->
      <button
        v-if="currentPage > 2"
        class="hidden sm:inline-flex px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
        @click="$emit('update:page', 1)"
      >
        1
      </button>
      <span v-if="currentPage > 3" class="hidden sm:inline px-1 text-gray-500">…</span>
      <button
        v-for="p in visiblePages"
        :key="p"
        class="px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border text-sm font-medium min-w-[44px] sm:min-w-0 min-h-[44px] sm:min-h-0"
        :class="p === currentPage
          ? 'bg-purple-600 border-purple-600 text-white'
          : 'border-gray-700 text-gray-300 hover:bg-gray-800'"
        @click="$emit('update:page', p)"
      >
        {{ p }}
      </button>
      <span v-if="currentPage < totalPages - 2" class="hidden sm:inline px-1 text-gray-500">…</span>
      <button
        v-if="currentPage < totalPages - 1"
        class="hidden sm:inline-flex px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
        @click="$emit('update:page', totalPages)"
      >
        {{ totalPages }}
      </button>
    </template>

    <!-- Botón siguiente -->
    <button
      class="px-3 py-2.5 sm:py-2 rounded-lg border border-gray-700 text-gray-300 text-sm
             hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] sm:min-h-0"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
      aria-label="Página siguiente"
    >
      ›
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const visiblePages = computed(() => {
  const total = props.totalPages
  const curr = props.currentPage
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set()
  pages.add(curr)
  if (curr > 1) pages.add(curr - 1)
  if (curr < total) pages.add(curr + 1)
  return Array.from(pages).sort((a, b) => a - b)
})
</script>
