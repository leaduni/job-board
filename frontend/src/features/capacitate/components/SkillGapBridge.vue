<template>
  <div class="border-2 border-[#a6249d] bg-[#121225] rounded-[12px] p-[24px]">
    <h3 class="text-white/90 text-lg font-semibold mb-4">Análisis de compatibilidad</h3>
    <ul class="space-y-2 mb-6">
      <li v-for="skill in mockSkills" :key="skill.name" class="flex items-center">
        <span :class="[skill.has ? 'text-green-500' : 'text-yellow-500']" class="mr-2">
          <svg v-if="skill.has" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </span>
        <span class="text-white/90">{{ skill.name }}</span>
      </li>
    </ul>

    <h3 class="text-white/90 text-lg font-semibold mb-4">Potencia tu postulación con estos cursos</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      <div v-for="course in suggestedCourses" :key="course.title" class="bg-[#1a1a3a] rounded-[8px] p-4 flex items-center gap-4">
        <img :src="course.thumbnail" alt="Course thumbnail" class="w-16 h-16 rounded-[4px] object-cover">
        <div class="flex-grow min-w-0">
          <h4 class="text-white font-semibold">{{ course.title }}</h4>
          <p class="text-white/70 text-sm">{{ course.provider }} - {{ course.duration }}</p>
        </div>
        <span :class="[course.isFree ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400']" class="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full">
          {{ course.isFree ? 'Gratis' : 'De pago' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mockSkills = ref([
  { name: 'Vue.js', has: true },
  { name: 'Tailwind CSS', has: true },
  { name: 'Node.js', has: false },
  { name: 'SQL', has: true },
  { name: 'MongoDB', has: false },
]);

const suggestedCourses = ref([
  {
    title: 'Curso Avanzado de Node.js',
    provider: 'Sistemas UNI',
    duration: '40 horas',
    isFree: false,
    thumbnail: 'https://via.placeholder.com/150/1a1a3a/ffffff?text=Node.js'
  },
  {
    title: 'Introducción a MongoDB',
    provider: 'Coursera',
    duration: '12 horas',
    isFree: true,
    thumbnail: 'https://via.placeholder.com/150/1a1a3a/ffffff?text=MongoDB'
  }
]);
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
