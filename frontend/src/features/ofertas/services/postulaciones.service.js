//'https://api-leaduni.up.railway.app/api/postulaciones'

import { coreApi } from '@/services/coreApi';

export async function postularOferta(ofertaId) {
  const { data } = await coreApi.post('/postulaciones', {
    projectId: ofertaId,
  });
  return data;
}

export async function verificarPostulacion(ofertaId) {
  const { data } = await coreApi.get(`/postulaciones/exists/${ofertaId}`);
  return data.existe;
}
