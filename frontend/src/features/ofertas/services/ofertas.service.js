import { cmsApi } from '@/services/cmsApi';

export async function listarOfertas() {
  try {
    const data = await cmsApi.getProjects();
    console.log('DATA CMS:', data);
    return data.docs || [];
  } catch (error) {
    console.error('Error al listar ofertas:', error);
    return [];
  }
}

export async function obtenerOfertaPorId(id) {
  try {
    const data = await cmsApi.getProjectById(id);
    return data;
  } catch (error) {
    console.error('Error al obtener oferta:', error);
    return null;
  }
}