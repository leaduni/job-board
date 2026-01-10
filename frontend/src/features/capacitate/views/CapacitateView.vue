<script setup>
import CourseFilterSidebar from '@/features/capacitate/components/CourseFilterSidebar.vue';
import CourseCard from '@/features/capacitate/components/CourseCard.vue';
import { ref } from 'vue';

const mockCourses = ref([
  {
    id: 1,
    title: 'JAVA DESARROLLO DE APLICACIONES WEB',
    provider: 'Sistemas UNI',
    duration: '24h',
    level: 'Avanzado',
    price: 240,
    image: 'https://www.sistemasuni.edu.pe/images/headers/logo-sistemasuni.png',
    hasCertificate: true,
  },
  {
    id: 2,
    title: 'Certificado profesional de Microsoft SQL Server',
    provider: 'Coursera',
    duration: '84h',
    level: 'Intermedio',
    price: 120,
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/64/5d6093962b497db0a29df0bc7644a7/Microsoft-SQL-Server.png?auto=format%2C%20compress%2C%20enhance&dpr=2&w=320&h=180&fit=crop&q=50',
    hasCertificate: true,
  },
  {
    id: 3,
    title: 'Performance en nuestras aplicaciones - Curso ReactJS Avanzado - OpenBootcamp',
    provider: 'OpenBootcamp',
    duration: '1h',
    level: 'Avanzado',
    price: 0,
    image: 'https://i.ytimg.com/vi/3bJA8dah9d4/hqdefault.jpg',
    hasCertificate: false,
  },
    {
    id: 4,
    title: 'Curso: CI/CD con IA y GitHub Actions',
    provider: 'EDTeam',
    duration: '2h',
    level: 'Básico',
    price: 15,
    image: 'https://edteam-media.s3.amazonaws.com/courses/big/3d92edff-6077-4cd6-86c2-62c186e0c334.png',
    hasCertificate: false,
  },
  {
    id: 5,
    title: 'Curso: C# desde cero',
    provider: 'EDTeam',
    duration: '4h',
    level: 'Básico',
    price: 12,
    image: 'https://edteam-media.s3.amazonaws.com/courses/big/35a6374d-63b3-4086-9cfa-aed775c08d82.png',
    hasCertificate: false,
  }
]);

function handleFilterChange(filters) {
  console.log('Filters updated in parent view:', filters);
  // Here you would typically trigger an API call to fetch filtered courses
}
</script>

<template>
  <div class="bg-[#09092a] text-white min-h-screen pt-[calc(72px+24px)]">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <CourseFilterSidebar @filter-change="handleFilterChange" />
        </div>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <div class="mb-6">
            <h1 class="text-3xl font-bold text-white/90 mb-2">Explora Cursos y Rutas de Aprendizaje</h1>
            <p class="text-white/70">
              Encuentra los mejores cursos para potenciar tu perfil profesional
            </p>
          </div>
          
          <!-- Courses Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              v-for="course in mockCourses"
              :key="course.id"
              :course="course"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles can go here if needed */
</style>
