<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-white mb-4">Página de Prueba de Tailwind CSS</h1>
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <p class="text-lead-pink mb-4">
        Si Tailwind CSS está funcionando, esta caja y el texto tendrán estilos especiales.
      </p>
      <div class="space-y-4">
        <div class="bg-blue-500 text-white p-4 rounded-md">
          Esto es un div con fondo azul (bg-blue-500).
        </div>
        <div class="border-2 border-dashed border-green-400 p-4 rounded-md">
          <span class="text-green-400">Esto es un div con borde discontinuo verde (border-green-400).</span>
        </div>
        <button class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          Botón de prueba
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se necesita lógica de script para esta vista de prueba.
</script>

<style scoped>
/* Puedes añadir estilos específicos del componente aquí si es necesario. */
</style>
