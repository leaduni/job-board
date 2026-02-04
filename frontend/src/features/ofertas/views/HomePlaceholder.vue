<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Navegación existente -->
    <NavBar />

    <!-- Hero Section -->
    <header
      class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#2a1630] via-[#201028] to-[#09092a]"
    >
      <!-- Elementos decorativos de fondo -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          class="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#a0218b] opacity-20 blur-[120px]"
        ></div>
        <div
          class="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#d23b97] opacity-10 blur-[100px]"
        ></div>
      </div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6"
        >
          Encuentra el trabajo <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#d23b97] to-[#ff5a9e]"
          >
            que impulsa tu futuro
          </span>
        </h1>
        <p class="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto mb-10">
          Conectamos a los mejores talentos de la universidad con empresas
          líderes. Explora cientos de oportunidades exclusivas para nuestra
          comunidad.
        </p>

        <!-- Barra de Búsqueda -->
        <div
          class="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2"
        >
          <div
            class="flex-1 relative flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-100"
          >
            <svg
              class="w-5 h-5 text-gray-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Cargo, empresa o palabra clave"
              class="w-full py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <div class="flex-1 relative flex items-center px-4">
            <svg
              class="w-5 h-5 text-gray-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Ciudad o Modalidad"
              class="w-full py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            class="bg-[#a0218b] hover:bg-[#851b73] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Buscar
          </button>
        </div>

        <div class="mt-8 flex justify-center gap-4 text-sm text-gray-400">
          <span>Tendencias:</span>
          <a href="#" class="text-white hover:text-[#ff5a9e] transition-colors"
            >Desarrollador</a
          >
          <span class="text-gray-600">•</span>
          <a href="#" class="text-white hover:text-[#ff5a9e] transition-colors"
            >Marketing</a
          >
          <span class="text-gray-600">•</span>
          <a href="#" class="text-white hover:text-[#ff5a9e] transition-colors"
            >Prácticas</a
          >
        </div>
      </div>
    </header>

    <!-- Stats Section -->
    <section class="bg-white py-12 border-b border-gray-100">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl
          class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
        >
          <div class="flex flex-col gap-y-2">
            <dt class="text-base leading-7 text-gray-600">
              Empresas asociadas
            </dt>
            <dd
              class="order-first text-3xl font-bold tracking-tight text-[#2a1630] sm:text-5xl"
            >
              120+
            </dd>
          </div>
          <div class="flex flex-col gap-y-2">
            <dt class="text-base leading-7 text-gray-600">Ofertas activas</dt>
            <dd
              class="order-first text-3xl font-bold tracking-tight text-[#2a1630] sm:text-5xl"
            >
              450+
            </dd>
          </div>
          <div class="flex flex-col gap-y-2">
            <dt class="text-base leading-7 text-gray-600">
              Candidatos contratados
            </dt>
            <dd
              class="order-first text-3xl font-bold tracking-tight text-[#2a1630] sm:text-5xl"
            >
              2.1k
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Categorias -->
    <section class="py-20 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Explora por Categoría
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Encuentra oportunidades en tu área de especialización.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#d23b97]/30 cursor-pointer"
          >
            <div
              :class="`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center mb-4 text-white`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="cat.path"
                />
              </svg>
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 group-hover:text-[#a0218b] transition-colors"
            >
              {{ cat.name }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ cat.count }} ofertas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ofertas Destacadas -->
    <section class="py-20 bg-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2
              class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Ofertas Recientes
            </h2>
            <p class="mt-2 text-lg text-gray-600">
              Las últimas oportunidades publicadas para ti.
            </p>
          </div>
          <router-link
            to="/ofertas"
            class="hidden md:inline-flex items-center text-[#a0218b] font-semibold hover:text-[#d23b97]"
          >
            Ver todas las ofertas
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="job in featuredJobs"
            :key="job.id"
            class="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl"
              >
                {{ job.company[0] }}
              </div>
              <span
                class="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
              >
                {{ job.type }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ job.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              {{ job.company }} • {{ job.location }}
            </p>

            <div
              class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between"
            >
              <span class="text-sm font-medium text-gray-900">{{
                job.salary
              }}</span>
              <span class="text-xs text-gray-400">{{ job.postedAt }}</span>
            </div>
          </div>
        </div>

        <div class="mt-10 text-center md:hidden">
          <router-link
            to="/ofertas"
            class="inline-flex items-center text-[#a0218b] font-semibold hover:text-[#d23b97]"
          >
            Ver todas las ofertas
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section
      class="relative isolate overflow-hidden bg-[#2a1630] py-16 sm:py-24 lg:py-32"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
        >
          <div class="max-w-xl lg:max-w-lg">
            <h2
              class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              ¿Listo para impulsar tu carrera?
            </h2>
            <p class="mt-4 text-lg leading-8 text-gray-300">
              Crea tu perfil profesional, sube tu CV y deja que las empresas te
              encuentren. Es completamente gratis para estudiantes y egresados.
            </p>
            <div class="mt-6 flex max-w-md gap-x-4">
              <button
                class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#2a1630] shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#1a0b20] text-gray-400 py-12 border-t border-white/10">
      <div
        class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div class="mb-4 md:mb-0">
          <span class="text-2xl font-bold text-white">LEAD UNI</span>
          <p class="text-sm mt-1">Bolsa Laboral Universitaria</p>
        </div>
        <div class="flex gap-6 text-sm">
          <a href="#" class="hover:text-white transition-colors">Términos</a>
          <a href="#" class="hover:text-white transition-colors">Privacidad</a>
          <a href="#" class="hover:text-white transition-colors">Contacto</a>
        </div>
        <div class="mt-4 md:mt-0 text-sm">
          &copy; 2024 LEAD UNI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";

const categories = [
  {
    name: "Tecnología",
    count: 120,
    color: "bg-blue-500",
    path: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5", // Code bracket-ish
  },
  {
    name: "Finanzas",
    count: 85,
    color: "bg-green-500",
    path: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Currency-ish
  },
  {
    name: "Marketing",
    count: 64,
    color: "bg-purple-500",
    path: "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46", // Megaphone
  },
  {
    name: "Administración",
    count: 92,
    color: "bg-orange-500",
    path: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5M12 6.75h1.5M15 6.75h1.5M9 10.5h1.5M12 10.5h1.5M15 10.5h1.5M9 14.25h1.5M12 14.25h1.5M15 14.25h1.5M9 18h1.5M12 18h1.5M15 18h1.5", // Building
  },
];

const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer Vue.js",
    company: "TechSolutions Inc.",
    location: "Remoto",
    type: "Full-time",
    salary: "$2500 - $3500",
    postedAt: "Hace 2 días",
  },
  {
    id: 2,
    title: "Analista de Datos Jr.",
    company: "DataCorp",
    location: "Ciudad Capital",
    type: "Híbrido",
    salary: "$1800 - $2200",
    postedAt: "Hace 5 horas",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "Remoto",
    type: "Freelance",
    salary: "Por proyecto",
    postedAt: "Hace 1 día",
  },
];
</script>
