import axios from 'axios'

export const coreApi = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para inyectar el token JWT automáticamente
coreApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

