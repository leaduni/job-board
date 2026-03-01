<template>
  <div
    class="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-4 font-sans overflow-hidden pt-32 bg-[rgb(9,9,42)] border-b border-[#a6249d]/20"
  >
    <div
      class="relative w-full max-w-[420px] p-8 space-y-8 bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)]"
    >
      <div class="text-center">
        <h1 class="font-['League_Spartan'] text-2xl font-bold text-white mb-2">
          Restablecer contraseña
        </h1>
        <p class="text-white/50 text-sm">
          Ingresa el código que recibiste y tu nueva contraseña.
        </p>
      </div>
      <form @submit.prevent="handleResetPassword" class="space-y-5">
        <div
          v-if="errorMsg"
          class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center"
        >
          {{ errorMsg }}
        </div>
        <div
          v-if="successMsg"
          class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm text-center"
        >
          {{ successMsg }}
        </div>
        <div class="space-y-1.5">
          <label
            for="email"
            class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
            >Correo Institucional</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="block w-full pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200"
            placeholder="alumno@uni.edu.pe"
          />
        </div>
        <div class="space-y-1.5">
          <label
            for="code"
            class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
            >Código de verificación</label
          >
          <input
            id="code"
            v-model="code"
            type="text"
            maxlength="4"
            required
            class="block w-full pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200"
            placeholder="1234"
          />
        </div>
        <div class="space-y-1.5">
          <label
            for="newPassword"
            class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
            >Nueva contraseña</label
          >
          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            required
            class="block w-full pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200"
            placeholder="••••••••"
          />
        </div>
        <div class="space-y-1.5">
          <label
            for="confirmPassword"
            class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
            >Confirmar contraseña</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="block w-full pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all duration-200"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a6249d] shadow-lg shadow-[#a6249d]/30 hover:shadow-[#a6249d]/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Restableciendo...</span>
          <span v-else>Restablecer contraseña</span>
        </button>
      </form>
      <div
        class="text-sm text-center text-white/50 pt-2 border-t border-white/5"
      >
        ¿Ya tienes cuenta?
        <router-link
          to="/auth/login"
          class="font-bold text-[#d93340] hover:text-[#ff6ec7] transition-colors ml-1"
          >Inicia sesión aquí</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { coreApi } from "@/services/coreApi";

const router = useRouter();
const email = ref("");
const code = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

const handleResetPassword = async () => {
  errorMsg.value = "";
  successMsg.value = "";
  if (
    !email.value ||
    !code.value ||
    !newPassword.value ||
    !confirmPassword.value
  ) {
    errorMsg.value = "Por favor, rellena todos los campos.";
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = "Las contraseñas no coinciden.";
    return;
  }
  loading.value = true;
  try {
    const body = {
      email: email.value,
      code: code.value,
      newPassword: newPassword.value,
    };
    const res = await coreApi.post("/api/auth/reset-password", body);
    if (res.data?.ok) {
      successMsg.value = "Contraseña restablecida correctamente.";
      setTimeout(() => router.push("/auth/login"), 2000);
    } else {
      errorMsg.value =
        res.data?.message || "No se pudo restablecer la contraseña.";
    }
  } catch (error) {
    errorMsg.value =
      error.response?.data?.message || "No se pudo restablecer la contraseña.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Puedes reutilizar los estilos del login/register */
</style>
