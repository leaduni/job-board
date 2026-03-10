<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 shadow-lg shadow-black/30 border-b border-[#a6249d]/30 bg-[#1A0B2E]',
      isScrolled ? 'border-b border-[#a6249d]/40 shadow-[#a6249d]/20' : ''
    ]"
    style="min-height: 72px"
    role="navigation"
    aria-label="Authentication Navigation"
  >
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 h-[72px] flex items-center">
      <div class="flex items-center justify-between w-full">
        <!-- Left: Volver -->
        <button
          type="button"
          @click="goBack"
          class="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <div class="p-2 sm:p-1.5 rounded-full bg-white/5 group-hover:bg-[#a6249d]/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="hidden sm:inline text-sm font-medium">Volver</span>
        </button>

        <!-- Center: LEAD UNI Bolsa Laboral -->
        <router-link to="/" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group flex items-center gap-3">
          <div
            class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg shadow-[#a6249d]/20 group-hover:scale-105 transition-transform duration-300"
          >
            <svg width="20" height="20" class="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="15" rx="2" stroke="white" stroke-width="2"/>
              <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="white" stroke-width="2"/>
              <path d="M12 11V13" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-['League_Spartan'] text-base sm:text-lg font-bold leading-none tracking-wide text-white">
              LEAD UNI
            </span>
            <span class="hidden sm:block text-[10px] font-medium tracking-widest text-white/50 uppercase">
              Bolsa Laboral
            </span>
          </div>
        </router-link>

        <!-- Right: Iniciar sesión / Crear cuenta -->
        <router-link
          :to="authLink.to"
          class="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] border border-[#a6249d]/40 transition-all duration-200 hover:scale-105 whitespace-nowrap shadow-lg shadow-[#a6249d]/20"
        >
          {{ authLink.text }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isScrolled = ref(false)

const authLink = computed(() => {
  if (route.path.includes('/login')) {
    return { to: '/auth/register/estudiante', text: 'Crear cuenta' }
  }
  return { to: '/auth/login', text: 'Iniciar sesión' }
})

const goBack = () => {
  // Si llegamos a login por cerrar sesión, el historial puede tener /perfil.
  // Ir a inicio evita que "Volver" nos regrese al perfil sin sesión.
  if (route.path === '/auth/login' || route.path === '/auth/login/empresa') {
    router.replace('/')
  } else {
    router.back()
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
