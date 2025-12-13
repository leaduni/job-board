// apps/cms/src/collections/Companies.ts
import { CollectionConfig } from 'payload';

export const Companies: CollectionConfig = {
    slug: 'companies',
    admin: {
        useAsTitle: 'nombre_comercial',
        defaultColumns: ['nombre_comercial', 'sector', 'tiene_convenio', 'activo'],
        description: 'Empresas que publican ofertas laborales',
    },
    access: {
        read: () => true, // Público
        create: ({ req: { user } }) => !!user, // Solo admins
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'nombre_comercial',
            type: 'text',
            required: true,
            label: 'Nombre comercial',
            admin: {
                placeholder: 'Ej: TechCorp Perú',
            },
        },
        {
            name: 'razon_social',
            type: 'text',
            label: 'Razón social',
            admin: {
                placeholder: 'Ej: TechCorp S.A.C.',
            },
        },
        {
            name: 'ruc',
            type: 'text',
            label: 'RUC',
            unique: true,
            admin: {
                placeholder: '20123456789',
            },
        },
        {
            name: 'sector',
            type: 'select',
            required: true,
            options: [
                { label: 'Tecnología', value: 'tecnologia' },
                { label: 'Construcción', value: 'construccion' },
                { label: 'Manufactura', value: 'manufactura' },
                { label: 'Servicios', value: 'servicios' },
                { label: 'Educación', value: 'educacion' },
                { label: 'Salud', value: 'salud' },
                { label: 'Retail', value: 'retail' },
                { label: 'Finanzas', value: 'finanzas' },
                { label: 'Consultoría', value: 'consultoria' },
                { label: 'Otro', value: 'otro' },
            ],
        },
        {
            name: 'descripcion',
            type: 'textarea',
            label: 'Descripción de la empresa',
            admin: {
                placeholder: 'Breve descripción de la empresa, su misión y actividades principales',
            },
        },
        {
            name: 'sitio_web',
            type: 'text',
            label: 'Sitio web',
            admin: {
                placeholder: 'https://www.empresa.com',
            },
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            label: 'Logo de la empresa',
            admin: {
                description: 'Logo que aparecerá en las ofertas',
            },
        },
        {
            name: 'tiene_convenio',
            type: 'checkbox',
            label: '¿Tiene convenio con LeadUNI/UNI?',
            defaultValue: false,
            admin: {
                description: 'Las empresas con convenio aparecen destacadas',
            },
        },
        {
            name: 'email_contacto',
            type: 'email',
            required: true,
            label: 'Email de contacto principal',
            admin: {
                description: 'Email principal para recibir postulaciones',
            },
        },
        {
            name: 'telefono_contacto',
            type: 'text',
            label: 'Teléfono de contacto',
            admin: {
                placeholder: '+51 999 999 999',
            },
        },
        {
            name: 'persona_contacto',
            type: 'text',
            label: 'Persona de contacto',
            admin: {
                placeholder: 'Nombre del encargado de RRHH',
            },
        },
        {
            name: 'direccion',
            type: 'text',
            label: 'Dirección',
            admin: {
                placeholder: 'Av. Principal 123, San Isidro',
            },
        },
        {
            name: 'activo',
            type: 'checkbox',
            defaultValue: true,
            label: '¿Empresa activa?',
            admin: {
                description: 'Desactivar si ya no publica ofertas',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (URL amigable)',
            admin: {
                description: 'Se genera automáticamente del nombre',
                readOnly: true,
            },
            hooks: {
                beforeValidate: [
                    ({ data, operation }) => {
                        if ((operation === 'create' || !data?.slug) && data?.nombre_comercial) {
                            return data.nombre_comercial
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '') // Quitar tildes
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)/g, '');
                        }
                        return data?.slug;
                    },
                ],
            },
        },
    ],
};