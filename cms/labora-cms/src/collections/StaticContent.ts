// apps/cms/src/collections/ContenidoEstatico.ts
import { CollectionConfig } from 'payload';

export const StaticContent: CollectionConfig = {
    slug: 'static-content',
    admin: {
        useAsTitle: 'titulo',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'titulo',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'sobre-nosotros, faqs, como-postular',
            },
        },
        {
            name: 'contenido',
            type: 'richText',
            required: true,
        },
        {
            name: 'tipo',
            type: 'select',
            required: true,
            options: [
                { label: 'Página', value: 'pagina' },
                { label: 'FAQ', value: 'faq' },
                { label: 'Noticia', value: 'noticia' },
            ],
        },
        {
            name: 'proyecto',
            type: 'relationship',
            relationTo: 'projects',
            required: true,
        },
    ],
};