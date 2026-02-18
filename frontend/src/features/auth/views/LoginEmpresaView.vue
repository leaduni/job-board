<template>
  <div class="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-4 font-sans overflow-hidden pt-32 bg-[rgb(9,9,42)] border-b border-[#a6249d]/20">
    <!-- Background Decor -->
    <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#a6249d] opacity-20 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#d93340] opacity-10 blur-[100px] pointer-events-none"></div>
    <div class="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#ff6ec7] opacity-5 blur-[80px] pointer-events-none"></div>

    <div class="relative w-full max-w-[420px] p-8 space-y-8 bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)]">
      
      <!-- Header - Empresas -->
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] mb-4 shadow-lg shadow-[#a6249d]/30">
          <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 class="font-['League_Spartan'] text-3xl font-bold text-white mb-2">
          Acceso Empresas
        </h1>
        <p class="text-white/50 text-sm">
          Gestiona tus ofertas y postulantes en la Bolsa Laboral UNI
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div v-if="errorMsg" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
          {{ errorMsg }}
        </div>

        <div class="space-y-1.5">
          <label for="email-empresa" class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
            Email corporativo
          </label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input 
              id="email-empresa" 
              v-model="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required
              class="block w-full pl-[3.25rem] pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200"
              placeholder="rrhh@empresa.com"
            >
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="flex justify-between items-center ml-1">
            <label for="password-empresa" class="block text-xs font-bold text-white/70 uppercase tracking-wider">
              Contraseña
            </label>
            <router-link to="/auth/forgot-password" class="text-xs text-white/40 hover:text-[#d93340] transition-colors">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              id="password-empresa" 
              v-model="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required
              class="block w-full pl-[3.25rem] pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200"
              placeholder="••••••••"
            >
          </div>
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a6249d] shadow-lg shadow-[#a6249d]/30 hover:shadow-[#a6249d]/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Accediendo...</span>
          <span v-else>Iniciar sesión</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="pt-6 space-y-4 border-t border-[#a6249d]/20">
        <p class="text-center text-sm text-white/50">
          ¿Eres candidato o estudiante?
          <router-link to="/auth/login" class="font-bold text-[#d93340] hover:text-[#ff6ec7] transition-colors ml-1">
            Inicia sesión aquí
          </router-link>
        </p>

        <div class="rounded-xl p-4 text-center bg-white/5 border border-white/10">
          <p class="text-sm text-white/60 mb-3">¿Tu empresa aún no está registrada?</p>
          <router-link
            to="/auth/register/empresa"
            class="block w-full py-2.5 rounded-lg border border-white/10 bg-transparent text-sm font-bold text-white hover:bg-white/5 transition-colors"
          >
            Registrar Empresa
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    await login({ email: email.value, password: password.value })
    router.push('/perfil')
  } catch (error) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>
