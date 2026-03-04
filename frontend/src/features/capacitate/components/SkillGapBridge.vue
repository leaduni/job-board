<template>
  <div class="border-2 border-[#a6249d] bg-[#121225] rounded-[12px] p-[24px]">
    <h3 class="text-white/90 text-lg font-semibold mb-4">
      Análisis de compatibilidad
    </h3>

    <!-- Loading state -->
    <div v-if="loading" class="py-6 text-center">
      <div
        class="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#d93340]"
      ></div>
      <p class="mt-2 text-white/50 text-sm">Analizando compatibilidad...</p>
    </div>

    <!-- Not authenticated -->
    <div v-else-if="!isAuthenticated" class="text-center py-4">
      <svg
        class="mx-auto h-10 w-10 text-gray-500 mb-3"
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
      <p class="text-white/70 text-sm mb-3">
        Inicia sesión para ver tu compatibilidad con esta oferta.
      </p>
      <router-link
        to="/auth/login"
        class="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white font-bold text-sm hover:scale-105 transition-transform"
      >
        Iniciar sesión
      </router-link>
    </div>

    <!-- No required skills -->
    <div v-else-if="requiredSkillNames.length === 0" class="text-center py-4">
      <p class="text-white/60 text-sm">
        Esta oferta no tiene skills requeridas especificadas.
      </p>
    </div>

    <!-- Analysis -->
    <template v-else>
      <!-- Progress bar -->
      <div class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-white/70 text-sm">Compatibilidad</span>
          <span class="text-lg font-bold" :class="compatibilityColor"
            >{{ compatibilityPercent }}%</span
          >
        </div>
        <div class="w-full bg-white/10 rounded-full h-2.5">
          <div
            class="h-2.5 rounded-full transition-all duration-700 ease-out"
            :class="compatibilityBarColor"
            :style="{ width: `${compatibilityPercent}%` }"
          ></div>
        </div>
      </div>

      <!-- Skills list -->
      <ul class="space-y-2 mb-5">
        <li
          v-for="skill in analyzedSkills"
          :key="skill.name"
          class="flex items-center"
        >
          <span
            :class="[skill.has ? 'text-green-500' : 'text-yellow-500']"
            class="mr-2"
          >
            <svg
              v-if="skill.has"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
          <span class="text-white/90 text-sm">{{ skill.name }}</span>
          <span v-if="skill.has" class="ml-auto text-green-400/70 text-xs"
            >Tienes esta skill</span
          >
          <span v-else class="ml-auto text-yellow-400/70 text-xs"
            >Te falta</span
          >
        </li>
      </ul>

      <!-- Missing skills CTA -->
      <div
        v-if="missingSkills.length > 0"
        class="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4"
      >
        <div class="flex items-start gap-3">
          <svg
            class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="text-yellow-200 text-sm font-semibold mb-1">
              Te faltan {{ missingSkills.length }} skill{{
                missingSkills.length > 1 ? "s" : ""
              }}
              requerida{{ missingSkills.length > 1 ? "s" : "" }}
            </p>
            <p class="text-yellow-200/70 text-xs mb-3">
              Agrega tus skills en tu perfil para mejorar tu compatibilidad con
              las ofertas.
            </p>
            <router-link
              to="/perfil"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 text-xs font-semibold hover:bg-yellow-500/30 transition-colors"
            >
              <svg
                class="w-4 h-4"
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
              Agregar skills en mi perfil
            </router-link>
          </div>
        </div>
      </div>

      <!-- All matched -->
      <div
        v-else
        class="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4"
      >
        <div class="flex items-center gap-3">
          <svg
            class="w-5 h-5 text-green-400 flex-shrink-0"
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
          <p class="text-green-200 text-sm font-semibold">
            ¡Tienes todas las skills requeridas! Tu perfil es compatible.
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuth } from "@/composables/useAuth";
import { getMySkills } from "@/services/skillsApi";

const props = defineProps({
  oferta: { type: Object, default: null },
});

const { isAuthenticated } = useAuth();

const loading = ref(false);
const mySkills = ref([]);

// Parse required skills from the offer's skills_requeridas field
const requiredSkillNames = computed(() => {
  const raw = props.oferta?.skills_requeridas;
  if (!raw) return [];

  // Could be a string like "python, power bi, google workspace"
  // or an array
  if (Array.isArray(raw)) {
    return raw
      .map((s) => (typeof s === "string" ? s : s.name || s.skill || ""))
      .filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
});

// Compare required vs user skills (case-insensitive)
const analyzedSkills = computed(() => {
  const mySkillNamesLower = mySkills.value.map((s) => s.name.toLowerCase());
  return requiredSkillNames.value.map((name) => ({
    name,
    has: mySkillNamesLower.includes(name.toLowerCase()),
  }));
});

const missingSkills = computed(() =>
  analyzedSkills.value.filter((s) => !s.has),
);
const matchedSkills = computed(() => analyzedSkills.value.filter((s) => s.has));

const compatibilityPercent = computed(() => {
  if (analyzedSkills.value.length === 0) return 0;
  return Math.round(
    (matchedSkills.value.length / analyzedSkills.value.length) * 100,
  );
});

const compatibilityColor = computed(() => {
  const p = compatibilityPercent.value;
  if (p >= 80) return "text-green-400";
  if (p >= 50) return "text-yellow-400";
  return "text-red-400";
});

const compatibilityBarColor = computed(() => {
  const p = compatibilityPercent.value;
  if (p >= 80) return "bg-green-500";
  if (p >= 50) return "bg-yellow-500";
  return "bg-red-500";
});

async function fetchMySkills() {
  if (!isAuthenticated.value) return;
  loading.value = true;
  try {
    mySkills.value = await getMySkills();
  } catch (err) {
    console.error("Error fetching user skills:", err);
    mySkills.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchMySkills();
});

// Re-fetch if auth state changes
watch(isAuthenticated, (val) => {
  if (val) fetchMySkills();
  else mySkills.value = [];
});
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
