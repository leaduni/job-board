<script setup>
import { ref, reactive } from 'vue';

const isEditing = ref(false);

const profileData = reactive({
  firstName: 'Alexandra',
  lastName: 'Torres',
  career: 'Ingeniería de Software con IA',
  cycle: '8vo Ciclo',
  location: 'Lima, Perú',
  linkedin: 'https://linkedin.com/in/alexandratorres',
  skills: ['Vue.js', 'Tailwind CSS', 'Node.js', 'Python', 'SQL'],
  cv: null,
  cvFileName: 'curriculum_vitae_alexandra.pdf'
});

// Mock data for dropdowns
const careers = [
  'Ingeniería de Software con IA',
  'Ciencia de Datos',
  'Diseño Gráfico Digital',
  'Marketing Digital'
];

// A copy to revert changes if canceled
let originalProfileData = {};

function toggleEditMode(saveChanges) {
  if (isEditing.value && !saveChanges) {
    // Restore original data on cancel
    Object.assign(profileData, originalProfileData);
  } else if (!isEditing.value) {
    // Store a copy when entering edit mode
    originalProfileData = { ...profileData, skills: [...profileData.skills] };
  }
  isEditing.value = !isEditing.value;
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    profileData.cv = file;
    profileData.cvFileName = file.name;
  } else {
    alert('Por favor, sube un archivo en formato PDF.');
  }
}

function removeSkill(skillToRemove) {
  if (!isEditing.value) return;
  profileData.skills = profileData.skills.filter(skill => skill !== skillToRemove);
}

function addSkill(event) {
    const newSkill = event.target.value.trim();
    if (newSkill && !profileData.skills.includes(newSkill)) {
        profileData.skills.push(newSkill);
    }
    event.target.value = '';
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Mi Perfil</h1>
        <button
          @click="toggleEditMode(true)"
          class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {{ isEditing ? 'Guardar Cambios' : 'Editar Perfil' }}
        </button>
        <button
          v-if="isEditing"
          @click="toggleEditMode(false)"
          class="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Cancelar
        </button>
      </div>

      <!-- Profile Card -->
      <div class="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

          <!-- Section: Datos Personales y Académicos -->
          <div class="md:col-span-2">
            <h2 class="text-xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">Datos Académicos</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Nombres -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Nombres</label>
                <p v-if="!isEditing" class="text-lg">{{ profileData.firstName }}</p>
                <input v-else v-model="profileData.firstName" type="text" class="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              </div>

              <!-- Apellidos -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Apellidos</label>
                <p v-if="!isEditing" class="text-lg">{{ profileData.lastName }}</p>
                <input v-else v-model="profileData.lastName" type="text" class="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              </div>

              <!-- Carrera -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Carrera</label>
                <p v-if="!isEditing" class="text-lg">{{ profileData.career }}</p>
                <select v-else v-model="profileData.career" class="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
                  <option v-for="career in careers" :key="career" :value="career">{{ career }}</option>
                </select>
              </div>

              <!-- Ciclo / Año de Egreso -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Ciclo / Año de Egreso</label>
                <p v-if="!isEditing" class="text-lg">{{ profileData.cycle }}</p>
                <input v-else v-model="profileData.cycle" type="text" placeholder="Ej. 8vo Ciclo o 2023" class="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              </div>
            </div>
          </div>

          <!-- Section: Ubicación y Networking -->
          <div class="md:col-span-1">
             <h2 class="text-xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">Ubicación y Redes</h2>
             <!-- Ubicacion -->
              <div class="mb-6">
                <label class="block text-gray-400 text-sm font-bold mb-2">Distrito / Ciudad</label>
                <p v-if="!isEditing" class="text-lg">{{ profileData.location || 'No especificado' }}</p>
                <input v-else v-model="profileData.location" type="text" class="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              </div>
              <!-- LinkedIn -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Perfil de LinkedIn</label>
                 <a v-if="!isEditing" :href="profileData.linkedin" target="_blank" class="text-fuchsia-400 hover:text-fuchsia-300 break-all">{{ profileData.linkedin }}</a>
                <input v-else v-model="profileData.linkedin" type="url" class="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              </div>
          </div>

          <!-- Section: Skills y CV -->
          <div class="md:col-span-3 mt-4">
            <h2 class="text-xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">Skills y Documentos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Skills Técnicos -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Skills Técnicos</label>
                <div class="flex flex-wrap gap-2">
                    <span v-for="skill in profileData.skills" :key="skill" class="flex items-center bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                        {{ skill }}
                        <button v-if="isEditing" @click="removeSkill(skill)" class="ml-2 text-red-400 hover:text-red-200 text-xs">
                          &times;
                        </button>
                    </span>
                </div>
                 <input
                    v-if="isEditing"
                    type="text"
                    @keyup.enter="addSkill"
                    placeholder="Añadir skill y presionar Enter"
                    class="mt-4 w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
              </div>

              <!-- CV -->
              <div>
                <label class="block text-gray-400 text-sm font-bold mb-2">Curriculum Vitae (PDF)</label>
                <div v-if="!isEditing" class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-fuchsia-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span class="text-gray-300">{{ profileData.cvFileName || 'No se ha subido CV' }}</span>
                </div>
                <div v-else>
                    <label for="cv-upload" class="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-block">
                        {{ profileData.cv ? 'Cambiar CV' : 'Subir CV (PDF)' }}
                    </label>
                    <input id="cv-upload" type="file" @change="handleFileUpload" accept=".pdf" class="hidden">
                    <p class="text-gray-400 text-sm mt-2">{{ profileData.cvFileName || '' }}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
