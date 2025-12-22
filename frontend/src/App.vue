<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { useAuth } from '@/composables/useAuth'

const { initAuth } = useAuth()
initAuth()
</script>