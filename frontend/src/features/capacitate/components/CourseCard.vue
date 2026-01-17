<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Título del Curso de Ejemplo',
      provider: 'Proveedor de Ejemplo',
      duration: '10h',
      level: 'Intermedio',
      price: 0,
      image: 'https://via.placeholder.com/400x225',
      hasCertificate: true,
    }),
  },
});
</script>

<template>
  <div
    class="group relative bg-[#1e1e3a] rounded-[12px] overflow-hidden border border-transparent hover:border-[#b62667] transition-all duration-300 ease-in-out"
  >
    <!-- Image and Hover Elements Container -->
    <div class="relative overflow-hidden">
      <img
        :src="course.image"
        alt="Imagen del curso"
        class="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <!-- Hover Overlay for Button -->
      <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 transition-transform">
          Ver Detalles
        </button>
      </div>
      
      <!-- "Gratis" Badge -->
      <div
        v-if="course.price === 0"
        class="absolute top-2 right-2 text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-cyan-300"
      >
        Gratis
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-4">
      <p class="text-[10px] tracking-widest text-white/50 uppercase">
        {{ course.provider }}
      </p>
      <h3 class="text-[16px] font-bold text-white mt-1 min-h-[48px]">
        {{ course.title }}
      </h3>
      
      <!-- Metadata Row -->
      <div class="flex flex-wrap items-center text-white/50 text-sm mt-3 gap-x-4 gap-y-2">
        <!-- Duration -->
        <div class="flex items-center" title="Duración">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V6z" clip-rule="evenodd" />
          </svg>
          <span>{{ course.duration }}</span>
        </div>

        <!-- Level -->
        <div class="flex items-center" title="Nivel">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span>{{ course.level }}</span>
        </div>

        <!-- Certificate -->
        <div v-if="course.hasCertificate" class="flex items-center" title="Incluye Certificado">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-1 1v1.618C5.835 5.42 4 7.962 4 11c0 3.866 3.134 7 7 7s7-3.134 7-7c0-3.038-1.835-5.58-4.268-6.382V3a1 1 0 00-1-1H9zm-3 9a3 3 0 106 0 3 3 0 00-6 0zm14 0a7 7 0 11-14 0 7 7 0 0114 0z" clip-rule="evenodd" />
            </svg>
            <span>Certificado</span>
        </div>
      </div>
    </div>
  </div>
</template>
