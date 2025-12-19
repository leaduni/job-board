export default [
  {
    path: 'ofertas',
    name: 'ofertas-list',
    component: () => import('@/features/ofertas/views/OfertasListView.vue'),
  },
  {
    path: 'ofertas/:id',
    name: 'ofertas-detail',
    component: () => import('@/features/ofertas/views/OfertaDetailView.vue'),
    props: true,
  },
]
