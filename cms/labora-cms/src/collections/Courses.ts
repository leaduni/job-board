import { CollectionConfig } from 'payload';

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'proveedor', 'esGratuito', 'nivel'],
  },
  access: {
    read: () => true, // Público
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título del curso',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
      label: 'Descripción',
    },
    {
      name: 'proveedor',
      type: 'text',
      required: true,
      label: 'Proveedor',
      admin: {
        placeholder: 'UNI - OTI, Coursera, Google, etc.',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL del curso',
    },
    {
      name: 'esGratuito',
      type: 'checkbox',
      label: '¿Es gratuito?',
      defaultValue: false,
    },
    {
      name: 'nivel',
      type: 'select',
      required: true,
      options: [
        { label: 'Básico', value: 'basico' },
        { label: 'Intermedio', value: 'intermedio' },
        { label: 'Avanzado', value: 'avanzado' },
      ],
    },
    {
      name: 'duracionHoras',
      type: 'number',
      label: 'Duración (horas)',
      min: 0,
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media', // Necesitas crear collection "Media"
      label: 'Imagen del curso',
    },

    {
      name: 'destacado',
      type: 'checkbox',
      label: '¿Destacar en homepage?',
      defaultValue: false,
    },
  ],
};