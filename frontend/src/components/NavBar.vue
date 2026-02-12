<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] flex h-[72px] items-center transition-all duration-500 shadow-lg shadow-black/30 border-b border-[#a6249d]/30 bg-[#1A0B2E] overflow-visible"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      class="relative mx-auto flex w-full max-w-[1240px] items-center justify-between gap-5 px-5"
    >
      <router-link to="/" class="flex items-center">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-[10px]"
            aria-hidden="true"
          >
            <!-- icono -->
            <img src="/icono-lead.png" alt="Icono LEAD UNI" />
          </div>
          <div>
            <div
              class="font-heading text-base font-extrabold leading-none text-white/95"
            >
              LEAD UNI
            </div>
            <div class="text-xs leading-none text-white/45">Bolsa Laboral</div>
          </div>
        </div>
      </router-link>

      <!-- Hamburger (mobile) -->
      <button
        type="button"
        @click="menuOpen = !menuOpen"
        class="lg:hidden p-2 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
        aria-label="Abrir menú"
      >
        <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="hidden flex-1 items-center justify-center gap-7 lg:flex">
        <ul
          class="m-0 flex list-none items-center justify-center gap-[26px] p-0"
          role="menubar"
        >
          <li role="none">
            <router-link
              to="/"
              exact-active-class="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(166,36,157,0.25)] -translate-y-px"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              role="menuitem"
              >Inicio</router-link
            >
          </li>
          <li role="none">
            <router-link
              to="/ofertas"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              active-class="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(166,36,157,0.25)] -translate-y-px"
              role="menuitem"
              >Ofertas</router-link
            >
          </li>

          <li role="none">
            <router-link
              to="/capacitate"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              active-class="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(166,36,157,0.25)] -translate-y-px"
              role="menuitem"
              >Capacítate</router-link
            >
          </li>

          <li role="none">
            <router-link
              to="/postulaciones"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              active-class="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(166,36,157,0.25)] -translate-y-px"
              role="menuitem"
              >Postulaciones</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Mobile menu dropdown -->
      <div
        v-show="menuOpen"
        class="fixed top-[72px] left-0 right-0 lg:hidden bg-[#1A0B2E] border-b border-[#a6249d]/30 shadow-xl z-[99]"
      >
        <ul class="flex flex-col p-4 gap-2">
          <li><router-link to="/" @click="menuOpen = false" class="block py-3 px-4 rounded-lg text-white/90 hover:bg-[#a6249d]/20 font-bold" active-class="!bg-gradient-to-r !from-[#d93340] !to-[#a6249d]">Inicio</router-link></li>
          <li><router-link to="/ofertas" @click="menuOpen = false" class="block py-3 px-4 rounded-lg text-white/90 hover:bg-[#a6249d]/20 font-bold">Ofertas</router-link></li>
          <li><router-link to="/capacitate" @click="menuOpen = false" class="block py-3 px-4 rounded-lg text-white/90 hover:bg-[#a6249d]/20 font-bold">Capacítate</router-link></li>
          <li><router-link to="/postulaciones" @click="menuOpen = false" class="block py-3 px-4 rounded-lg text-white/90 hover:bg-[#a6249d]/20 font-bold">Postulaciones</router-link></li>
        </ul>
      </div>

      <div class="flex items-center gap-3.5">
        <div class="mr-1.5 text-right text-white/45" title="Ver perfil">
          <template v-if="isAuthenticated">
            <div class="text-[13px] font-bold text-white/95">
              {{ displayName }}
            </div>
            <div class="text-xs text-white/60">{{ carrera }}</div>
          </template>

          <template v-else>
            <router-link
              to="/auth/login"
              class="text-[13px] font-bold text-white/95"
            >
              Iniciar sesión
            </router-link>
          </template>
        </div>

        <router-link
          to="/perfil"
          class="h-11 w-11 overflow-hidden rounded-full border-2 border-[rgba(166,36,157,0.12)] bg-[#111]"
          aria-hidden="true"
        >
          <img
            src="/src/assets/avatar-placeholder.jpg"
            alt="avatar"
            class="h-full w-full object-cover"
          />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuth } from "@/composables/useAuth";

const menuOpen = ref(false);
const { isAuthenticated, user } = useAuth();

const displayName = computed(() => {
  if (!user.value) return "";

  const nombre = user.value.nombres?.split(" ")[0] || "";
  const apellido = user.value.apellidos?.split(" ")[0] || "";

  return `${nombre} ${apellido}`.trim();
});

const carrera = computed(() => {
  return user.value?.carrera || "";
});
</script>
