const authRoutes = [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/features/auth/views/LoginView.vue'),
  },
  {
    path: '/auth/register/estudiante',
    name: 'register-estudiante',
    component: () => import('@/features/auth/views/RegisterEstudianteView.vue'),
  },
  {
    path: '/auth/register/empresa',
    name: 'register-empresa',
    component: () => import('@/features/auth/views/RegisterEmpresaView.vue'),
  },
];

export default authRoutes;
