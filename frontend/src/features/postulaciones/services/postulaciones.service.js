import axios from 'axios';

const API_URL = 'https://api-leaduni.up.railway.app/api';

export async function postularOferta(oferta) {
  const payload = {
    oferta_id: oferta.id,
    oferta_titulo: oferta.titulo,
    oferta_slug: oferta.slug || oferta.titulo.toLowerCase().replace(/\s+/g, '-'),

    // IMPORTANTE: valores compatibles con el seed
    empresa_id: 1, // LogisticPeru
    empresa_nombre: oferta.company?.nombre_comercial || 'Empresa',

    perfil_id: 1, // perfil existente en seed
    user_email: 'juan.perez@uni.edu.pe', // EXISTE en DB

    estado: 'enviada',
  };

  const { data } = await axios.post(
    `${API_URL}/postulaciones`,
    payload
  );

  return data;
}
