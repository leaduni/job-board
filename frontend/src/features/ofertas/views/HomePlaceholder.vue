<template>
  <div class="min-h-screen bg-[rgb(9,9,42)] font-sans">
    <!-- Hero Section -->
    <header
      class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#1A0B2E] via-[#120a22] to-[#09092a]"
    >
      <!-- Elementos decorativos de fondo -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          class="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#a6249d] opacity-20 blur-[120px]"
        ></div>
        <div
          class="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#d93340] opacity-10 blur-[100px]"
        ></div>
      </div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6"
        >
          Encuentra el trabajo <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#ff6ec7]"
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
              class="w-5 h-5 text-gray-400 mr-3 shrink-0"
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
              v-model="searchTerm"
              type="text"
              placeholder="Cargo, empresa o palabra clave"
              class="w-full py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              @keyup.enter="buscarOfertas"
            />
          </div>
          <button
            type="button"
            class="bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            @click="buscarOfertas"
          >
            Buscar
          </button>
        </div>

        <div class="mt-8 flex justify-center gap-4 text-sm text-gray-400 flex-wrap">
          <span>Tendencias:</span>
          <button
            type="button"
            class="text-white hover:text-[#ff6ec7] transition-colors focus:outline-none"
            @click="buscarPorTendencia('Desarrollador')"
          >
            Desarrollador
          </button>
          <span class="text-gray-600">•</span>
          <button
            type="button"
            class="text-white hover:text-[#ff6ec7] transition-colors focus:outline-none"
            @click="buscarPorTendencia('Marketing')"
          >
            Marketing
          </button>
          <span class="text-gray-600">•</span>
          <button
            type="button"
            class="text-white hover:text-[#ff6ec7] transition-colors focus:outline-none"
            @click="buscarPorTendencia('Prácticas')"
          >
            Prácticas
          </button>
        </div>
      </div>
    </header>

    <!-- Categorias / Explora por contenido -->
    <section class="py-20 bg-[rgb(9,9,42)] border-b border-[#a6249d]/20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent"
          >
            Explora por Tipo de Contrato
          </h2>
          <p class="mt-2 text-lg leading-8 text-white/70">
            Encuentra la oportunidad que se adapta a tu disponibilidad.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-6">
          <button
            v-for="cat in categories"
            :key="cat.name"
            type="button"
            class="group relative w-full max-w-[280px] bg-[#1A0B2E]/90 backdrop-blur-lg p-8 rounded-2xl border border-[#a6249d]/30 hover:border-[#a6249d]/50 hover:shadow-lg hover:shadow-[#a6249d]/20 hover:-translate-y-1 shadow-lg transition-all duration-300 cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:ring-offset-2 focus:ring-offset-[rgb(9,9,42)]"
            @click="explorarPorContrato(cat)"
          >
            <div
              :class="`w-16 h-16 mx-auto mb-5 rounded-2xl ${cat.color} flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300`"
            >
              <component :is="cat.icon" class="w-8 h-8" />
            </div>
            <h3
              class="text-lg font-semibold text-white group-hover:text-[#ff6ec7] transition-colors"
            >
              {{ cat.name }}
            </h3>
            <p class="text-sm text-white/50 mt-1">Explorar</p>
          </button>
        </div>
      </div>
    </section>

    <!-- Ofertas Recientes -->
    <section class="py-20 bg-[rgb(9,9,42)] border-b border-[#a6249d]/20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2
              class="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent"
            >
              Ofertas Recientes
            </h2>
            <p class="mt-2 text-lg text-white/70">
              Las últimas oportunidades publicadas para ti.
            </p>
          </div>
          <router-link
            to="/ofertas"
            class="hidden md:inline-flex items-center text-[#a6249d] font-semibold hover:text-[#ff6ec7]"
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
            class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d93340]"
          ></div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7"
        >
          <JobCard
            v-for="job in featuredJobs"
            :key="job.id"
            :oferta="job"
            :require-auth="false"
          />
        </div>

        <div class="mt-10 text-center md:hidden">
          <router-link
            to="/ofertas"
            class="inline-flex items-center text-[#a6249d] font-semibold hover:text-[#ff6ec7]"
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
      class="relative isolate overflow-hidden bg-[#1A0B2E] py-8 sm:py-10 lg:py-12"
    >
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="flex flex-col items-center text-center gap-6 lg:flex-row lg:gap-8 lg:items-center lg:justify-center">
          <div class="flex flex-col items-center gap-4 max-w-lg lg:flex-1">
            <h2
              class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              ¿Listo para impulsar tu carrera?
            </h2>
            <p class="text-lg leading-8 text-gray-300">
              Crea tu perfil profesional, sube tu CV y deja que las empresas te
              encuentren. Es completamente gratis para estudiantes y egresados.
            </p>
            <router-link
              to="/auth/register/estudiante"
              class="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d93340] to-[#a6249d] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#a6249d]/40 hover:from-[#a6249d] hover:to-[#d93340] hover:shadow-[#a6249d]/50 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a6249d] transition-all duration-300"
            >
              Comenzar ahora
            </router-link>
          </div>
          <div class="flex justify-center flex-shrink-0 lg:flex-1">
            <img
              src="/capybara-carrera.png"
              alt="Impulsa tu carrera con LeadUNI"
              class="max-w-[200px] sm:max-w-[240px] lg:max-w-sm xl:max-w-md"
            />
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

    <!-- Footer (estilo LEAD-webpage) -->
    <footer class="w-full flex flex-col items-center justify-center py-10 bg-[#1A0B2E] shadow-[0_-4px_30px_rgba(147,51,234,0.2)] backdrop-blur-md border-t border-[#7957f1]/40 z-20 relative">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-[#e53664] via-[#c431a4] to-[#842bff] bg-clip-text text-transparent">
        Contáctanos
      </h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mb-6">
        <a href="https://www.instagram.com/lead_uni/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-11 h-11 rounded-full border-2 border-white/20 bg-white/5 text-white hover:border-[#a6249d]/60 hover:bg-[#a6249d]/20 hover:scale-110 transition-all duration-300" title="Instagram">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/lead-uni/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-11 h-11 rounded-full border-2 border-white/20 bg-white/5 text-white hover:border-[#a6249d]/60 hover:bg-[#a6249d]/20 hover:scale-110 transition-all duration-300" title="LinkedIn">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="mailto:leadatuni1403@gmail.com" class="flex items-center justify-center w-11 h-11 rounded-full border-2 border-white/20 bg-white/5 text-white hover:border-[#a6249d]/60 hover:bg-[#a6249d]/20 hover:scale-110 transition-all duration-300" title="Correo">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </a>
        <a href="https://github.com/leaduni" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-11 h-11 rounded-full border-2 border-white/20 bg-white/5 text-white hover:border-[#a6249d]/60 hover:bg-[#a6249d]/20 hover:scale-110 transition-all duration-300" title="GitHub">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
      <div class="px-6 py-3 rounded-2xl bg-[#25123A] border border-[#8A4F79]/50 text-[#f3eafd] text-sm font-semibold">
        &copy; {{ new Date().getFullYear() }} LEAD | UNI <span class="text-[#8A2BE2]">💜</span> Todos los derechos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from "vue";
import { useRouter } from "vue-router";
import { listarOfertas } from "@/features/ofertas/services/ofertas.service";
import JobCard from "@/features/ofertas/components/JobCard.vue";

const router = useRouter();
const loading = ref(true);
const featuredJobs = ref([]);
const searchTerm = ref("");

function buscarOfertas() {
  const term = searchTerm.value?.trim() || "";
  router.push({
    path: "/ofertas",
    query: term ? { search: term } : {},
  });
}

function buscarPorTendencia(tendencia) {
  searchTerm.value = tendencia;
  buscarOfertas();
}

function explorarPorContrato(cat) {
  router.push({
    path: "/ofertas",
    query: { tipo_contrato: cat.value },
  });
}

// Iconos distintivos por tipo de contrato (estilo único para bolsa laboral)
// Prácticas: birrete + documento (estudiante/prácticante)
const IconPracticas = {
  render: () => h("svg", { class: "w-full h-full", viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, [
    h("path", { d: "M24 8l14 7v6l-14 7-14-7v-6l14-7z", stroke: "currentColor", "stroke-width": "2", "stroke-linejoin": "round" }),
    h("path", { d: "M10 21l14 7 14-7", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }),
    h("path", { d: "M14 38V26l10 5 10-5v12", stroke: "currentColor", "stroke-width": "2", "stroke-linejoin": "round" }),
  ]),
};
// Tiempo Completo: maletín profesional
const IconTiempoCompleto = {
  render: () => h("svg", { class: "w-full h-full", viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, [
    h("rect", { x: "8", y: "14", width: "32", height: "22", rx: "2", stroke: "currentColor", "stroke-width": "2" }),
    h("path", { d: "M16 14V10a4 4 0 014-4h8a4 4 0 014 4v4", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }),
    h("path", { d: "M8 26h32", stroke: "currentColor", "stroke-width": "2" }),
    h("path", { d: "M24 30v4l2 2", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  ]),
};
const IconMedioTiempo = {
  render: () => h("svg", { class: "w-full h-full", viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, [
    h("circle", { cx: "24", cy: "24", r: "16", stroke: "currentColor", "stroke-width": "2" }),
    h("path", { d: "M24 14v10l6 4", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
    h("path", { d: "M24 24H14", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }),
  ]),
};
const IconFreelance = {
  render: () => h("svg", { class: "w-full h-full", viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, [
    h("rect", { x: "6", y: "18", width: "36", height: "22", rx: "2", stroke: "currentColor", "stroke-width": "2" }),
    h("path", { d: "M6 30h36", stroke: "currentColor", "stroke-width": "2" }),
    h("path", { d: "M16 40v2a1 1 0 001 1h14a1 1 0 001-1v-2", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }),
    h("path", { d: "M14 18v-4a4 4 0 014-4h12a4 4 0 014 4v4", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }),
    h("circle", { cx: "34", cy: "12", r: "2", fill: "currentColor", opacity: "0.6" }),
  ]),
};

const categories = [
  {
    name: "Prácticas",
    value: "practicas_pre,practicas_pro",
    color: "bg-blue-500",
    icon: IconPracticas,
  },
  {
    name: "Tiempo Completo",
    value: "tiempo_completo",
    color: "bg-purple-500",
    icon: IconTiempoCompleto,
  },
  {
    name: "Medio Tiempo",
    value: "medio_tiempo",
    color: "bg-emerald-500",
    icon: IconMedioTiempo,
  },
  {
    name: "Freelance",
    value: "freelance",
    color: "bg-amber-500",
    icon: IconFreelance,
  },
];

onMounted(async () => {
  try {
    // Obtener las 3 ofertas más recientes (depth 2 para company + logo)
    const data = await listarOfertas({
      limit: 3,
      sort: "-createdAt",
      depth: 2,
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
