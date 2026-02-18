<template>
  <div
    class="relative min-h-[calc(100vh-72px)] flex items-center justify-center p-4 py-12 font-sans overflow-hidden pt-32 bg-[rgb(9,9,42)] border-b border-[#a6249d]/20"
  >
    <!-- Background Decor (LEAD-webpage style) -->
    <div
      class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#a6249d] opacity-20 blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#d93340] opacity-10 blur-[100px] pointer-events-none"
    ></div>
    <div
      class="absolute top-[50%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#ff6ec7] opacity-5 blur-[80px] pointer-events-none"
    ></div>

    <div
      class="relative w-full max-w-[600px] mt-20 p-8 space-y-8 bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)]"
    >
      <!-- Header -->
      <div class="text-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] mb-4 shadow-lg shadow-[#a6249d]/30"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1 class="font-['League_Spartan'] text-3xl font-bold text-white mb-2">
          Únete a LEAD UNI
        </h1>
        <p class="text-white/50 text-sm max-w-sm mx-auto">
          Crea tu perfil profesional y accede a las mejores oportunidades
          laborales exclusivas.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Error Message -->
        <div
          v-if="errorMsg"
          class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center"
        >
          {{ errorMsg }}
        </div>

        <!-- Success Message -->
        <div
          v-if="successMsg"
          class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm text-center"
        >
          {{ successMsg }}
        </div>

        <!-- Name Fields Row -->
        <div v-if="step === 'form'" class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label
              for="reg-nombres"
              class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
              >Nombres</label
            >
            <input
              id="reg-nombres"
              v-model="form.nombres"
              type="text"
              required
              class="input-field"
              placeholder="Ej. Juan"
            />
          </div>
          <div class="space-y-1.5">
            <label
              for="reg-apellidos"
              class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
              >Apellidos</label
            >
            <input
              id="reg-apellidos"
              v-model="form.apellidos"
              type="text"
              required
              class="input-field"
              placeholder="Ej. Pérez"
            />
          </div>
        </div>

        <!-- Contact Info -->
        <div v-if="step === 'form'" class="space-y-1.5">
          <label
            for="reg-email"
            class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
            >Correo Institucional</label
          >
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
            >
              <svg
                class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              v-model="form.user_email"
              id="reg-email"
              type="email"
              required
              class="input-field w-full pl-[3.25rem]"
              placeholder="estudiante@uni.edu.pe"
            />
          </div>
        </div>

        <!-- Security -->
        <div v-if="step === 'form'" class="space-y-5">
          <div class="space-y-1.5">
            <label
              for="reg-password"
              class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
              >Contraseña</label
            >
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
              >
                <svg
                  class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="form.password"
                id="reg-password"
                type="password"
                required
                class="input-field w-full pl-[3.25rem]"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div class="space-y-1.5">
            <label
              for="reg-password-confirm"
              class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
              >Confirmar Contraseña</label
            >
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
              >
                <svg
                  class="h-5 w-5 text-gray-500 group-focus-within:text-[#d93340] transition-colors shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="form.confirmPassword"
                id="reg-password-confirm"
                type="password"
                required
                :class="[
                  'input-field w-full pl-[3.25rem]',
                  { 'input-field-error': showConfirmError },
                ]"
                placeholder="••••••••"
                @input="showConfirmError = false"
              />
            </div>
          </div>
        </div>

        <div v-if="step === 'code'" class="space-y-1.5">
          <label
            for="reg-verification-code"
            class="block text-xs font-bold text-white/70 uppercase tracking-wider ml-1"
            >Código de verificación</label
          >
          <input
            v-model="form.verificationCode"
            id="reg-verification-code"
            type="text"
            inputmode="numeric"
            maxlength="4"
            class="input-field"
            placeholder="1234"
          />
          <p class="text-xs text-white/50 ml-1">
            Te enviamos un código de 4 dígitos a {{ form.user_email }}.
          </p>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a6249d] shadow-lg shadow-[#a6249d]/30 hover:shadow-[#a6249d]/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">
              {{ step === "form" ? "Enviando código..." : "Verificando..." }}
            </span>
            <span v-else>
              {{
                step === "form"
                  ? "Enviar código de verificación"
                  : "Confirmar y crear cuenta"
              }}
            </span>
          </button>

          <button
            v-if="step === 'code'"
            type="button"
            :disabled="loading"
            class="w-full mt-3 flex justify-center py-3 px-4 border border-white/10 rounded-xl text-sm font-bold text-white/90 bg-transparent hover:bg-white/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleResendCode"
          >
            Reenviar código
          </button>
        </div>
      </form>

      <!-- Footer Link -->
      <div
        class="text-sm text-center text-white/50 pt-2 border-t border-white/5"
      >
        ¿Ya tienes cuenta?
        <router-link
          to="/auth/login"
          class="font-bold text-[#d93340] hover:text-[#ff6ec7] transition-colors ml-1"
        >
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
const { register } = useAuth();

const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");
const step = ref("form");
const showConfirmError = ref(false);
const serverCode = ref("");
const codeExpiresAt = ref(0);

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  import.meta.env.VITE_RESEND_FROM_EMAIL || "onboarding@resend.dev";

const generateCode = () => String(Math.floor(1000 + Math.random() * 9000));

const form = reactive({
  nombres: "",
  apellidos: "",
  user_email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});

const sendVerificationCode = async () => {
  if (!RESEND_API_KEY) {
    throw new Error("Falta VITE_RESEND_API_KEY en el .env del frontend.");
  }

  const nextCode = generateCode();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [form.user_email],
      subject: "Código de verificación - Bolsa Laboral LEAD UNI",
      html: `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;"><h2>Verifica tu correo</h2><p>Tu código de verificación es:</p><p style="font-size:32px;font-weight:700;letter-spacing:4px;margin:16px 0;">${nextCode}</p><p>Este código vence en 10 minutos.</p></div>`,
    }),
  });

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    throw new Error(
      details?.message || details?.error || "No se pudo enviar el código.",
    );
  }

  serverCode.value = nextCode;
  codeExpiresAt.value = Date.now() + 10 * 60 * 1000;

  step.value = "code";
  successMsg.value = "Código enviado. Revisa tu correo para continuar.";
};

const handleResendCode = async () => {
  errorMsg.value = "";
  successMsg.value = "";
  loading.value = true;

  try {
    await sendVerificationCode();
  } catch (error) {
    errorMsg.value = error.message;
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  errorMsg.value = "";
  successMsg.value = "";

  // 1. Validación de campos
  if (!form.nombres || !form.apellidos || !form.user_email || !form.password) {
    errorMsg.value = "Por favor, rellena todos los campos.";
    return;
  }

  if (form.password !== form.confirmPassword) {
    errorMsg.value = "Las contraseñas no coinciden.";
    showConfirmError.value = true;
    return;
  }

  if (step.value === "code") {
    if (!/^\d{4}$/.test(form.verificationCode)) {
      errorMsg.value = "Ingresa un código válido de 4 dígitos.";
      return;
    }

    if (!serverCode.value || Date.now() > codeExpiresAt.value) {
      errorMsg.value = "El código venció. Solicita uno nuevo.";
      return;
    }

    if (form.verificationCode !== serverCode.value) {
      errorMsg.value = "Código incorrecto.";
      return;
    }
  }

  loading.value = true;

  try {
    if (step.value === "form") {
      await sendVerificationCode();
      return;
    }

    await register({
      email: form.user_email,
      password: form.password,
      role: "user",
    });

    serverCode.value = "";
    codeExpiresAt.value = 0;

    router.push("/perfil");
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
