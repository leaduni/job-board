import { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'titulo',
        defaultColumns: ['titulo', 'company', 'modalidad', 'estado', 'fecha_cierre'],
        description: 'Ofertas laborales publicadas',
    },
    access: {
        read: () => true, // Público para estudiantes
        create: ({ req: { user } }) => !!user, // Solo admins
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        // ============================================
        // SECCIÓN: INFORMACIÓN BÁSICA
        // ============================================
        {
            name: 'titulo',
            type: 'text',
            required: true,
            label: 'Título del puesto',
            admin: {
                placeholder: 'Ej: Practicante de Desarrollo Backend',
            },
        },
        {
            name: 'company',
            type: 'relationship',
            relationTo: 'companies',
            required: true,
            label: 'Empresa',
            admin: {
                description: 'Selecciona la empresa que publica esta oferta',
            },
        },
        {
            name: 'descripcion',
            type: 'richText',
            required: true,
            label: 'Descripción del puesto',
            admin: {
                description: 'Describe las funciones y responsabilidades principales',
            },
        },

        // ============================================
        // SECCIÓN: REQUISITOS
        // ============================================
        {
            name: 'requisitos',
            type: 'richText',
            required: true,
            label: 'Requisitos',
            admin: {
                description: 'Requisitos académicos y técnicos necesarios',
            },
        },
        {
            name: 'skills_requeridas',
            type: 'textarea',
            label: 'Skills requeridas (separadas por comas)',
            admin: {
                placeholder: 'Python, SQL, React, Excel, Git',
                description: 'Para sugerir cursos CAPACÍTATE relacionados',
            },
        },
        {
            name: 'nivel_experiencia',
            type: 'select',
            required: true,
            defaultValue: 'sin_experiencia',
            options: [
                { label: 'Sin experiencia', value: 'sin_experiencia' },
                { label: 'Menos de 1 año', value: 'menos_1_anio' },
                { label: '1-3 años', value: '1_3_anios' },
                { label: 'Más de 3 años', value: 'mas_3_anios' },
            ],
        },
        {
            name: 'carreras_afines',
            type: 'textarea',
            label: 'Carreras afines (separadas por comas)',
            admin: {
                placeholder: 'Ingeniería de Sistemas, Ingeniería Industrial, Ingeniería Mecánica',
            },
        },

        // ============================================
        // SECCIÓN: MODALIDAD Y UBICACIÓN
        // ============================================
        {
            name: 'modalidad',
            type: 'select',
            required: true,
            options: [
                { label: 'Presencial', value: 'presencial' },
                { label: 'Remoto', value: 'remoto' },
                { label: 'Híbrido', value: 'hibrido' },
            ],
        },
        {
            name: 'ubicacion',
            type: 'group',
            label: 'Ubicación',
            admin: {
                condition: (data) => data.modalidad !== 'remoto',
                description: 'Solo si la modalidad NO es remoto',
            },
            fields: [
                {
                    name: 'departamento',
                    type: 'text',
                    label: 'Departamento',
                    admin: {
                        placeholder: 'Lima',
                    },
                },
                {
                    name: 'distrito',
                    type: 'text',
                    label: 'Distrito',
                    admin: {
                        placeholder: 'San Isidro',
                    },
                },
                {
                    name: 'direccion',
                    type: 'text',
                    label: 'Dirección (opcional)',
                    admin: {
                        placeholder: 'Av. Principal 123',
                    },
                },
            ],
        },

        // ============================================
        // SECCIÓN: CONTRATO Y HORARIO
        // ============================================
        {
            name: 'tipo_contrato',
            type: 'select',
            required: true,
            options: [
                { label: 'Prácticas Pre-profesionales', value: 'practicas_pre' },
                { label: 'Prácticas Profesionales', value: 'practicas_pro' },
                { label: 'Tiempo Completo', value: 'tiempo_completo' },
                { label: 'Medio Tiempo', value: 'medio_tiempo' },
                { label: 'Por Horas', value: 'por_horas' },
                { label: 'Freelance', value: 'freelance' },
            ],
        },
        {
            name: 'horario',
            type: 'text',
            label: 'Horario',
            admin: {
                placeholder: 'Lunes a Viernes 9am - 6pm',
            },
        },

        // ============================================
        // SECCIÓN: COMPENSACIÓN
        // ============================================
        {
            name: 'compensacion',
            type: 'group',
            label: 'Compensación',
            fields: [
                {
                    name: 'salario_min',
                    type: 'number',
                    label: 'Salario mínimo (S/)',
                    admin: {
                        placeholder: '1500',
                    },
                },
                {
                    name: 'salario_max',
                    type: 'number',
                    label: 'Salario máximo (S/)',
                    admin: {
                        placeholder: '2000',
                    },
                },
                {
                    name: 'mostrar_salario',
                    type: 'checkbox',
                    label: '¿Mostrar salario públicamente?',
                    defaultValue: true,
                    admin: {
                        description: 'Si está desmarcado, se mostrará "A convenir"',
                    },
                },
            ],
        },
        {
            name: 'beneficios',
            type: 'textarea',
            label: 'Beneficios adicionales',
            admin: {
                placeholder: 'EPS, bono de transporte, almuerzo, capacitaciones, etc.',
            },
        },

        // ============================================
        // SECCIÓN: CONTACTO Y POSTULACIÓN
        // ============================================
        {
            name: 'email_contacto',
            type: 'email',
            label: 'Email de contacto (opcional)',
            admin: {
                description: 'Si está vacío, se usará el email de la empresa',
            },
        },
        {
            name: 'instrucciones_postulacion',
            type: 'textarea',
            label: 'Instrucciones especiales para postular',
            admin: {
                placeholder: 'Por favor incluir portfolio con 3 proyectos mínimo',
            },
        },

        // ============================================
        // SECCIÓN: ESTADO Y FECHAS
        // ============================================
        {
            name: 'estado',
            type: 'select',
            required: true,
            defaultValue: 'activa',
            options: [
                { label: 'Borrador', value: 'borrador' },
                { label: 'Activa', value: 'activa' },
                { label: 'Pausada', value: 'pausada' },
                { label: 'Cerrada', value: 'cerrada' },
            ],
            admin: {
                description: 'Solo las ofertas "Activas" se muestran públicamente',
            },
        },
        {
            name: 'fecha_publicacion',
            type: 'date',
            label: 'Fecha de publicación',
            defaultValue: () => new Date().toISOString(),
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                },
            },
        },
        {
            name: 'fecha_cierre',
            type: 'date',
            label: 'Fecha de cierre',
            admin: {
                description: 'Hasta cuándo se aceptan postulaciones',
                date: {
                    pickerAppearance: 'dayOnly',
                },
            },
        },

        // ============================================
        // SECCIÓN: DESTACADO Y VISIBILIDAD
        // ============================================
        {
            name: 'destacada',
            type: 'checkbox',
            label: '¿Destacar en homepage?',
            defaultValue: false,
            admin: {
                description: 'Las ofertas destacadas aparecen primero',
            },
        },
        {
            name: 'urgente',
            type: 'checkbox',
            label: '¿Marcar como urgente?',
            defaultValue: false,
            admin: {
                description: 'Se mostrará una badge de "Urgente"',
            },
        },

        // ============================================
        // SECCIÓN: METADATA
        // ============================================
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (URL amigable)',
            admin: {
                description: 'Se genera automáticamente del título',
                readOnly: true,
            },
            hooks: {
                beforeValidate: [
                    ({ data, operation }) => {
                        if ((operation === 'create' || !data?.slug) && data?.titulo) {
                            return data.titulo
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)/g, '');
                        }
                        return data?.slug;
                    },
                ],
            },
        },
        {
            name: 'vistas',
            type: 'number',
            label: 'Número de vistas',
            defaultValue: 0,
            admin: {
                readOnly: true,
                description: 'Se actualiza automáticamente',
            },
        },
        {
            name: 'postulaciones_count',
            type: 'number',
            label: 'Número de postulaciones',
            defaultValue: 0,
            admin: {
                readOnly: true,
                description: 'Se actualiza desde el backend',
            },
        },
    ],
};
