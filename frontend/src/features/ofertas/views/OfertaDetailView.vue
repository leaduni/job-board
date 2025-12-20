<template>
  <div class="p-6" v-if="oferta">
    <h1 class="text-2xl font-bold mb-2">
      {{ oferta.titulo }}
    </h1>

    <p class="text-gray-600 mb-4">
      {{ oferta.company?.nombre_comercial }}
    </p>

    <p class="mb-2">
      <strong>Modalidad:</strong> {{ oferta.modalidad }}
    </p>

    <p class="mb-2">
      <strong>Nivel:</strong> {{ oferta.nivel_experiencia }}
    </p>

    <p class="mb-4">
      <strong>Estado:</strong> {{ oferta.estado }}
    </p>

    <hr class="my-4" />

    <h2 class="font-semibold mb-2">Descripción</h2>

    <hr class="my-6" />

    <div>
    
    <button
    @click="postular"
    :disabled="postulando || yaPostulado"
    >
    {{ yaPostulado ? 'Ya postulado' : postulando ? 'Postulando...' : 'Postular a esta oferta' }}
    </button>

    <p v-if="mensaje">{{ mensaje }}</p>

    </div>


    <pre class="text-sm whitespace-pre-wrap">
{{ descripcionTexto }}
    </pre>
  </div>

  <p v-else class="p-6">Cargando oferta...</p>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { obtenerOfertaPorId } from '../services/ofertas.service';
import { postularOferta } from '../../postulaciones/services/postulaciones.service';

const route = useRoute();
const oferta = ref(null);
const descripcionTexto = ref('');

const yaPostulado = ref(false);
const postulando = ref(false);
const mensaje = ref('');

onMounted(async () => {
  const id = route.params.id;
  const data = await obtenerOfertaPorId(id);

  oferta.value = data;

  // Extraer texto del editor del CMS (Payload)
  descripcionTexto.value =
    data?.descripcion?.root?.children?.[0]?.children?.[0]?.text || '';

  yaPostulado.value = await verificarPostulacion(id);
});

async function postular() {
  try {
    postulando.value = true;
    mensaje.value = '';

    await postularOferta(oferta.value);

    yaPostulado.value = true;
    mensaje.value = 'Postulación enviada correctamente';
  } catch (error) {
    console.error(error);
    mensaje.value = 'Error al postular. Intenta nuevamente';
  } finally {
    postulando.value = false;
  }
}

</script>
