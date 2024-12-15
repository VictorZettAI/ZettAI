# 📚 Documentación de Componentes ZettAI

## 📑 Índice
1. [Componentes de Layout](#componentes-de-layout)
2. [Componentes de Sección](#componentes-de-sección)
3. [Componentes UI](#componentes-ui)
4. [Componentes de Utilidad](#componentes-de-utilidad)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Configuración](#configuración)
7. [Dependencias Principales](#dependencias-principales)
8. [Scripts](#scripts)
9. [Análisis Detallado de Componentes](#análisis-detallado-de-componentes)

## 🏗️ Componentes de Layout

### Header
El componente de navegación principal de la aplicación.

**Características:**
- Navegación responsive con menú hamburguesa para móviles
- Links animados con indicador de sección activa
- Efecto de glassmorphism al hacer scroll
- Transiciones suaves entre estados

**Props:**
```typescript
interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}
```

### Footer
Pie de página con información de contacto y enlaces importantes.

**Características:**
- Grid responsive de enlaces
- Integración con redes sociales
- Formulario de newsletter
- Información de contacto y legal

**Props:**
```typescript
interface FooterProps {
  showNewsletter?: boolean;
}
```

## 🎯 Componentes de Sección

### Hero
Sección principal de bienvenida.

**Características:**
- Animaciones de entrada
- Llamadas a la acción principales
- Fondo dinámico con partículas
- Texto animado con TypeWriter

### Services
Presentación de servicios de IA.

**Características:**
- Grid de servicios con hover effects
- Iconos animados
- Descripciones detalladas
- Enlaces a más información

### IAS (Demos de IA)
Sección de demostraciones interactivas.

**Características:**
- Chat Asistente
  - Integración con OpenAI
  - Historial de conversación
  - Indicador de escritura
  - Manejo de errores

- Generador de Imágenes
  - Integración con DALL-E
  - Preview de imágenes
  - Opciones de configuración
  - Descarga de resultados

- Análisis de Texto
  - Procesamiento NLP
  - Visualización de resultados
  - Métricas y estadísticas
  - Exportación de datos

- Asistente de Código
  - Syntax highlighting
  - Sugerencias en tiempo real
  - Corrección de errores
  - Múltiples lenguajes

### Blog
Sistema de blog con búsqueda y filtrado.

**Características:**
- Búsqueda en tiempo real
- Filtrado por categorías
- Tarjetas animadas
- Paginación
- Vista detallada de artículos

**Estados:**
```typescript
interface BlogState {
  searchTerm: string;
  currentPage: number;
  selectedCategory: string | null;
}
```

### Team
Presentación del equipo.

**Características:**
- Grid de miembros
- Cards con hover effect
- Enlaces a redes sociales
- Modal con bio detallada

### Contact
Formulario de contacto y ubicación.

**Características:**
- Validación de formularios
- Integración con API de emails
- Mapa interactivo
- Feedback visual

## 🎨 Componentes UI

### Button
Botón reutilizable con variantes.

**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}
```

### Card
Componente de tarjeta con efectos.

**Variantes:**
- Basic: Tarjeta simple
- Interactive: Con hover effects
- Featured: Diseño destacado
- Glass: Efecto glassmorphism

### Input
Campo de entrada estilizado.

**Características:**
- Validación integrada
- Mensajes de error
- Estados de focus
- Iconos integrados

### Modal
Ventana modal reutilizable.

**Características:**
- Animaciones de entrada/salida
- Bloqueo de scroll
- Cierre con ESC
- Backdrop con blur

## 🛠️ Componentes de Utilidad

### SEO
Optimización para motores de búsqueda.

**Props:**
```typescript
interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  type: 'website' | 'article';
}
```

### ErrorBoundary
Manejo de errores en componentes.

**Características:**
- Captura de errores
- UI de fallback
- Reset de estado
- Logging de errores

### AccessibilityControls
Controles de accesibilidad.

**Características:**
- Alto contraste
- Tamaño de texto
- Reducción de movimiento
- Atajos de teclado

## 🔧 Estructura del Proyecto

### Directorios Principales

#### `/src`
- **App.tsx**: Componente raíz de la aplicación
- **main.tsx**: Punto de entrada de la aplicación
- **index.css**: Estilos globales
- **vite-env.d.ts**: Declaraciones de tipos para Vite

#### `/src/analytics`
Configuración y utilidades para el seguimiento de análisis.
- **tracker.ts**: Implementación de Google Analytics y eventos personalizados

#### `/src/assets`
Recursos estáticos como imágenes, fuentes y SVGs.
- **images/**: Imágenes y fondos
- **icons/**: Iconos SVG
- **fonts/**: Fuentes web

#### `/src/components`
Componentes React organizados por categoría.

#### `/src/config`
Configuraciones globales y constantes.
- **app.config.ts**: Configuración general
- **api.config.ts**: Endpoints y configuración de API
- **theme.config.ts**: Configuración de tema
- **routes.config.ts**: Definición de rutas
- **analytics.config.ts**: Configuración de análisis
- **seo.config.ts**: Configuración SEO
- **i18n.config.ts**: Configuración de internacionalización

#### `/src/constants`
Valores constantes utilizados en la aplicación.
- **routes.ts**: Rutas de la aplicación
- **api.ts**: Endpoints de API
- **messages.ts**: Mensajes y textos
- **theme.ts**: Constantes de tema
- **validation.ts**: Reglas de validación

#### `/src/context`
Contextos de React para estado global.
- **AppContext.tsx**: Contexto principal
- **ThemeContext.tsx**: Gestión de tema
- **AuthContext.tsx**: Autenticación
- **LanguageContext.tsx**: Idioma

#### `/src/hooks`
Hooks personalizados.
- **useImageLoader.ts**: Carga de imágenes
- **useScrollspy.ts**: Detección de scroll
- **useLocalStorage.ts**: Persistencia local
- **useDebounce.ts**: Debounce de funciones
- **useMediaQuery.ts**: Queries de medios
- **useForm.ts**: Gestión de formularios

#### `/src/lib`
Bibliotecas y utilidades externas.
- **api.ts**: Cliente HTTP
- **storage.ts**: Almacenamiento
- **logger.ts**: Logging
- **analytics.ts**: Tracking
- **validation.ts**: Validación

#### `/src/middleware`
Middleware para manejo de peticiones.
- **auth.ts**: Autenticación
- **error.ts**: Manejo de errores
- **logger.ts**: Logging
- **cache.ts**: Caché

#### `/src/providers`
Providers de React para funcionalidad global.
- **AppProvider.tsx**: Provider principal
- **ThemeProvider.tsx**: Tema
- **AuthProvider.tsx**: Autenticación
- **I18nProvider.tsx**: Internacionalización

#### `/src/services`
Servicios y APIs.
- **api/**
  - `openai.ts`: Servicios de OpenAI
  - `auth.ts`: Autenticación
  - `blog.ts`: Blog
  - `contact.ts`: Formulario de contacto

#### `/src/store`
Estado global con Redux/Zustand.
- **slices/**
  - `auth.ts`: Estado de autenticación
  - `theme.ts`: Estado del tema
  - `ui.ts`: Estado de UI

#### `/src/styles`
Estilos globales y utilidades.
- **global.css**: Estilos globales
- **variables.css**: Variables CSS
- **animations.css**: Animaciones
- **utilities.css**: Clases utilitarias

#### `/src/types`
Tipos TypeScript.
- **api.types.ts**: Tipos de API
- **components.types.ts**: Tipos de componentes
- **context.types.ts**: Tipos de contexto
- **store.types.ts**: Tipos de estado

#### `/src/utils`
Funciones utilitarias.
- **format.ts**: Formateo de datos
- **validation.ts**: Validación
- **storage.ts**: Almacenamiento
- **animation.ts**: Utilidades de animación

## 🔧 Configuración

### Vite
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@styles': '/src/styles'
    }
  }
});
```

### TypeScript
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### ESLint
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

### Prettier
```json
// .prettierrc
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
```

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "@headlessui/react": "^1.7.x",
    "@heroicons/react": "^2.0.x",
    "axios": "^1.4.x",
    "framer-motion": "^10.12.x",
    "react": "^18.2.x",
    "react-dom": "^18.2.x",
    "react-router-dom": "^6.11.x",
    "tailwindcss": "^3.3.x",
    "zustand": "^4.3.x"
  },
  "devDependencies": {
    "@types/react": "^18.2.x",
    "@types/react-dom": "^18.2.x",
    "@typescript-eslint/eslint-plugin": "^5.59.x",
    "@typescript-eslint/parser": "^5.59.x",
    "@vitejs/plugin-react": "^4.0.x",
    "autoprefixer": "^10.4.x",
    "eslint": "^8.38.x",
    "postcss": "^8.4.x",
    "prettier": "^2.8.x",
    "typescript": "^5.0.x",
    "vite": "^4.3.x"
  }
}
```

## 🚀 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "prepare": "husky install"
  }
}

## 🔍 Análisis Detallado de Componentes

## 📱 Componentes Principales

### 1. Blog (`/components/sections/Blog/Blog.tsx`)

#### Estructura de Datos
```typescript
interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}
```

#### Subcomponentes
1. **BlogCard**
   - Animaciones con Framer Motion
   - Efectos de hover
   - Glassmorphism con backdrop-blur
   - Transiciones suaves

#### Características
- Búsqueda en tiempo real
- Filtrado por categorías
- Animaciones de entrada
- Diseño responsivo
- Paginación
- Optimización de imágenes

#### Estados
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
```

### 2. IAS (Intelligent Assistant System) (`/components/sections/IAS/IAS.tsx`)

#### Estructura de Datos
```typescript
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface IADemo {
  id: number;
  title: string;
  description: string;
  image: string;
  enabled: boolean;
}
```

#### Subcomponentes

1. **ChatDemo**
   - Chat en tiempo real
   - Integración con OpenAI
   - Manejo de estados de carga
   - Animaciones de escritura

2. **ImageGeneratorDemo**
   - Generación de imágenes con DALL-E
   - Preview en tiempo real
   - Controles de configuración
   - Gestión de errores

3. **TextAnalyzerDemo**
   - Análisis de sentimientos
   - Extracción de entidades
   - Visualización de resultados
   - Exportación de datos

4. **CodeAssistantDemo**
   - Autocompletado de código
   - Syntax highlighting
   - Sugerencias en tiempo real
   - Múltiples lenguajes

#### Características
- Interfaz modular
- Sistema de permisos
- Caché de resultados
- Optimización de rendimiento

## 🎨 Componentes de UI

### 1. OptimizedImage
```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}
```

#### Características
- Lazy loading
- Optimización automática
- Placeholder blur
- Soporte WebP

### 2. Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}
```

#### Variantes
1. **Primary**
   ```css
   .btn-primary {
     @apply bg-amber-500 text-black hover:bg-amber-400;
   }
   ```

2. **Secondary**
   ```css
   .btn-secondary {
     @apply bg-gray-800 text-white hover:bg-gray-700;
   }
   ```

3. **Outline**
   ```css
   .btn-outline {
     @apply border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10;
   }
   ```

4. **Ghost**
   ```css
   .btn-ghost {
     @apply text-amber-500 hover:bg-amber-500/10;
   }
   ```

## 🛠️ Servicios y APIs

### 1. OpenAI Service
```typescript
interface OpenAIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

class OpenAIService {
  private config: OpenAIConfig;
  
  constructor(config: OpenAIConfig) {
    this.config = config;
  }

  async chat(messages: Message[]): Promise<string> {
    // Implementación
  }

  async generateImage(prompt: string): Promise<string> {
    // Implementación
  }

  async analyzeText(text: string): Promise<Analysis> {
    // Implementación
  }
}
```

### 2. Analytics Service
```typescript
interface Event {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class AnalyticsService {
  track(event: Event): void {
    // Implementación
  }

  page(pageName: string): void {
    // Implementación
  }
}
```

## 🔒 Seguridad

### 1. Rate Limiting
```typescript
interface RateLimitConfig {
  windowMs: number;  // 15 minutos
  max: number;       // 100 requests
  message: string;
}

const rateLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones, por favor intente más tarde'
});
```

### 2. Input Sanitization
```typescript
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: []
  });
};
```

## 📊 Estado Global (Zustand)

```typescript
interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const useStore = create<AppState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  language: 'es',
  setLanguage: (language) => set({ language }),
  user: null,
  setUser: (user) => set({ user })
}));
```

## 🎭 Sistema de Animaciones

### 1. Framer Motion Variants

```typescript
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const slideIn = {
  initial: { 
    x: -100, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};
```

### 2. CSS Animations

```css
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.animate-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

## 📱 Sistema de Grid Responsivo

```typescript
const gridConfig = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  row: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  col: 'flex flex-col space-y-4'
};

const breakpoints = {
  sm: '640px',   // Móvil
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large Desktop
  '2xl': '1536px' // Extra Large
};

const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  // ...etc
};
```

## 🎨 Sistema de Diseño

### 1. Colores
```typescript
const colors = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12'
  },
  // ...otros colores
};
```

### 2. Tipografía
```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
    mono: ['Fira Code', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};
```

### 3. Sombras
```typescript
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};
