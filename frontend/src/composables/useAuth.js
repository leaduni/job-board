import { ref, computed } from 'vue'
import { coreApi } from '@/services/coreApi'
import { useRouter } from 'vue-router'

// Claves de localStorage
const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'

// Estado reactivo global (Singleton)
const user = ref(null)
const token = ref(null)

// Computed
const isAuthenticated = computed(() => !!token.value && !!user.value)

export function useAuth() {
  const router = useRouter() // Nota: puede ser undefined fuera de componentes

  /**
   * Inicializa el estado de autenticación al cargar la app
   */
  function initAuth() {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_KEY)

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (e) {
        logout()
      }
    }
  }

  /**
   * Inicia sesión con credenciales reales
   */
  async function login({ email, password }) {
    try {
      const response = await coreApi.post('/api/auth/login', { email, password })
      
      const { user: userData, token: tokenData } = response.data
      
      // Actualizar estado
      user.value = userData
      token.value = tokenData
      
      // Persistir
      localStorage.setItem(TOKEN_KEY, tokenData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      
      return userData
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Credenciales inválidas')
    }
  }

  /**
   * Registra un nuevo usuario
   */
  async function register(payload) {
    try {
      // payload: { email, password, nombres, apellidos, telefono, ... }
      const response = await coreApi.post('/api/auth/register', payload)
      
      const { user: userData, token: tokenData } = response.data
      
      // Auto-login tras registro exitoso
      user.value = userData
      token.value = tokenData
      
      localStorage.setItem(TOKEN_KEY, tokenData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      
      return userData
    } catch (error) {
      console.error('Error en registro:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'No se pudo completar el registro')
    }
  }

  /**
   * Registra una nueva empresa (usuario + registro en CMS)
   */
  async function registerEmpresa(payload) {
    try {
      const response = await coreApi.post('/api/auth/register-empresa', payload)
      const { user: userData, token: tokenData } = response.data
      user.value = userData
      token.value = tokenData
      localStorage.setItem(TOKEN_KEY, tokenData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      return userData
    } catch (error) {
      console.error('Error en registro empresa:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'No se pudo completar el registro')
    }
  }

  /**
   * Cierra la sesión
   */
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    
    // Redirigir a login si es posible (si se llama desde componente)
    // O dejar que la UI reaccione al cambio de estado
    window.location.href = '/auth/login'
  }

  return {
    user,
    token,
    isAuthenticated,
    initAuth,
    login,
    register,
    registerEmpresa,
    logout
  }
}
