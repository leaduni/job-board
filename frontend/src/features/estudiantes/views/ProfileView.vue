<script setup>
import { ref, reactive, computed, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { coreApi } from "@/services/coreApi";
import { uploadCV } from "@/services/upload.service";
import {
  CARRERAS_UNI,
  ANIO_EGRESO_MIN,
  ANIO_EGRESO_MAX,
} from "@/config/constants";
import {
  DEPARTAMENTOS,
  DEPARTAMENTOS_DISTRITOS,
} from "@/config/ubicacion-peru";
import {
  getMySkills,
  searchSkills,
  attachSkills,
  removeSkill,
} from "@/services/skillsApi";

const router = useRouter();
const { logout, isAuthenticated } = useAuth();

// --- NOTIFICATION STATE ---
const notification = reactive({
  show: false,
  message: "",
});

// --- STATE MANAGEMENT ---
const loading = ref(true);
const uploadingCv = ref(false);
const error = ref(null);
const fileInput = ref(null);

const profileData = reactive({
  nombres: "",
  apellidos: "",
  telefono: "",
  fecha_nacimiento: "",
  departamento: "",
  distrito: "",
  carrera: "",
  otra_carrera: "",
  anio_egreso: null,
  sobre_mi: "",
  linkedin_url: "",
  github_url: "",
  portfolio_url: "",
  cv_url: "",
  cv_filename: "No hay CV cargado",
});

const distritosDelDepartamento = computed(() => {
  const dep = profileData.departamento;
  return dep ? (DEPARTAMENTOS_DISTRITOS[dep] || []).slice().sort() : [];
});

// --- API FETCH ---
async function fetchProfile() {
  loading.value = true;
  try {
    const { data } = await coreApi.get("/api/me");

    const candidate = data.candidate || {};
    const user = data.user || {};

    // Mapeo de campos
    profileData.nombres = candidate.first_name || "";
    profileData.apellidos = candidate.last_name || "";
    profileData.telefono = candidate.phone || "";

    if (candidate.birth_date) {
      profileData.fecha_nacimiento = candidate.birth_date.split("T")[0];
    }

    if (candidate.location) {
      const parts = candidate.location.split(",").map((p) => p?.trim() || "");
      profileData.distrito = parts[0] || "";
      const depRaw = parts.length > 1 ? parts[1] : "";
      profileData.departamento =
        DEPARTAMENTOS.find((d) => d.toLowerCase() === depRaw.toLowerCase()) ||
        depRaw;
    }

    profileData.anio_egreso = candidate.end_year ?? null;
    const rawCarrera = candidate.carrera || "";
    if (rawCarrera && !CARRERAS_UNI.includes(rawCarrera)) {
      profileData.carrera = "Otra";
      profileData.otra_carrera = rawCarrera;
    } else {
      profileData.carrera = rawCarrera;
      profileData.otra_carrera = "";
    }
    profileData.sobre_mi = candidate.bio || "";
    profileData.linkedin_url = candidate.linkedin_url || "";
    profileData.github_url = candidate.github_url || "";
    profileData.portfolio_url = candidate.portfolio_url || "";

    // Mapeo CV
    profileData.cv_url = candidate.cv_url || "";
    profileData.cv_filename = candidate.cv_url
      ? "CV Cargado (PDF)"
      : "No hay CV cargado";
  } catch (err) {
    console.error("Error cargando perfil:", err);
    error.value = "No se pudo cargar la información del perfil.";

    if (err.response?.status === 401) {
      router.push("/auth/login");
    }
  } finally {
    loading.value = false;
  }
}

// --- CV UPLOAD ---
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type !== "application/pdf") {
    notification.message = "Solo se permiten archivos PDF";
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
    return;
  }

  uploadingCv.value = true;
  try {
    const response = await uploadCV(file);

    if (response.ok && response.result?.secure_url) {
      const cvUrl = response.result.secure_url;

      await coreApi.patch("/api/me/candidate", {
        cv_url: cvUrl,
      });

      profileData.cv_url = cvUrl;
      profileData.cv_filename = file.name;

      notification.message = "CV subido correctamente";
      notification.show = true;
    }
  } catch (err) {
    console.error("Error subiendo CV:", err);
    notification.message = "Error al subir el CV";
    notification.show = true;
  } finally {
    uploadingCv.value = false;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
    event.target.value = "";
  }
};

