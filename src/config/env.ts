// Configuración de variables de entorno para Vite
export const env = {
  // API Keys
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  ANALYTICS_API_KEY: import.meta.env.VITE_ANALYTICS_API_KEY,

  // URLs y Endpoints
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  ANALYTICS_ENDPOINT: import.meta.env.VITE_ANALYTICS_ENDPOINT || '/api/analytics',
  WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL,

  // Configuración
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  // Límites y timeouts
  ANALYTICS_BATCH_SIZE: Number(import.meta.env.VITE_ANALYTICS_BATCH_SIZE) || 10,
  ANALYTICS_FLUSH_INTERVAL: Number(import.meta.env.VITE_ANALYTICS_FLUSH_INTERVAL) || 5000,
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,

  // Características
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_SENTRY: import.meta.env.VITE_ENABLE_SENTRY === 'true',
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
} as const;

// Tipo para las variables de entorno
export type Env = typeof env;

// Validación de variables de entorno requeridas
const requiredEnvVars = [
  'VITE_OPENAI_API_KEY',
] as const;

// Función para validar variables de entorno requeridas
export function validateEnv(): void {
  for (const key of requiredEnvVars) {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
