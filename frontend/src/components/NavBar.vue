<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[1200] flex h-[72px] items-center border-b border-[rgba(160,33,139,0.06)] bg-gradient-to-b from-[#2a1630] to-[#201028] backdrop-blur-[6px]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      class="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-5 px-5"
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

      <div class="hidden flex-1 items-center justify-center gap-7 lg:flex">
        <ul
          class="m-0 flex list-none items-center justify-center gap-[26px] p-0"
          role="menubar"
        >
          <!-- Ofertas: indicamos active-class y exact-active-class.
               Si tu app usa "/" como home, asegúrate de redirigir "/" => "/ofertas" -->
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
              to="auth/login"
              class="text-[13px] font-bold text-white/95"
            >
              Iniciar sesión
            </router-link>
          </template>
        </div>

        <router-link
          to="/perfil"
          class="h-11 w-11 overflow-hidden rounded-full border-2 border-[rgba(160,33,139,0.12)] bg-[#111]"
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
import { computed } from "vue";
import { useAuth } from "@/composables/useAuth";

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
