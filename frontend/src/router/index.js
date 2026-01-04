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
      // perfilRoutes is now a top-level route
      ...postulacionesRoutes
    ],
  },
  // Spreading perfilRoutes here to make it top-level
  ...perfilRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
