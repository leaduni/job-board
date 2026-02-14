<template>
  <aside class="w-full lg:w-72 h-full lg:h-auto overflow-y-auto lg:overflow-visible bg-[#121225] border-2 border-[#a6249d] rounded-none lg:rounded-2xl p-4 sm:p-6 shadow-lg">
    <div class="flex items-center justify-between mb-5 sticky top-0 bg-[#121225] pt-2 pb-2 -mt-2 z-10 lg:static">
      <h2 class="text-white font-bold text-base sm:text-lg flex items-center gap-2">
        <svg class="w-5 h-5 text-[#d93340] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
      </h2>
      <div class="flex items-center gap-2">
        <button @click="clearAll" type="button" class="text-sm text-[#d93340] underline hover:no-underline focus:outline-none">Limpiar todo</button>
        <button
          v-if="showClose"
          type="button"
          @click="$emit('close')"
          class="lg:hidden p-2 -m-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Cerrar filtros"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Proveedor / Plataforma (selector) -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">PROVEEDOR</h3>
      <div class="relative">
        <select
          v-model="proveedor"
          class="w-full appearance-none bg-[#0a0a14] text-white border-2 border-[#a6249d] rounded-lg px-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 text-sm"
        >
          <option value="" class="bg-[#0a0a14] text-white">Todos los proveedores</option>
          <option v-for="p in proveedores" :key="p" :value="p" class="bg-[#0a0a14] text-white">{{ p }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Nivel del curso -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">NIVEL</h3>
      <ul class="space-y-2">
        <li v-for="item in niveles" :key="item.value" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" :value="item.value" v-model="selectedNiveles"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#a6249d] checked:bg-[#a6249d] focus:outline-none focus:ring-2 focus:ring-[#a6249d]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-sm">{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </section>

    <!-- Duración -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">DURACIÓN</h3>
      <ul class="space-y-2">
        <li v-for="item in duraciones" :key="item.value" class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="radio" :value="item.value" v-model="selectedDuracion"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-full checked:accent-[#a6249d] focus:outline-none focus:ring-2 focus:ring-[#a6249d]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-sm">{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </section>

    <!-- Tipo de inversión -->
    <section class="py-4 border-b border-gray-800">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">INVERSIÓN</h3>
      <ul class="space-y-2">
        <li class="flex items-center justify-between gap-x-4">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" v-model="soloGratis"
              class="appearance-none w-5 h-5 bg-gray-700/50 rounded-md checked:accent-[#a6249d] checked:bg-[#a6249d] focus:outline-none focus:ring-2 focus:ring-[#a6249d]" />
            <span class="text-gray-300 group-hover:text-white transition-colors text-sm">Solo gratuitos</span>
          </label>
        </li>
      </ul>
    </section>

    <!-- Ordenar -->
    <section class="py-4">
      <h3 class="text-white font-bold text-sm tracking-wider mb-3 font-['League_Spartan',_sans-serif]">ORDENAR POR</h3>
      <select v-model="sort" class="w-full appearance-none bg-[#0a0a14] text-white border-2 border-[#a6249d] rounded-lg px-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 text-sm">
        <option value="-createdAt" class="bg-[#0a0a14] text-white">Más recientes</option>
        <option value="createdAt" class="bg-[#0a0a14] text-white">Más antiguos</option>
        <option value="titulo" class="bg-[#0a0a14] text-white">Título A → Z</option>
        <option value="-titulo" class="bg-[#0a0a14] text-white">Título Z → A</option>
        <option value="duracionHoras" class="bg-[#0a0a14] text-white">Duración: menor a mayor</option>
        <option value="-duracionHoras" class="bg-[#0a0a14] text-white">Duración: mayor a menor</option>
      </select>
    </section>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { cmsApi } from '@/services/cmsApi'

const props = defineProps({
  initialFilters: { type: Object, default: () => ({}) },
  showClose: { type: Boolean, default: false },
})

const proveedores = ref([])

const emit = defineEmits(['filter-change', 'close'])

const niveles = [
  { label: 'Básico', value: 'basico' },
  { label: 'Intermedio', value: 'intermedio' },
  { label: 'Avanzado', value: 'avanzado' },
]

const duraciones = [
  { label: 'Cualquiera', value: '' },
  { label: 'Corto (menos de 5h)', value: '0-5' },
  { label: 'Medio (5-20h)', value: '5-20' },
  { label: 'Largo (20-50h)', value: '20-50' },
  { label: 'Extenso (+50h)', value: '50+' },
]

const proveedor = ref('')
const selectedNiveles = ref([])
const selectedDuracion = ref('')
const soloGratis = ref(false)
const sort = ref('-createdAt')

async function cargarProveedores() {
  try {
    const data = await cmsApi.getProveedores()
    if (Array.isArray(data) && data.length > 0) {
      proveedores.value = data
      return
    }
  } catch (e) {
    console.warn('getProveedores no disponible, usando fallback:', e?.message)
  }
  // Fallback: extraer proveedores desde la API de cursos (paginando para cubrir todos)
  try {
    const set = new Set()
    let page = 1
    let hasMore = true
    while (hasMore) {
      const res = await cmsApi.getCourses({ limit: 500, page })
      const docs = res?.docs || []
      docs.forEach((c) => {
        if (c?.proveedor) set.add(c.proveedor)
      })
      hasMore = res?.hasNextPage === true
      page += 1
      if (page > 20) break
    }
    proveedores.value = [...set].sort((a, b) => String(a).localeCompare(String(b)))
  } catch (e) {
    console.error('Error cargando proveedores:', e)
  }
}

onMounted(async () => {
  const init = props.initialFilters
  if (init.proveedor) proveedor.value = init.proveedor
  if (init.niveles?.length) selectedNiveles.value = [...init.niveles]
  if (init.duracion) selectedDuracion.value = init.duracion
  if (init.soloGratis) soloGratis.value = init.soloGratis
  if (init.sort) sort.value = init.sort
  await cargarProveedores()
})

const filtersOutput = computed(() => ({
  proveedor: proveedor.value,
  niveles: selectedNiveles.value,
  duracion: selectedDuracion.value,
  soloGratis: soloGratis.value,
  sort: sort.value,
}))

watch([proveedor, selectedNiveles, selectedDuracion, soloGratis, sort], () => {
  emit('filter-change', filtersOutput.value)
}, { deep: true })

function clearAll() {
  proveedor.value = ''
  selectedNiveles.value = []
  selectedDuracion.value = ''
  soloGratis.value = false
  sort.value = '-createdAt'
  emit('filter-change', filtersOutput.value)
}
</script>
