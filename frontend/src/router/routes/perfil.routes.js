export default [
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../../features/estudiantes/views/ProfileView.vue'),
  },
  {
    path: '/tailwind-test',
    name: 'tailwind-test',
    component: () => import('../../features/estudiantes/views/TailwindTest.vue'),
  }
]