// --- SKILLS MANAGEMENT ---
const mySkills = ref([]);
const skillSearchQuery = ref("");
const skillSearchResults = ref([]);
const searchingSkills = ref(false);
const addingSkill = ref(false);
const removingSkillId = ref(null);
let skillSearchTimeout = null;

async function fetchMySkills() {
  try {
    mySkills.value = await getMySkills();
  } catch (err) {
    console.error("Error cargando skills:", err);
    mySkills.value = [];
  }
}

function onSkillSearchInput() {
  if (skillSearchTimeout) clearTimeout(skillSearchTimeout);
  const q = skillSearchQuery.value.trim();
  if (!q || q.length < 2) {
    skillSearchResults.value = [];
    return;
  }
  skillSearchTimeout = setTimeout(async () => {
    searchingSkills.value = true;
    try {
      const results = await searchSkills(q, 8);
      // Filter out skills the user already has
      const myIds = new Set(mySkills.value.map((s) => s.id));
      skillSearchResults.value = results.filter((s) => !myIds.has(s.id));
    } catch (err) {
      console.error("Error buscando skills:", err);
      skillSearchResults.value = [];
    } finally {
      searchingSkills.value = false;
    }
  }, 300);
}

async function addSkillById(skill) {
  addingSkill.value = true;
  try {
    const result = await attachSkills({ skillIds: [skill.id] });
    mySkills.value = result.items || [...mySkills.value, skill];
    skillSearchQuery.value = "";
    skillSearchResults.value = [];
    notification.message = `Skill "${skill.name}" agregada`;
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 2500);
  } catch (err) {
    console.error("Error agregando skill:", err);
    notification.message = "Error al agregar skill";
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
  } finally {
    addingSkill.value = false;
  }
}

async function addSkillByName() {
  const name = skillSearchQuery.value.trim();
  if (!name) return;
  addingSkill.value = true;
  try {
    const result = await attachSkills({ skillNames: [name] });
    mySkills.value = result.items || mySkills.value;
    skillSearchQuery.value = "";
    skillSearchResults.value = [];
    notification.message = `Skill "${name}" agregada`;
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 2500);
  } catch (err) {
    console.error("Error creando skill:", err);
    notification.message = "Error al agregar skill";
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
  } finally {
    addingSkill.value = false;
  }
}

async function handleRemoveSkill(skill) {
  removingSkillId.value = skill.id;
  try {
    const result = await removeSkill(skill.id);
    mySkills.value =
      result.items || mySkills.value.filter((s) => s.id !== skill.id);
    notification.message = `Skill "${skill.name}" eliminada`;
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 2500);
  } catch (err) {
    console.error("Error eliminando skill:", err);
    notification.message = "Error al eliminar skill";
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
  } finally {
    removingSkillId.value = null;
  }
}

