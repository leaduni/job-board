const authRoutes = [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/features/auth/views/LoginView.vue'),
  },
  {
    path: '/auth/login-empresa',
    name: 'login-empresa',
    component: () => import('@/features/auth/views/LoginEmpresaView.vue'),
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
  {
    path: '/auth/forgot-password',
    name: 'forgot-password',
    component: () => import('@/features/auth/views/ForgotPasswordView.vue'),
  },
  {
    path: '/auth/reset-password',
    name: 'reset-password',
    component: () => import('@/features/auth/views/ResetPasswordView.vue'),
  },
];

export default authRoutes;
