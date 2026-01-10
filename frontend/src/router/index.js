import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './routes/home.routes'
import ofertasRoutes from './routes/ofertas.routes'
import perfilRoutes from './routes/perfil.routes'
import postulacionesRoutes from './routes/postulaciones.routes'
import authRoutes from './routes/auth.routes'
import capacitateRoutes from './routes/capacitate.routes'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      ...homeRoutes,
      ...ofertasRoutes,
      // perfilRoutes is now a top-level route
      ...postulacionesRoutes,
      ...capacitateRoutes
    ],
  },
  // Spreading perfilRoutes here to make it top-level
  ...perfilRoutes,
  ...authRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
