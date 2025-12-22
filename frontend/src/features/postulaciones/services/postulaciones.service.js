import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const API_URL = 'https://api-leaduni.up.railway.app/api'

export async function postularOferta(oferta) {
  const { user, isAuthenticated } = useAuth()

  // Validaciones defensivas
  if (!isAuthenticated.value || !user.value) {
    throw new Error('Usuario no autenticado')
  }

  if (!oferta || !oferta.id) {
    throw new Error('Oferta inválida')
  }

  if (!oferta.company || !oferta.company.id) {
    throw new Error('Empresa inválida en la oferta')
  }

  // Mapeo CMS → Backend
  const payload = {
    oferta_id: oferta.id,            // CMS: oferta.id
    empresa_id: oferta.company.id,   // CMS: oferta.company.id
    perfil_id: user.value.id,        // UUID del login simulado
    estado: 'enviada',
  }

  const { data } = await axios.post(
    `${API_URL}/postulaciones`,
    payload
  )

  return data
}