// --- UPDATE PROFILE ---
async function updateCandidate(cardKey) {
  try {
    const payload = {};

    // Construir payload según la tarjeta editada
    if (cardKey === "personal") {
      const nombres = profileData.nombres?.trim() || "";
      const apellidos = profileData.apellidos?.trim() || "";
      if (!nombres || !apellidos) {
        notification.message = "Nombres y apellidos son obligatorios";
        notification.show = true;
        setTimeout(() => {
          notification.show = false;
        }, 3000);
        return;
      }
      payload.first_name = nombres;
      payload.last_name = apellidos;
      payload.phone = profileData.telefono?.trim() || null;
      payload.birth_date = profileData.fecha_nacimiento?.trim() || null;
      const loc = [profileData.distrito, profileData.departamento]
        .map((s) => s?.trim())
        .filter(Boolean)
        .join(", ");
      payload.location = loc || null;
    } else if (cardKey === "academic") {
      const anio = profileData.anio_egreso
        ? parseInt(profileData.anio_egreso, 10)
        : null;
      if (anio !== null && (anio < ANIO_EGRESO_MIN || anio > ANIO_EGRESO_MAX)) {
        notification.message = `El año de egreso debe estar entre ${ANIO_EGRESO_MIN} y ${ANIO_EGRESO_MAX}`;
        notification.show = true;
        setTimeout(() => {
          notification.show = false;
        }, 3000);
        return;
      }
      payload.end_year = anio;
      payload.carrera =
        profileData.carrera === "Otra"
          ? profileData.otra_carrera?.trim() || null
          : profileData.carrera?.trim() || null;
    } else if (cardKey === "about") {
      payload.bio = profileData.sobre_mi;
    } else if (cardKey === "links") {
      payload.linkedin_url = profileData.linkedin_url;
      payload.github_url = profileData.github_url;
      payload.portfolio_url = profileData.portfolio_url;
    }

    // Llamada PATCH
    await coreApi.patch("/api/me/candidate", payload);

    // Feedback visual
    notification.message = "Perfil actualizado correctamente";
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
  } catch (err) {
    console.error("Error actualizando perfil:", err);
    const msg =
      err.response?.data?.error ||
      err.response?.data?.detail ||
      err.message ||
      "Error al guardar los cambios";
    notification.message = msg;
    notification.show = true;
    setTimeout(() => {
      notification.show = false;
    }, 3000);
  }
}

// --- LOGOUT ---
const handleLogout = () => {
  logout();
};

// --- LOGIC (Existing editing logic) ---
// State for granular editing of cards
const editingCards = reactive({
  personal: false,
  academic: false,
  about: false,
  links: false,
});

let originalProfileData = {};

async function toggleCardEditMode(cardKey, saveChanges = false) {
  if (editingCards[cardKey]) {
    // Si estamos guardando/cancelando
    if (saveChanges) {
      // Guardar cambios en API
      await updateCandidate(cardKey);
    } else {
      // Cancelar: Revertir cambios
      Object.assign(profileData, originalProfileData);
    }
    editingCards[cardKey] = false;
  } else {
    // Entrar en modo edición
    // Store a snapshot of the current state before editing
    originalProfileData = JSON.parse(JSON.stringify(profileData));
    editingCards[cardKey] = true;
  }
}

const fullName = computed(
  () => `${profileData.nombres} ${profileData.apellidos}`,
);

// Incluir carrera actual si no está en la lista (ej. valor guardado previamente)
const carrerasOptions = computed(() => {
  const current = profileData.carrera;
  if (!current) return CARRERAS_UNI;
  if (CARRERAS_UNI.includes(current)) return CARRERAS_UNI;
  return [current, ...CARRERAS_UNI];
});

onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace("/");
    return;
  }
  fetchProfile();
  fetchMySkills();

  // Notification logic
  const action = localStorage.getItem("auth_action");
  const NOTIFICATION_MESSAGES = {
    register:
      "¡Cuenta creada exitosamente! Bienvenid@ a Bolsa Laboral - LEAD UNI",
    login: "¡Bienvenid@ de nuevo! Las ofertas te esperan",
  };
  if (action && NOTIFICATION_MESSAGES[action]) {
    notification.message = NOTIFICATION_MESSAGES[action];
    notification.show = true;
    localStorage.removeItem("auth_action");
    setTimeout(() => {
      notification.show = false;
    }, 4000);
  }
});
</script>

