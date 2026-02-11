import { cmsApi } from '@/services/cmsApi';

export async function listarOfertas(params = {}) {
  try {
    const data = await cmsApi.getProjects(params);
    // Devolvemos toda la data para usar paginación
    return data;
  } catch (error) {
    console.error('Error al listar ofertas:', error);
    return { docs: [], totalDocs: 0, limit: 10, totalPages: 1, page: 1 };
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