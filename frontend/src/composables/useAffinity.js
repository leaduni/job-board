/**
 * Composable para calcular afinidad entre skills del usuario y skills requeridas de una oferta.
 * Reutilizado en OfertasListView, JobCard y SkillGapBridge.
 */

/**
 * Parsea skills_requeridas de una oferta (string o array)
 * @param {string|string[]} raw - skills_requeridas del CMS
 * @returns {string[]} Lista de nombres de skills normalizados
 */
export function parseRequiredSkills(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((s) => (typeof s === "string" ? s : s?.name || s?.skill || ""))
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Calcula afinidad entre una oferta y las skills del usuario
 * @param {Object} oferta - Oferta con skills_requeridas
 * @param {Array<{id?: number, name: string}>} mySkills - Skills del usuario
 * @returns {{ matched: number, total: number, percent: number }}
 */
export function computeAffinity(oferta, mySkills = []) {
  const required = parseRequiredSkills(oferta?.skills_requeridas);
  if (required.length === 0) {
    return { matched: 0, total: 0, percent: 0 };
  }
  const myNames = new Set(mySkills.map((s) => (s.name || "").toLowerCase()));
  let matched = 0;
  for (const name of required) {
    if (myNames.has(name.toLowerCase())) matched++;
  }
  const percent = Math.round((matched / required.length) * 100);
  return { matched, total: required.length, percent };
}

/**
 * Filtra ofertas por afinidad mínima
 * @param {Object[]} ofertas
 * @param {Array} mySkills
 * @param {string} filter - '' | '1' | '2' | '3' | 'all'
 */
export function filterByAffinity(ofertas, mySkills, filter) {
  if (!filter || !mySkills?.length) return ofertas;
  return ofertas.filter((o) => {
    const { matched, total } = computeAffinity(o, mySkills);
    if (total === 0) return true;
    switch (filter) {
      case "1":
        return matched >= 1;
      case "2":
        return matched >= 2;
      case "3":
        return matched >= 3;
      case "all":
        return matched >= total;
      default:
        return true;
    }
  });
}

/**
 * Ordena ofertas por afinidad (mayor primero), luego por fecha
 */
export function sortByAffinity(ofertas, mySkills) {
  return [...ofertas].sort((a, b) => {
    const affA = computeAffinity(a, mySkills);
    const affB = computeAffinity(b, mySkills);
    if (affA.percent !== affB.percent) return affB.percent - affA.percent;
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });
}
