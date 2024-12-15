/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API y Endpoints
  readonly VITE_API_URL: string;
  readonly VITE_ANALYTICS_ENDPOINT: string;
  readonly VITE_WEBSOCKET_URL: string;

  // Claves de API
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_ANALYTICS_API_KEY: string;
  readonly VITE_GA_ID: string;

  // Configuración de la aplicación
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_SHORT_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_THEME_COLOR: string;
  readonly VITE_APP_BACKGROUND_COLOR: string;

  // Información de contacto
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_ADDRESS: string;

  // Redes sociales
  readonly VITE_SOCIAL_TWITTER: string;
  readonly VITE_SOCIAL_LINKEDIN: string;
  readonly VITE_SOCIAL_GITHUB: string;

  // Feature flags
  readonly VITE_ENABLE_CHAT: string;
  readonly VITE_ENABLE_DARK_MODE: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_SENTRY: string;
  readonly VITE_DEBUG_MODE: string;

  // Límites y timeouts
  readonly VITE_ANALYTICS_BATCH_SIZE: string;
  readonly VITE_ANALYTICS_FLUSH_INTERVAL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_RATE_LIMIT_WINDOW_MS: string;
  readonly VITE_RATE_LIMIT_MAX_REQUESTS: string;
  readonly VITE_MAX_FORM_SUBMISSIONS: string;

  // Deployment
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
