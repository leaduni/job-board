import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './routes/home.routes'
import ofertasRoutes from './routes/ofertas.routes'
import perfilRoutes from './routes/perfil.routes'
import postulacionesRoutes from './routes/postulaciones.routes'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      ...homeRoutes,
      ...ofertasRoutes,
      ...perfilRoutes,
      ...postulacionesRoutes
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