<template>
  <div class="min-h-screen bg-[rgb(9,9,42)] text-white font-sans pt-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <header
        class="flex flex-col sm:flex-row items-center gap-6 mb-12 justify-between"
      >
        <div class="flex items-center gap-6">
          <img
            class="h-24 w-24 rounded-full object-cover border-2 border-[#a6249d]/40"
            src="/src/assets/avatar-placeholder.jpg"
            alt="Avatar"
          />
          <div class="text-center sm:text-left">
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent"
            >
              {{ fullName }}
            </h1>
            <p class="text-lg text-white/80">
              {{
                profileData.carrera === "Otra"
                  ? profileData.otra_carrera
                  : profileData.carrera
              }}
            </p>
          </div>
        </div>

        <button
          @click="handleLogout"
          class="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#a6249d]/40 text-[#ff6ec7] hover:bg-[#a6249d]/20 hover:border-[#a6249d]/60 transition-all duration-300 text-sm font-bold"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Cerrar Sesión
        </button>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div class="bento-card md:col-span-5">
          <div class="card-header">
            <h3 class="card-title">Información Personal</h3>
            <button
              @click="toggleCardEditMode('personal')"
              class="edit-button"
              title="Editar"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M13.94 5L19 10.06 9.06 20H4v-5.06zM16.5 2.5c.41 0 .79.16 1.06.44l1.44 1.44c.59.59.59 1.54 0 2.12l-1.83 1.83-5.06-5.06L14.38 2.94c.27-.28.65-.44 1.06-.44M4 14v2h2l7.5-7.5-2-2L4 14z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="card-content">
            <ul class="info-list">
              <li>
                <span>Nombres</span
                ><strong v-if="!editingCards.personal">{{
                  profileData.nombres
                }}</strong
                ><input
                  v-else
                  v-model="profileData.nombres"
                  class="edit-input"
                />
              </li>
              <li>
                <span>Apellidos</span
                ><strong v-if="!editingCards.personal">{{
                  profileData.apellidos
                }}</strong
                ><input
                  v-else
                  v-model="profileData.apellidos"
                  class="edit-input"
                />
              </li>
              <li>
                <span>Teléfono</span
                ><strong v-if="!editingCards.personal">{{
                  profileData.telefono
                }}</strong
                ><input
                  v-else
                  v-model="profileData.telefono"
                  class="edit-input"
                />
              </li>
              <li>
                <span>Nacimiento</span
                ><strong v-if="!editingCards.personal">{{
                  profileData.fecha_nacimiento
                }}</strong
                ><input
                  v-else
                  v-model="profileData.fecha_nacimiento"
                  type="date"
                  class="edit-input"
                />
              </li>
              <li>
                <span>Ubicación</span
                ><strong v-if="!editingCards.personal"
                  >{{ profileData.distrito
                  }}{{
                    profileData.departamento
                      ? ", " + profileData.departamento
                      : ""
                  }}</strong
                >
                <div v-else class="flex flex-col gap-2">
                  <select
                    v-model="profileData.departamento"
                    class="edit-input"
                    @change="profileData.distrito = ''"
                  >
                    <option value="">Seleccionar departamento</option>
                    <option v-for="d in DEPARTAMENTOS" :key="d" :value="d">
                      {{ d }}
                    </option></select
                  ><select
                    v-model="profileData.distrito"
                    class="edit-input"
                    :disabled="!profileData.departamento"
                  >
                    <option value="">Seleccionar distrito</option>
                    <option
                      v-for="dist in distritosDelDepartamento"
                      :key="dist"
                      :value="dist"
                    >
                      {{ dist }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
            <div v-if="editingCards.personal" class="flex gap-3 mt-4">
              <button
                @click="toggleCardEditMode('personal', true)"
                class="save-button"
              >
                Guardar
              </button>
              <button
                @click="toggleCardEditMode('personal', false)"
                class="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div class="bento-card md:col-span-7">
          <div class="card-header">
            <h3 class="card-title">Información Académica</h3>
            <button
              @click="toggleCardEditMode('academic')"
              class="edit-button"
              title="Editar"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M13.94 5L19 10.06 9.06 20H4v-5.06zM16.5 2.5c.41 0 .79.16 1.06.44l1.44 1.44c.59.59.59 1.54 0 2.12l-1.83 1.83-5.06-5.06L14.38 2.94c.27-.28.65-.44 1.06-.44M4 14v2h2l7.5-7.5-2-2L4 14z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="card-content">
            <ul class="info-list">
              <li>
                <span>Carrera</span>
                <strong v-if="!editingCards.academic">{{
                  profileData.carrera === "Otra"
                    ? profileData.otra_carrera || "No definida"
                    : profileData.carrera || "No definida"
                }}</strong>

                <div v-else class="flex flex-col gap-2 w-1/2">
                  <select
                    v-model="profileData.carrera"
                    class="edit-input !w-full"
                  >
                    <option value="">Seleccionar carrera</option>
                    <option v-for="c in carrerasOptions" :key="c" :value="c">
                      {{ c }}
                    </option>
                    <option value="Otra">Otra (Especificar)</option>
                  </select>

                  <input
                    v-if="profileData.carrera === 'Otra'"
                    v-model="profileData.otra_carrera"
                    type="text"
                    placeholder="Escribe tu carrera aquí..."
                    class="edit-input !w-full mt-2"
                  />
                </div>
              </li>

              <li>
                <span>Año Egreso</span>
                ><strong v-if="!editingCards.academic">{{
                  profileData.anio_egreso || "N/A"
                }}</strong
                ><input
                  v-else
                  v-model="profileData.anio_egreso"
                  type="number"
                  :min="ANIO_EGRESO_MIN"
                  :max="ANIO_EGRESO_MAX"
                  class="edit-input"
                  placeholder="1980-2080"
                />
              </li>
            </ul>
            <div v-if="editingCards.academic" class="flex gap-3 mt-4">
              <button
                @click="toggleCardEditMode('academic', true)"
                class="save-button"
              >
                Guardar
              </button>
              <button
                @click="toggleCardEditMode('academic', false)"
                class="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div class="bento-card md:col-span-12">
          <div class="card-header">
            <h3 class="card-title">Sobre Mí</h3>
            <button
              @click="toggleCardEditMode('about')"
              class="edit-button"
              title="Editar"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M13.94 5L19 10.06 9.06 20H4v-5.06zM16.5 2.5c.41 0 .79.16 1.06.44l1.44 1.44c.59.59.59 1.54 0 2.12l-1.83 1.83-5.06-5.06L14.38 2.94c.27-.28.65-.44 1.06-.44M4 14v2h2l7.5-7.5-2-2L4 14z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="card-content">
            <p v-if="!editingCards.about" class="text-white/70 leading-relaxed">
              {{ profileData.sobre_mi }}
            </p>
            <textarea
              v-else
              v-model="profileData.sobre_mi"
              class="edit-input-area"
              rows="4"
            ></textarea>
            <div v-if="editingCards.about" class="flex gap-3 mt-4">
              <button
                @click="toggleCardEditMode('about', true)"
                class="save-button"
              >
                Guardar
              </button>
              <button
                @click="toggleCardEditMode('about', false)"
                class="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Skills Card -->
          <div class="bento-card md:col-span-2">
            <div class="card-header">
              <h3 class="card-title">Mis Skills</h3>
            </div>
            <div class="card-content">
              <!-- Skill pills -->
              <div class="flex flex-wrap gap-2 mb-4" v-if="mySkills.length > 0">
                <span
                  v-for="skill in mySkills"
                  :key="skill.id"
                  class="skill-pill"
                >
                  {{ skill.name }}
                  <button
                    @click="handleRemoveSkill(skill)"
                    :disabled="removingSkillId === skill.id"
                    class="skill-remove-btn"
                    :title="`Quitar ${skill.name}`"
                  >
                    <span
                      v-if="removingSkillId === skill.id"
                      class="inline-block animate-spin text-xs"
                      >⏳</span
                    >
                    <span v-else>&times;</span>
                  </button>
                </span>
              </div>
              <p v-else class="text-white/50 text-sm mb-4">
                Aún no tienes skills agregadas. Agrega tus habilidades para
                mejorar tu compatibilidad con las ofertas.
              </p>

              <!-- Search & Add -->
              <div class="relative max-w-md">
                <div class="flex gap-2">
                  <input
                    v-model="skillSearchQuery"
                    @input="onSkillSearchInput"
                    type="text"
                    placeholder="Buscar o agregar skill (ej: Python, React, SQL...)"
                    class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] transition-all"
                  />
                  <button
                    v-if="skillSearchQuery.trim().length >= 2"
                    @click="addSkillByName"
                    :disabled="addingSkill"
                    class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white font-bold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {{ addingSkill ? "..." : "+ Crear" }}
                  </button>
                </div>

                <!-- Search dropdown -->
                <div
                  v-if="skillSearchResults.length > 0"
                  class="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1A0B2E] border-2 border-[#a6249d]/40 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                >
                  <button
                    v-for="result in skillSearchResults"
                    :key="result.id"
                    @click="addSkillById(result)"
                    :disabled="addingSkill"
                    class="w-full text-left px-4 py-3 text-sm text-white/90 hover:bg-[#a6249d]/20 transition-colors flex items-center justify-between border-b border-white/5 last:border-0"
                  >
                    <span>{{ result.name }}</span>
                    <span class="text-xs text-[#ff6ec7]">+ Agregar</span>
                  </button>
                </div>

                <p v-if="searchingSkills" class="text-white/40 text-xs mt-2">
                  Buscando...
                </p>
                <p
                  v-else-if="
                    skillSearchQuery.trim().length >= 2 &&
                    skillSearchResults.length === 0 &&
                    !addingSkill
                  "
                  class="text-white/40 text-xs mt-2"
                >
                  No se encontró. Puedes crear la skill con el botón "+ Crear".
                </p>
              </div>
            </div>
          </div>

          <div class="bento-card relative">
            <h3 class="card-title mb-4">Documentación</h3>
            <div class="card-content">
              <!-- Hidden File Input -->
              <input
                type="file"
                ref="fileInput"
                accept="application/pdf"
                class="hidden"
                @change="handleFileChange"
              />

              <div
                class="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border-2 border-white/10 hover:border-[#a6249d]/40 group"
              >
                <!-- File Info / Link -->
                <div class="flex items-center gap-4 flex-1 min-w-0">
                  <div class="p-2 bg-[#a6249d]/20 rounded-lg text-[#ff6ec7]">
                    <svg
                      class="h-8 w-8 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="font-semibold text-white truncate"
                      :title="profileData.cv_filename"
                    >
                      {{ profileData.cv_filename }}
                    </p>
                    <a
                      v-if="profileData.cv_url"
                      :href="profileData.cv_url"
                      target="_blank"
                      class="text-xs text-[#ff6ec7] hover:text-white transition-colors flex items-center gap-1 mt-0.5"
                    >
                      Ver documento
                      <svg
                        class="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <p v-else class="text-xs text-white/40 mt-0.5">
                      Formato PDF (Max. 5MB)
                    </p>
                  </div>
                </div>

                <!-- Action Button -->
                <button
                  @click="triggerFileInput"
                  :disabled="uploadingCv"
                  class="ml-4 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <span v-if="uploadingCv">
                    <svg
                      class="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  <span v-else>
                    {{ profileData.cv_url ? "Actualizar" : "Subir" }}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="bento-card">
            <div class="card-header">
              <h3 class="card-title">Enlaces & Contacto</h3>
              <button
                @click="toggleCardEditMode('links')"
                class="edit-button"
                title="Editar"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M13.94 5L19 10.06 9.06 20H4v-5.06zM16.5 2.5c.41 0 .79.16 1.06.44l1.44 1.44c.59.59.59 1.54 0 2.12l-1.83 1.83-5.06-5.06L14.38 2.94c.27-.28.65-.44 1.06-.44M4 14v2h2l7.5-7.5-2-2L4 14z"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="card-content space-y-4">
              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-white/50"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>LinkedIn</title>
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                  />
                </svg>
                <a
                  v-if="!editingCards.links"
                  :href="profileData.linkedin_url"
                  target="_blank"
                  class="link-display"
                  >{{ profileData.linkedin_url }}</a
                >
                <input
                  v-else
                  v-model="profileData.linkedin_url"
                  class="edit-input-link"
                />
              </div>
              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-white/50"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                <a
                  v-if="!editingCards.links"
                  :href="profileData.github_url"
                  target="_blank"
                  class="link-display"
                  >{{ profileData.github_url }}</a
                >
                <input
                  v-else
                  v-model="profileData.github_url"
                  class="edit-input-link"
                />
              </div>
              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
                <a
                  v-if="!editingCards.links"
                  :href="profileData.portfolio_url"
                  target="_blank"
                  class="link-display"
                  >{{ profileData.portfolio_url }}</a
                >
                <input
                  v-else
                  v-model="profileData.portfolio_url"
                  class="edit-input-link"
                />
              </div>
              <div v-if="editingCards.links" class="flex gap-3 mt-4">
                <button
                  @click="toggleCardEditMode('links', true)"
                  class="save-button"
                >
                  Guardar
                </button>
                <button
                  @click="toggleCardEditMode('links', false)"
                  class="cancel-button"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Notification Toast -->
    <div
      v-if="notification.show"
      class="fixed top-28 right-10 z-50 flex items-center gap-4 px-6 py-4 rounded-xl bg-[#1A0B2E]/95 backdrop-blur-lg border-2 border-[#a6249d]/50 shadow-lg shadow-[#a6249d]/30 animate-fade-in-down"
    >
      <div class="flex-shrink-0">
        <svg
          class="h-6 w-6 text-[#ff6ec7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p class="text-white font-bold">{{ notification.message }}</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}

