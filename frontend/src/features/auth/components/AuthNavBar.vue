<template>

  <nav
    class="bg-gradient-to-b from-[#2a1630] to-[#201028] h-16 sticky top-0 z-50 border-b border-[rgba(160,33,139,0.06)]"
    role="navigation"
    aria-label="Authentication Navigation"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-10 h-full">
      <div class="relative h-full flex items-center justify-between">
        <!-- Left: Back Button -->
        <div class="flex-1 flex justify-start">
          <router-link
            to="/ofertas"
            class="flex items-center space-x-2 text-white/90 hover:text-white font-bold transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="hidden md:inline">Regresar</span>
          </router-link>
        </div>

        <!-- Center: Brand Identity -->
        <div class="flex-shrink-0">
          <div
            class="font-heading text-base font-extrabold leading-none text-white/95 text-center"
          >
            LEAD UNI
          </div>
          <div class="text-xs leading-none text-white/45">Bolsa Laboral</div>
        </div>

        <!-- Right: Dynamic Action -->
        <div class="flex-1 flex justify-end">
          <router-link
            :to="authLink.to"
            class="hidden md:block font-semibold text-[#b62667] hover:text-[#d23b97] transition-colors duration-200"
          >
            {{ authLink.text }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const authLink = computed(() => {
  if (route.path.includes('/login')) {
    return {
      to: '/auth/register/estudiante',
      text: 'Crear cuenta'
    }
  }
  return {
    to: '/auth/login',
    text: 'Iniciar sesión'
  }
})
</script>
