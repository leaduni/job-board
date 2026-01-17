<script setup>
import PostulacionItem from './PostulacionItem.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  ofertasMap: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <section>
    <!-- Estado vacío -->
    <div v-if="!items || items.length === 0" class="rounded-lg bg-white/5 p-5">
      <h3 class="mb-1 text-base font-semibold">No hay postulaciones</h3>
      <p class="m-0 text-sm opacity-80">
        No encontramos postulaciones para el filtro seleccionado.
      </p>
    </div>

    <!-- Listado -->
    <div v-else class="flex flex-col gap-4">
        <PostulacionItem
            v-for="p in items"
            :key="p.id"
            :postulacion="p"
            :oferta="ofertasMap[p.oferta_id]"
        />
    </div>
  </section>
</template>