:root {
  --nav-height: 8rem;
  --font-heading: "League Spartan", sans-serif;
  --accent-pink: #ff6ec7;
  --lead-900: #09092a;
  --card-bg: #1a0b2e;
}
.bento-card {
  @apply bg-[#1A0B2E]/90 backdrop-blur-lg border-2 border-[#a6249d]/30 rounded-2xl p-6 transition-all duration-300 shadow-lg;
}
.bento-card:hover,
.bento-card:focus-within {
  @apply border-[#a6249d]/50 shadow-xl;
}
.card-header {
  @apply flex justify-between items-start mb-4;
}
.card-title {
  @apply font-[var(--font-heading)] text-xl font-bold bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent;
}
.card-content {
  @apply mt-2;
}
.edit-button {
  @apply text-[#ff6ec7] hover:text-white transition-colors duration-200;
}
.edit-button svg {
  fill: currentColor;
}
.info-list {
  @apply space-y-4;
}
.info-list li {
  @apply flex justify-between items-center gap-4 py-2 border-b border-white/5 last:border-0;
}
.info-list span {
  @apply text-sm text-white/60;
}
.info-list strong {
  @apply text-base font-semibold text-white/90 text-right;
}
.edit-input {
  @apply text-base text-right bg-white/5 py-2 px-3 rounded-xl w-1/2 focus:w-full transition-all duration-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] text-white;
}
select.edit-input {
  @apply text-left cursor-pointer appearance-none;
}
select.edit-input option {
  color: #111827;
  background: #ffffff;
}
.edit-input-link {
  @apply text-base text-left bg-white/5 py-2 px-3 rounded-xl w-full transition-all duration-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] text-white/80;
}
.link-display {
  @apply text-white/70 hover:text-[#ff6ec7] transition-colors truncate;
}
.edit-input-area {
  @apply w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:border-[#a6249d] text-white/80;
}
.save-button {
  @apply bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] text-white font-bold py-2.5 px-5 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-[#a6249d]/20;
}
.cancel-button {
  @apply bg-white/10 border-2 border-white/20 hover:bg-white/20 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors;
}
.skill-pill {
  @apply flex items-center bg-white/10 text-white/90 text-sm font-medium pl-4 pr-2 py-1.5 rounded-full;
}
.skill-remove-btn {
  @apply ml-2 text-red-500/70 hover:text-red-400 text-lg font-bold leading-none transition-colors;
}
.add-skill-btn {
  @apply text-sm font-medium text-white/60 hover:text-white bg-white/5 px-3 py-1.5 rounded-full transition-colors;
}
.inline-edit-input {
  @apply bg-white/10 rounded-full px-4 py-1.5 text-sm w-32 focus:w-40 transition-all duration-300 outline-none ring-1 ring-transparent focus:ring-[#d93340];
}
</style>
