<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] flex h-[72px] items-center border-b border-[rgba(160,33,139,0.06)] bg-gradient-to-b from-[#2a1630] to-[#201028] backdrop-blur-[6px]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      class="relative z-[100] mx-auto flex w-full max-w-[1240px] items-center justify-between gap-5 px-5"
    >
      <!-- Logo and Brand Name -->
      <router-link to="/" class="flex items-center gap-3" @click="isMenuOpen = false">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-[10px] shadow-[0_6px_22px_rgba(0,0,0,0.5)]"
          aria-hidden="true"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="#a0218b" />
            <path d="M6 9h12v6H6z" fill="#fff" opacity="0.06" />
          </svg>
        </div>
        <div>
          <div
            class="font-heading text-base font-extrabold leading-none text-white/95"
          >
            LEAD UNI
          </div>
          <div class="text-xs leading-none text-white/45">Bolsa Laboral</div>
        </div>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex flex-1 items-center justify-center gap-7">
        <ul
          class="m-0 flex list-none items-center justify-center gap-[26px] p-0"
          role="menubar"
        >
          <li role="none">
            <router-link
              to="/ofertas"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              active-class="bg-gradient-to-r from-[#d23b97] to-[#a0218b] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(160,33,139,0.2)] -translate-y-px"
              role="menuitem"
              >Ofertas</router-link
            >
          </li>
          <li role="none">
            <router-link
              to="/capacitate"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              active-class="bg-gradient-to-r from-[#d23b97] to-[#a0218b] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(160,33,139,0.2)] -translate-y-px"
              role="menuitem"
              >Capacítate</router-link
            >
          </li>
          <li role="none">
            <router-link
              to="/postulaciones"
              class="py-2 px-2.5 font-bold no-underline rounded-full text-white/90 transition-all duration-100 ease-in-out"
              active-class="bg-gradient-to-r from-[#d23b97] to-[#a0218b] text-white py-2.5 px-[18px] rounded-full shadow-[0_10px_30px_rgba(160,33,139,0.2)] -translate-y-px"
              role="menuitem"
              >Postulaciones</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Right side: Profile, Notifications & Hamburger -->
      <div class="flex items-center gap-3.5">
        <button
          class="relative inline-flex cursor-pointer items-center justify-center rounded-lg border-none bg-transparent p-2 text-white/45 hover:bg-white/[.02]"
          title="Notificaciones"
          aria-label="Notificaciones"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
            ></path>
            <path d="M13.73 21a2 2 0 01-3.46 0"></path>
          </svg>
          <span
            class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ff5a9e] shadow-[0_0_6px_rgba(255,90,158,0.18)]"
            aria-hidden="true"
          ></span>
        </button>

        <router-link to="/perfil" class="flex items-center gap-3.5 text-right no-underline" title="Ver perfil" @click="isMenuOpen = false">
          <div class="hidden md:block mr-1.5 text-white/45">
            <template v-if="isAuthenticated">
              <div class="text-[13px] font-bold text-white/95">
                {{ displayName }}
              </div>
              <div class="text-xs text-white/60">{{ carrera }}</div>
            </template>
            <template v-else>
              <div class="text-[13px] font-bold text-white/95">
                Iniciar sesión
              </div>
            </template>
          </div>

          <div
            class="h-11 w-11 overflow-hidden rounded-full border-2 border-[rgba(160,33,139,0.12)] bg-[#111]"
            aria-hidden="true"
          >
            <img
              src="/src/assets/avatar-placeholder.jpg"
              alt="avatar"
              class="h-full w-full object-cover"
            />
          </div>
        </router-link>

        <!-- Hamburger Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="relative md:hidden p-2 text-white/90"
          aria-label="Toggle menu"
          aria-expanded="isMenuOpen"
        >
          <i class="fas text-xl" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Backdrop -->
  <div
    v-if="isMenuOpen"
    @click="isMenuOpen = false"
    class="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
    aria-hidden="true"
  ></div>

  <!-- Side Drawer Menu -->
  <transition
    enter-active-class="transition-transform duration-300 ease-in-out"
    leave-active-class="transition-transform duration-300 ease-in-out"
    enter-from-class="translate-x-full"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="isMenuOpen"
      class="fixed top-[72px] right-0 h-screen w-[70%] bg-[#1e1e3a] z-50 md:hidden"
    >
      <div class="p-8">
        <ul class="flex flex-col items-start gap-4">
          <li>
            <router-link
              to="/ofertas"
              class="block w-full text-left text-lg font-semibold text-white/90 px-4 py-3 rounded-lg"
              @click="isMenuOpen = false"
              exact-active-class="bg-[#b62667]"
              >Ofertas</router-link
            >
          </li>
          <li>
            <router-link
              to="/capacitate"
              class="block w-full text-left text-lg font-semibold text-white/90 px-4 py-3 rounded-lg"
              @click="isMenuOpen = false"
              exact-active-class="bg-[#b62667]"
              >Capacítate</router-link
            >
          </li>
          <li>
            <router-link
              to="/postulaciones"
              class="block w-full text-left text-lg font-semibold text-white/90 px-4 py-3 rounded-lg"
              @click="isMenuOpen = false"
              exact-active-class="bg-[#b62667]"
              >Postulaciones</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const isMenuOpen = ref(false)
const { isAuthenticated, user } = useAuth()

const displayName = computed(() => {
  if (!user.value) return ''
  const nombre = user.value.nombres?.split(' ')[0] || ''
  const apellido = user.value.apellidos?.split(' ')[0] || ''
  return `${nombre} ${apellido}`.trim()
})

const carrera = computed(() => {
  return user.value?.carrera || ''
})
</script>

<style scoped>
/* Font Awesome - Make sure it's included in your project */
@import '@fortawesome/fontawesome-free/css/all.min.css';

/* We can use router-link's active-class for desktop, but for mobile,
   exact-active-class is better to avoid matching parent routes.
   The bg-[#b62667] is a custom fuchsia color. */
.router-link-exact-active {
  /* You can add extra styles for active mobile links here if needed */
}
</style>
