<template>
  <div id="app">
    <AuthNavBar v-if="isAuthRoute" />
    <NavBar v-else />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import AuthNavBar from '@/features/auth/components/AuthNavBar.vue'
import { useAuth } from '@/composables/useAuth'

const { initAuth } = useAuth()
initAuth()

const route = useRoute()
const isAuthRoute = computed(() => route.path.startsWith('/auth'))
</script>