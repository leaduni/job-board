<template>
  <aside class="filters-aside">
    <div class="filters-header">
      <h2 class="filters-title">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
      </h2>
      <button class="link-clear">Limpiar todo</button>
    </div>

    <section class="filters-section">
      <h3 class="section-title">Modalidad</h3>
      <ul class="list">
        <li v-for="(c, i) in categorias" :key="i" class="list-item">
          <label class="checkwrap">
            <input type="checkbox" checked />
            <span class="custom-check" aria-hidden="true"></span>
            <span class="label-text">{{ c }}</span>
          </label>
          <span class="count">12</span>
        </li>
      </ul>
    </section>

    <section class="filters-section">
      <h3 class="section-title">Nivel de Experiencia</h3>
      <ul class="list">
        <li v-for="(u, i) in ubicaciones" :key="i" class="list-item">
          <label class="checkwrap">
            <input type="checkbox" checked />
            <span class="custom-check" aria-hidden="true"></span>
            <span class="label-text">{{ u }}</span>
          </label>
          <span class="count">8</span>
        </li>
      </ul>
    </section>

    <section class="filters-section">
      <h3 class="section-title">Tipo de Jornada</h3>
      <ul class="list">
        <li v-for="(t, i) in tiposContrato" :key="i" class="list-item">
          <label class="checkwrap">
            <input type="checkbox" checked />
            <span class="custom-check" aria-hidden="true"></span>
            <span class="label-text">{{ t }}</span>
          </label>
        </li>
      </ul>
    </section>

    <div class="cta-box">
      <h4>¡Sube tu CV!</h4>
      <p>Las empresas buscan perfiles como el tuyo.</p>
      <button class="cta-btn">Actualizar Perfil</button>
    </div>
  </aside>
</template>

<script setup>
const categorias = [
  'Tecnología',
  'Diseño',
  'Marketing',
  'Ventas'
]

const ubicaciones = [
  'Lima',
  'Remoto',
  'Arequipa',
  'Trujillo'
]

const tiposContrato = [
  'Tiempo completo',
  'Medio tiempo',
  'Prácticas',
  'Freelance'
]
</script>