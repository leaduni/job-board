<template>
  <div class="bg-[#09092a] min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="w-full max-w-lg p-8 space-y-6 bg-[#121225] rounded-2xl border-[3px] border-[#b62667]">

      <!-- Header -->
      <div class="text-center">
        <h1 class="text-2xl font-bold text-[#b62667]">
          Crea tu cuenta de estudiante
        </h1>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        
        <!-- Grid for Name and Lastname -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="nombres" class="input-label">Nombres</label>
            <input id="nombres" v-model="form.nombres" type="text" required class="input-field" placeholder="Alexandra">
          </div>
          <div>
            <label for="apellidos" class="input-label">Apellidos</label>
            <input id="apellidos" v-model="form.apellidos" type="text" required class="input-field" placeholder="Torres">
          </div>
        </div>

        <div>
          <label for="user_email" class="input-label">Correo Institucional</label>
          <input id="user_email" v-model="form.user_email" type="email" required class="input-field" placeholder="alexandra.torres@unl.edu.ec">
        </div>

        <div>
          <label for="telefono" class="input-label">Teléfono</label>
          <input id="telefono" v-model="form.telefono" type="tel" required class="input-field" placeholder="0987654321">
        </div>

        <div>
          <label for="password" class="input-label">Contraseña</label>
          <input id="password" v-model="form.password" type="password" required class="input-field" placeholder="••••••••">
        </div>

        <div>
          <label for="confirmPassword" class="input-label">Confirmar Contraseña</label>
          <input id="confirmPassword" v-model="form.confirmPassword" type="password" required class="input-field" placeholder="••••••••">
        </div>
        
        <!-- Submit Button -->
        <div class="pt-4">
          <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-gradient-to-r from-[#a0218b] to-[#b62667] hover:from-[#b62667] hover:to-[#a0218b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#a0218b] transition-all duration-300 transform hover:scale-[1.02]">
            Registrarse
          </button>
        </div>
      </form>

      <!-- Footer Link -->
      <div class="text-sm text-center text-gray-400 pt-4">
        ¿Ya tienes cuenta? 
        <router-link to="/auth/login" class="font-medium text-[#b62667] hover:underline">
          Inicia sesión
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  nombres: '',
  apellidos: '',
  user_email: '',
  telefono: '',
  password: '',
  confirmPassword: '',
});

const handleRegister = () => {
  // 1. Validación de campos
  const allFieldsFilled = Object.values(form).every(field => field.trim() !== '');
  if (!allFieldsFilled) {
    // You might want to show a general error message to the user
    console.error("Por favor, rellena todos los campos.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    // You might want a more user-friendly way to show this error
    console.error("Las contraseñas no coinciden.");
    return;
  }
  
  // 2. Simulación de retraso y redirección
  setTimeout(() => {
    // 3. Guardar indicador en localStorage
    localStorage.setItem('auth_action', 'register');
    
    // 4. Redirigir al perfil
    router.push('/perfil');
  }, 1000);
};
</script>

<style scoped>
.input-label {
  @apply block text-sm font-medium text-gray-300 mb-1;
}

.input-field {
  @apply appearance-none block w-full px-3 py-2 border border-white/10 bg-white/5 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#b62667] sm:text-sm text-white;
}
</style>
