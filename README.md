# ZettAI - Plataforma de Soluciones de Inteligencia Artificial

ZettAI es una plataforma moderna y sofisticada que ofrece soluciones de inteligencia artificial para empresas y desarrolladores. Construida con React, TypeScript y Vite, la plataforma combina un diseño elegante con funcionalidades avanzadas de IA.

## Características Principales

### 1. Interfaz de Usuario Moderna
- Diseño responsivo y adaptativo
- Tema oscuro con acentos dorados
- Efectos visuales de glassmorphism
- Animaciones fluidas con Framer Motion
- Navegación suave con scroll behavior

### 2. Secciones Principales

#### Inicio
- Hero section con animaciones
- Presentación de la empresa
- Llamadas a la acción principales

#### Servicios
- Presentación de soluciones de IA
- Tarjetas interactivas con hover effects
- Descripciones detalladas de servicios

#### Casos de Éxito
- Showcase de proyectos realizados
- Testimonios de clientes
- Métricas y resultados

#### Demo IA
Demos interactivas de nuestras tecnologías:
- **Chat Asistente**: IA conversacional basada en GPT
- **Generador de Imágenes**: Creación de imágenes con IA
- **Análisis de Texto**: Procesamiento de lenguaje natural
- **Asistente de Código**: Ayuda en programación

#### Blog
- Artículos sobre IA y tecnología
- Sistema de búsqueda integrado
- Categorización por temas
- Diseño responsivo para mejor lectura

#### Equipo
- Perfiles del equipo
- Experiencia y especialidades
- Información de contacto

#### Contacto
- Formulario de contacto
- Información de la empresa
- Redes sociales
- Ubicación

### 3. Características Técnicas

#### Frontend
- **Framework**: React 18
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Estilos**: TailwindCSS
- **Animaciones**: Framer Motion
- **Routing**: React Router
- **Estado**: Context API
- **Formularios**: React Hook Form

#### Integración con IA
- OpenAI API para chat y procesamiento de texto
- DALL-E para generación de imágenes
- Modelos personalizados para análisis

#### Optimización
- Lazy loading de componentes
- Optimización de imágenes
- Code splitting
- SEO optimizado

## Estructura del Proyecto

```
src/
├── analytics/      # Análisis y tracking
├── assets/         # Imágenes y recursos estáticos
├── components/     # Componentes React
│   ├── layout/     # Componentes de estructura
│   ├── sections/   # Secciones principales
│   └── ui/         # Componentes reutilizables
├── config/         # Configuraciones
├── constants/      # Constantes y enums
├── context/        # Contextos de React
├── hooks/          # Custom hooks
├── lib/           # Librerías y utilidades
├── providers/     # Providers de React
├── services/      # Servicios y API
├── store/         # Estado global
├── styles/        # Estilos globales
├── types/         # TypeScript types
└── utils/         # Funciones utilitarias
```

## Diseño y UI/UX

### Paleta de Colores
- **Principal**: Negro (#070914)
- **Acento**: Amber (#F59E0B)
- **Texto**: Blanco y grises
- **Gradientes**: Combinaciones de negro y amber

### Componentes UI
- Botones con efectos hover
- Tarjetas con glassmorphism
- Inputs estilizados
- Loaders y animaciones
- Iconos de Lucide

### Características de Diseño
- Diseño mobile-first
- Animaciones suaves
- Transiciones fluidas
- Efectos de parallax
- Fondos dinámicos

## Responsive Design
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

## Configuración y Desarrollo

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Git

### Instalación
```bash
# Clonar el repositorio
git clone [repo-url]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Variables de Entorno
```env
VITE_API_URL=
VITE_OPENAI_KEY=
VITE_GA_ID=
```

## Rendimiento y Optimización
- Lighthouse score 90+
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1

## Seguridad
- HTTPS forzado
- Headers de seguridad
- Sanitización de inputs
- Protección contra XSS
- Rate limiting en APIs

## Contribución
Las contribuciones son bienvenidas. Por favor, lee nuestras guías de contribución antes de enviar un PR.

## Licencia
Este proyecto está bajo la licencia MIT.

---

Desarrollado con ❤️ por el equipo de ZettAI
