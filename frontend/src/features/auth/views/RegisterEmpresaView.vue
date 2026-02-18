<template>
  <div class="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-4 py-12 font-sans overflow-hidden pt-32 bg-[rgb(9,9,42)] border-b border-[#a6249d]/20">
    <!-- Background Decor -->
    <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#a6249d] opacity-20 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#d93340] opacity-10 blur-[100px] pointer-events-none"></div>
    <div class="absolute top-[50%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#ff6ec7] opacity-5 blur-[80px] pointer-events-none"></div>

    <div class="relative w-full max-w-[600px] mt-12 p-8 space-y-8 bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)]">
      
      <!-- Header -->
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] mb-4 shadow-lg shadow-[#a6249d]/30">
          <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 class="font-['League_Spartan'] text-3xl font-bold text-white mb-2">
          Registrar Empresa
        </h1>
        <p class="text-white/50 text-sm max-w-sm mx-auto">
          Publica ofertas laborales y conecta con el mejor talento de la UNI
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <div v-if="errorMsg" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
          {{ errorMsg }}
        </div>

        <!-- Nombre comercial -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
            Nombre comercial de la empresa *
          </label>
          <input v-model="form.nombre_empresa" type="text" required class="input-field pl-4" placeholder="Ej. TechCorp Perú">
        </div>

        <!-- Razón social y RUC -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Razón social
            </label>
            <input v-model="form.razon_social" type="text" class="input-field pl-4" placeholder="Ej. TechCorp S.A.C.">
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              RUC
            </label>
            <input v-model="form.ruc" type="text" class="input-field pl-4" placeholder="20123456789">
          </div>
        </div>

        <!-- Sector -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
            Sector de la empresa *
          </label>
          <select v-model="form.sector" required class="input-field pl-4">
            <option value="" disabled>Seleccione un sector</option>
            <option value="tecnologia">Tecnología</option>
            <option value="construccion">Construcción</option>
            <option value="manufactura">Manufactura</option>
            <option value="servicios">Servicios</option>
            <option value="educacion">Educación</option>
            <option value="salud">Salud</option>
            <option value="retail">Retail</option>
            <option value="finanzas">Finanzas</option>
            <option value="consultoria">Consultoría</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <!-- Teléfono y Sitio web -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Teléfono de contacto
            </label>
            <input v-model="form.telefono_contacto" type="text" class="input-field pl-4" placeholder="+51 999 999 999">
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Sitio web
            </label>
            <input v-model="form.sitio_web" type="url" class="input-field pl-4" placeholder="https://www.empresa.com">
          </div>
        </div>

        <!-- Dirección -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
            Dirección
          </label>
          <input v-model="form.direccion" type="text" class="input-field pl-4" placeholder="Av. Principal 123, San Isidro">
        </div>

        <!-- Alianza con LeadUNI/UNI -->
        <div class="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <input
            id="tiene-convenio"
            v-model="form.tiene_convenio"
            type="checkbox"
            class="mt-1.5 h-4 w-4 rounded border-white/20 bg-[#0a0a1a]/50 text-[#d93340] focus:ring-[#a6249d]"
          >
          <label for="tiene-convenio" class="text-sm text-white/80 cursor-pointer">
            <span class="font-bold text-white">¿Tu empresa tiene alianza con LeadUNI?</span>
            <span class="block text-white/50 text-xs mt-0.5">Las empresas con alianza aparecen destacadas en la bolsa laboral</span>
          </label>
        </div>

        <!-- Persona de contacto -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Nombres del contacto *
            </label>
            <input v-model="form.nombres_contacto" type="text" required class="input-field pl-4" placeholder="Ej. Juan">
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Apellidos del contacto *
            </label>
            <input v-model="form.apellidos_contacto" type="text" required class="input-field pl-4" placeholder="Ej. Pérez">
          </div>
        </div>

        <!-- Email corporativo -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
            Email corporativo *
          </label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input v-model="form.user_email" type="email" required class="input-field w-full pl-[3.25rem]" placeholder="rrhh@empresa.com" />
          </div>
        </div>

        <!-- Contraseñas -->
        <div class="space-y-5">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Contraseña *
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input v-model="form.password" type="password" required class="input-field w-full pl-[3.25rem]" placeholder="••••••••" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
              Confirmar contraseña *
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                :class="['input-field w-full pl-[3.25rem]', { 'input-field-error': showConfirmError }]"
                placeholder="••••••••"
                @input="showConfirmError = false"
              />
            </div>
          </div>
        </div>
        
        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a6249d] shadow-lg shadow-[#a6249d]/30 hover:shadow-[#a6249d]/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Registrando empresa...</span>
            <span v-else>Crear cuenta de empresa</span>
          </button>
        </div>
      </form>

      <!-- Footer -->
      <div class="text-sm text-center text-white/50 pt-2 border-t border-white/5">
        ¿Ya tienes cuenta?
        <router-link to="/auth/login-empresa" class="font-bold text-[#d93340] hover:text-[#ff6ec7] transition-colors ml-1">
          Inicia sesión aquí
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { registerEmpresa } = useAuth();

const loading = ref(false);
const errorMsg = ref("");
const showConfirmError = ref(false);

const form = reactive({
  nombre_empresa: '',
  razon_social: '',
  ruc: '',
  sector: '',
  telefono_contacto: '',
  sitio_web: '',
  direccion: '',
  tiene_convenio: false,
  nombres_contacto: '',
  apellidos_contacto: '',
  user_email: '',
  password: '',
  confirmPassword: '',
});

const handleRegister = async () => {
  errorMsg.value = '';
  
  if (!form.nombre_empresa || !form.sector || !form.nombres_contacto || !form.apellidos_contacto || !form.user_email || !form.password) {
    errorMsg.value = "Por favor, rellena todos los campos obligatorios.";
    return;
  }

  if (form.password !== form.confirmPassword) {
    errorMsg.value = "Las contraseñas no coinciden.";
    showConfirmError.value = true;
    return;
  }
  
  loading.value = true;

  try {
    await registerEmpresa({
      email: form.user_email,
      password: form.password,
      nombre_empresa: form.nombre_empresa,
      razon_social: form.razon_social || undefined,
      ruc: form.ruc || undefined,
      sector: form.sector,
      telefono_contacto: form.telefono_contacto || undefined,
      sitio_web: form.sitio_web || undefined,
      direccion: form.direccion || undefined,
      tiene_convenio: form.tiene_convenio,
      nombres_contacto: form.nombres_contacto,
      apellidos_contacto: form.apellidos_contacto,
    });
    
    router.push('/perfil');
  } catch (error) {
    errorMsg.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input-field {
  @apply appearance-none block w-full py-3 pr-4 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200;
}
.input-field-error {
  @apply border-red-500/50 focus:ring-red-500/50 focus:border-red-500;
}
</style>
