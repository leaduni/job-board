<template>
  <nav class="app-navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-inner container">
      <div class="nav-left">
        <div class="brand">
          <div class="brand-logo" aria-hidden="true">
            <!-- icono -->
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#a0218b"/>
              <path d="M6 9h12v6H6z" fill="#fff" opacity="0.06"/>
            </svg>
          </div>
          <div class="brand-text">
            <div class="brand-title">LEAD UNI</div>
            <div class="brand-sub">Bolsa Laboral</div>
          </div>
        </div>
      </div>

      <div class="nav-center">
        <ul class="nav-links" role="menubar">
          <!-- Ofertas: indicamos active-class y exact-active-class.
               Si tu app usa "/" como home, asegúrate de redirigir "/" => "/ofertas" -->
          <li role="none">
            <router-link
              to="/ofertas"
              class="nav-link"
              active-class="nav-link-active"
              role="menuitem"
            >Ofertas</router-link>
          </li>

          <li role="none">
            <router-link
              to="/capacitate"
              class="nav-link"
              active-class="nav-link-active"
              role="menuitem"
            >Capacítate</router-link>
          </li>

          <li role="none">
            <router-link
              to="/postulaciones"
              class="nav-link"
              active-class="nav-link-active"
              role="menuitem"
            >Postulaciones</router-link>
          </li>
        </ul>
      </div>

      <div class="nav-right">
        <button class="icon-btn bell-btn" title="Notificaciones" aria-label="Notificaciones">
          <!-- bell SVG -->
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"></path>
            <path d="M13.73 21a2 2 0 01-3.46 0"></path>
          </svg>
          <span class="bell-indicator" aria-hidden="true"></span>
        </button>

        <div class="profile" title="Ver perfil">
          <template v-if="isAuthenticated">
            <div class="profile-name">{{ displayName }}</div>
            <div class="profile-role">{{ carrera }}</div>
          </template>

          <template v-else>
            <div class="profile-name">Iniciar sesión</div>
          </template>
        </div>

        <div class="avatar" aria-hidden="true">
          <img src="/src/assets/avatar-placeholder.jpg" alt="avatar" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

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
