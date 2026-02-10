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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Cargo, empresa o palabra clave"
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

    <!-- Categorias -->
    <section class="py-20 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Explora por Tipo de Contrato
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Encuentra la oportunidad que se adapta a tu disponibilidad.
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
            <p class="text-sm text-gray-500 mt-1">Explorar</p>
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

        <div v-if="loading" class="flex justify-center py-20">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#b62667]"
          ></div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="job in featuredJobs"
            :key="job.id"
            class="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group cursor-pointer"
            @click="$router.push(`/ofertas/${job.id}`)"
          >
            <div class="flex items-start justify-between mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl uppercase"
              >
                {{ job.company?.nombre_comercial?.[0] || "E" }}
              </div>
              <span
                class="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 capitalize"
              >
                {{ job.modalidad }}
              </span>
            </div>
            <h3
              class="text-lg font-bold text-gray-900 mb-1 line-clamp-2 min-h-[56px]"
              :title="job.titulo"
            >
              {{ job.titulo }}
            </h3>
            <p class="text-sm text-gray-500 mb-4 truncate">
              {{ job.company?.nombre_comercial || "Empresa Confidencial" }}
            </p>

            <div
              class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between"
            >
              <span class="text-sm font-medium text-gray-900 capitalize">{{
                job.tipo_contrato?.replace(/_/g, " ")
              }}</span>
              <span class="text-xs text-gray-400">Reciente</span>
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
          &copy; 2026 LEAD UNI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref, onMounted } from "vue";
import { listarOfertas } from "@/features/ofertas/services/ofertas.service";

const loading = ref(true);
const featuredJobs = ref([]);

const categories = [
  {
    name: "Prácticas",
    count: 85,
    color: "bg-blue-500",
    path: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25", // Book/Academic
  },
  {
    name: "Tiempo Completo",
    count: 120,
    color: "bg-purple-500",
    path: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", // Clock
  },
  {
    name: "Medio Tiempo",
    count: 64,
    color: "bg-green-500",
    path: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z", // Half moon
  },
  {
    name: "Freelance",
    count: 42,
    color: "bg-orange-500",
    path: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25", // Laptop
  },
];

onMounted(async () => {
  try {
    // Obtener las 3 ofertas más recientes
    const data = await listarOfertas({
      limit: 3,
      sort: "-createdAt",
    });

    // Mapear respuesta si viene paginada o directa
    const docs = data.docs || (Array.isArray(data) ? data : []);
    featuredJobs.value = docs.slice(0, 3);
  } catch (error) {
    console.error("Error cargando ofertas destacadas", error);
  } finally {
    loading.value = false;
  }
});
</script>
