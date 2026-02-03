# 💼 LeadUNI - Bolsa Laboral

Plataforma de empleabilidad para estudiantes y egresados de la Universidad Nacional de Ingeniería (UNI).

## 🚀 Características

- Publicación y búsqueda de vacantes
- Perfiles de estudiantes y empresas
- Módulo CAPACÍTATE para upskilling
- Sistema de postulaciones con seguimiento
- Panel administrativo con Strapi CMS

## 🛠️ Stack Tecnológico

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **CMS:** Strapi
- **Base de datos:** PostgreSQL
- **Deploy:** Railway

## 📁 Estructura del proyecto

```
apps/
├── frontend/     # Aplicación React
├── backend/      # API REST
└── cms/          # Strapi CMS
```

### 💻 Estructura del Frontend

```
src/
 ├─ assets/
 │   ├─ images/
 │   └─ styles/

 ├─ components/
 │   ├─ ui/              → Botones, inputs, modales, tablas reutilizables
 │   ├─ shared/          → Navbar, Sidebar, Footer, UserMenu

 ├─ layouts/
 │   ├─ PublicLayout.vue
 │   ├─ StudentLayout.vue
 │   ├─ CompanyLayout.vue

 ├─ features/
 │   ├─ ofertas/         → Vacantes (MVP crítico)
 │   │   ├─ views/
 │   │   ├─ components/
 │   │   ├─ services/
 │   │   ├─ store/
 │   │   ├─ composables/
 │   │   └─ index.js
 │   │
 │   ├─ empresas/        → Panel empresa (ver vacantes, postulantes)
 │   │   ├─ views/
 │   │   ├─ components/
 │   │   ├─ services/
 │   │   ├─ store/
 │   │   ├─ composables/
 │   │   └─ index.js
 │   │
 │   ├─ estudiantes/     → Perfil del estudiante
 │   │   ├─ views/
 │   │   ├─ components/
 │   │   ├─ services/
 │   │   ├─ store/
 │   │   └─ composables/
 │   │
 │   ├─ capacitate/      → Cursos, sugerencias (Strapi)
 │       ├─ views/
 │       ├─ services/
 │       ├─ components/
 │       ├─ store/
 │       ├─ composables/
 │       └─ index.js

 ├─ stores/
 │   ├─ auth.js          → Login, roles, tokens
 │   ├─ user.js          → Datos globales del usuario

 ├─ services/
 │   ├─ coreApi.js       → Express JS
 │   ├─ cmsApi.js        → Payload 

 ├─ router/
 │   ├─ index.js
 │   ├─ routes/
 │   │   ├─ ofertas.routes.js
 │   │   ├─ empresas.routes.js
 │   │   ├─ estudiantes.routes.js
 │   │   ├─ capacitate.routes.js
 │   │   └─ auth.routes.js
 │   └─ guards.js        → protección de rutas por rol

 ├─ composables/
 │   ├─ useFetch.js
 │   ├─ usePagination.js
 │   ├─ useModal.js

 ├─ config/
 │   ├─ roles.js
 │   ├─ constants.js
 │   ├─ enums.js         → (modalidad, jornada, experiencia, contrato)
 │   ├─ endpoints.js

 ├─ utils/
 │   ├─ formatters.js
 │   ├─ validators.js
 │   └─ helpers.js

 ├─ App.vue
 ├─ main.js
```