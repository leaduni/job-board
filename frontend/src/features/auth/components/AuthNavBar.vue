<template>
  <nav class="bg-gradient-to-b from-[#2a1630] to-[#201028] h-[72px] sticky top-0 z-50 border-b border-[rgba(160,33,139,0.06)]" role="navigation" aria-label="Authentication Navigation">
    <div class="max-w-7xl mx-auto px-4 h-full">
      <div class="relative h-full flex items-center justify-between">
        <!-- Left: Back Button -->
        <div class="flex items-center">
          <button @click="goBack" class="flex items-center space-x-2 text-white/90 hover:text-white font-bold transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span>Regresar</span>
          </button>
        </div>

        <!-- Center: Brand Identity -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div class="text-white text-base font-extrabold tracking-wider uppercase">
            LEAD UNI
          </div>
        </div>

        <!-- Right: Dynamic Action -->
        <div class="flex items-center">
          <router-link :to="authLink.to" class="font-semibold text-[#b62667] hover:text-[#d44a87] transition-colors duration-200">
            {{ authLink.text }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const authLink = computed(() => {
  if (route.path.includes('/login')) {
    return {
      to: '/auth/register/estudiante',
      text: 'Registrarse como candidato'
    }
  }
  return {
    to: '/auth/login',
    text: 'Iniciar sesión'
  }
})

const goBack = () => {
  router.back()
}
</script>
