import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'nombre',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            required: true,
            label: 'Nombre del proyecto',
            admin: {
                placeholder: 'Bolsa Laboral',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug',
            admin: {
                placeholder: 'bolsa-laboral',
            },
        },
        {
            name: 'dominio',
            type: 'text',
            label: 'Dominio',
            admin: {
                placeholder: 'bolsa.leaduni.page',
            },
        },
        {
            name: 'activo',
            type: 'checkbox',
            label: '¿Está activo?',
            defaultValue: true,
        },
        {
            name: 'skills',
            type: 'array',
            label: 'Skills asociados al proyecto',
            fields: [
                {
                    name: 'skill',
                    type: 'text',
                    label: 'Skill',
                    required: true,
                    admin: {
                        placeholder: 'JavaScript, Comunicación, Liderazgo, etc.',
                    },
                },
            ],

        }
    ],
};