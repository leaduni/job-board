import axios from 'axios'

export const coreApi = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
