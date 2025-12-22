import { ref, computed } from 'vue'
import { coreApi } from '@/services/coreApi'

// claves de persistencia
const STORAGE_KEY = 'jobboard_auth_user'

// estado reactivo (singleton)
const user = ref(null)

// derivados
const isAuthenticated = computed(() => !!user.value)

/**
 * Inicializa el estado leyendo localStorage
 * Se debe llamar una sola vez (ej. en App.vue)
 */
function initAuth() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      user.value = JSON.parse(stored)
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY)
      user.value = null
    }
  }
}

/**
 * Login simulado:
 * - obtiene perfiles
 * - busca por email
 * - si existe, "loguea"
 */
async function loginSimulado(email) {
  if (!email) {
    throw new Error('Email requerido')
  }

  const response = await coreApi.get('/api/perfiles')
  const perfiles = response.data

  const perfil = perfiles.find(
    (p) => p.user_email.toLowerCase() === email.toLowerCase()
  )

  if (!perfil) {
    throw new Error('No existe un perfil asociado a este email')
  }

  user.value = perfil
  localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil))

  return perfil
}

/**
 * Logout (simulado)
 */
function logout() {
  user.value = null
  localStorage.removeItem(STORAGE_KEY)
}

export function useAuth() {
  return {
    // estado
    user,
    isAuthenticated,

    // acciones
    initAuth,
    loginSimulado,
    logout,
  }
}
