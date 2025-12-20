<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Mis postulaciones</h1>

    <p v-if="loading">Cargando postulaciones...</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>
    <p v-else-if="postulaciones.length === 0">
      Aún no te has postulado a ninguna oferta.
    </p>

    <ul v-else class="space-y-4">
      <li
        v-for="p in postulaciones"
        :key="p.id"
        class="border p-4 rounded"
      >
        <h2 class="font-semibold">
          {{ p.oferta?.titulo }}
        </h2>

        <p class="text-sm text-gray-600">
          {{ p.oferta?.company?.nombre_comercial }}
        </p>

        <p class="text-sm">
          Estado: <strong>{{ p.estado }}</strong>
        </p>

        <p class="text-xs text-gray-500">
          Postulado el {{ p.createdAt }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
//import { listarMisPostulaciones } from '../services/postulaciones.service';

const postulaciones = ref([]);
const loading = ref(true);
const error = ref(null);

/*
onMounted(async () => {
  try {
    postulaciones.value = await listarMisPostulaciones();
  } catch (e) {
    error.value = 'No se pudieron cargar tus postulaciones';
  } finally {
    loading.value = false;
  }
});
*/

</script>
