<script setup>
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close", "login"]);

const handleLogin = () => {
  emit("login");
};

const handleClose = () => {
  emit("close");
};

const handleKeydown = (e) => {
  if (e.key === "Escape") {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    @click.self="handleClose"
  >
    <div
      class="relative m-4 w-full max-w-md overflow-hidden rounded-lg border-2 border-[#a6249d] bg-[#121225] p-8 shadow-2xl"
    >
      <div class="mb-6 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-[#d93340]"
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
        <h3 class="text-2xl font-bold font-heading text-white">
          Necesitas iniciar sesión
        </h3>
        <p class="mt-2 text-base text-gray-300">
          Para ver el detalle de las ofertas laborales, necesitas estar
          <span class="font-bold text-white">verificado</span> en la plataforma.
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <button
          @click="handleLogin"
          class="w-full rounded-md bg-gradient-to-r from-[#d93340] to-[#a6249d] px-6 py-3 text-base font-bold text-white shadow-lg transition-transform duration-150 ease-in-out hover:scale-105"
        >
          Iniciar sesión
        </button>
        <button
          @click="handleClose"
          class="w-full rounded-md border border-gray-600/50 px-6 py-3 text-base font-medium text-gray-300 transition-colors duration-150 ease-in-out hover:bg-gray-700/20"
        >
          Volver atrás
        </button>
      </div>
    </div>
  </div>
</template>
