import { coreApi } from "@/services/coreApi";

/**
 * Buscar skills por nombre
 * GET /api/skills/search?q=...&limit=...
 */
export async function searchSkills(query, limit = 10) {
  const { data } = await coreApi.get("/api/skills/search", {
    params: { q: query, limit },
  });
  return data.items || [];
}

/**
 * Obtener las skills del candidato autenticado
 * GET /api/me/candidate/skills
 */
export async function getMySkills() {
  const { data } = await coreApi.get("/api/me/candidate/skills");
  return data.items || [];
}

/**
 * Obtener skills de un candidato por ID
 * GET /api/candidates/:candidateId/skills
 */
export async function getCandidateSkills(candidateId) {
  const { data } = await coreApi.get(`/api/candidates/${candidateId}/skills`);
  return data.items || [];
}

/**
 * Adjuntar skills al candidato autenticado
 * POST /api/me/candidate/skills
 */
export async function attachSkills({ skillIds = [], skillNames = [] } = {}) {
  const { data } = await coreApi.post("/api/me/candidate/skills", {
    skillIds,
    skillNames,
  });
  return data;
}

/**
 * Quitar una skill del candidato autenticado
 * DELETE /api/me/candidate/skills/:skillId
 */
export async function removeSkill(skillId) {
  const { data } = await coreApi.delete(`/api/me/candidate/skills/${skillId}`);
  return data;
}
