<template>
  <div class="relative bg-[#09092a] min-h-[calc(100vh-72px)] flex items-center justify-center p-4 font-sans overflow-hidden pt-32">
    
    <!-- Background Decor -->
    <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#a0218b] opacity-10 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#5a124d] opacity-10 blur-[100px] pointer-events-none"></div>

    <div class="relative w-full max-w-[420px] p-8 space-y-8 bg-[#13132b]/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
      
      <!-- Header -->
      <div class="text-center">
        <h1 class="font-['League_Spartan'] text-3xl font-bold text-white mb-2">
          ¡Hola de nuevo!
        </h1>
        <p class="text-white/50 text-sm">
          Ingresa tus credenciales para acceder a tu perfil
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email Input -->
        <div class="space-y-1.5">
          <label for="email" class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
            Correo Institucional
          </label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#b62667] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input 
              id="email" 
              v-model="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required
              class="block w-full pl-11 pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#b62667]/50 focus:border-[#b62667] transition-all duration-200"
              placeholder="alumno@unl.edu.ec"
            >
          </div>
        </div>

        <!-- Password Input -->
        <div class="space-y-1.5">
          <div class="flex justify-between items-center ml-1">
             <label for="password" class="block text-xs font-bold text-white/70 uppercase tracking-wider">
              Contraseña
            </label>
            <router-link to="/auth/forgot-password" class="text-xs font-medium text-[#b62667] hover:text-[#ff5a9e] transition-colors">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
         
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#b62667] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              id="password" 
              v-model="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required
              class="block w-full pl-11 pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#b62667]/50 focus:border-[#b62667] transition-all duration-200"
              placeholder="••••••••"
            >
          </div>
        </div>
        
        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full relative flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#a0218b] to-[#b62667] hover:from-[#b62667] hover:to-[#a0218b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a0218b] shadow-lg shadow-[#a0218b]/30 hover:shadow-[#a0218b]/50 hover:-translate-y-0.5 transition-all duration-300"
        >
          Iniciar Sesión
        </button>
      </form>

      <!-- Footer / Switch Account Type -->
      <div class="pt-2 border-t border-white/5">
        <p class="text-center text-sm text-white/50 mb-4">
          ¿Eres una empresa? 
          <router-link to="/auth/login-empresa" class="font-bold text-white hover:text-[#b62667] transition-colors">
            Ingresa por aquí
          </router-link>
        </p>

        <div class="bg-white/5 rounded-xl p-4 text-center">
          <p class="text-xs text-white/50 mb-2">¿Aún no tienes cuenta?</p>
          <router-link to="/auth/register/estudiante" class="block w-full py-2.5 rounded-lg border border-white/10 bg-transparent text-sm font-bold text-white hover:bg-white/5 transition-colors">
            Regístrate como Candidato
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
