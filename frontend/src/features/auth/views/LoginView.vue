<template>
  <div class="bg-[#09092a] min-h-[calc(100vh-72px)] flex items-center justify-center p-4 font-sans">
    <div class="w-full max-w-sm p-6 space-y-6 bg-[#16162a]/80 backdrop-blur-xl rounded-2xl border-[3px] border-[#b62667]">
      
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-xl font-bold text-[#b62667]">
          Ingresa a tu cuenta
        </h1>
        <p class="mt-2 text-sm text-gray-400">
          ¿Eres una empresa? 
          <router-link to="/auth/login-empresa" class="font-medium text-[#b62667] hover:underline">
            Ingresa aquí
          </router-link>
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
            Correo Institucional
          </label>
          <input 
            id="email" 
            v-model="email" 
            name="email" 
            type="email" 
            autocomplete="email" 
            required
            class="appearance-none block w-full px-3 py-2 border border-white/10 bg-white/5 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#b62667] sm:text-sm text-white"
            placeholder="tu.correo@unl.edu.ec"
          >
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
            Contraseña
          </label>
          <input 
            id="password" 
            v-model="password" 
            name="password" 
            type="password" 
            autocomplete="current-password" 
            required
            class="appearance-none block w-full px-3 py-2 border border-white/10 bg-white/5 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#b62667] sm:text-sm text-white"
            placeholder="********"
          >
        </div>
        
        <!-- Submit Button -->
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-gradient-to-r from-[#a0218b] to-[#b62667] hover:from-[#b62667] hover:to-[#a0218b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#a0218b] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Ingresar
          </button>
        </div>
      </form>

      <!-- Footer Links -->
      <div class="text-sm text-center pt-2">
        <router-link to="/auth/forgot-password" class="font-medium text-[#b62667] hover:underline">
          Olvidé mi contraseña
        </router-link>
      </div>
      <div class="text-sm text-center text-gray-400">
        ¿No tienes cuenta? 
        <router-link to="/auth/register/estudiante" class="font-medium text-[#b62667] hover:underline">
          Regístrate como candidato
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  // Simulate login delay
  setTimeout(() => {
    localStorage.setItem('auth_action', 'login');
    router.push('/perfil');
  }, 1000);
}
</script>
