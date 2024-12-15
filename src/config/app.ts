import { env } from './env';

export const appConfig = {
  name: env.APP_NAME,
  version: env.APP_VERSION,
  defaultLocale: 'es',
  supportedLocales: ['es', 'en'],
  meta: {
    title: env.APP_NAME + ' - ' + env.APP_DESCRIPTION,
    description: env.APP_DESCRIPTION,
    keywords: ['IA', 'asistente', 'productividad', 'automatización']
  },
  features: {
    darkMode: env.ENABLE_DARK_MODE === 'true',
    analytics: env.ENABLE_ANALYTICS === 'true',
    notifications: true,
    services: [
      {
        id: 'machine-learning',
        name: 'Machine Learning',
        description: 'Soluciones avanzadas de aprendizaje automático',
        enabled: true
      },
      {
        id: 'predictive-analytics',
        name: 'Análisis Predictivo',
        description: 'Predicciones basadas en datos históricos',
        enabled: true
      },
      {
        id: 'ai-automation',
        name: 'Automatización IA',
        description: 'Automatización inteligente de procesos',
        enabled: true
      },
      {
        id: 'big-data',
        name: 'Big Data',
        description: 'Análisis de grandes volúmenes de datos',
        enabled: true
      },
      {
        id: 'ai-consulting',
        name: 'Consultoría IA',
        description: 'Asesoramiento experto en IA',
        enabled: true
      }
    ]
  },
  limits: {
    maxUploadSize: 10 * 1024 * 1024, // 10MB
    maxRequests: Number(env.RATE_LIMIT_MAX_REQUESTS) || 100,
    rateLimit: Number(env.RATE_LIMIT_WINDOW_MS) || 60000 // 1 minuto
  },
  cache: {
    ttl: 3600, // 1 hora
    prefix: 'zettai:',
    invalidateOnUpdate: true
  },
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutos
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    sessionTimeout: 24 * 60 * 60 * 1000 // 24 horas
  },
  api: {
    timeout: Number(env.API_TIMEOUT) || 15000,
    retryAttempts: 3,
    retryDelay: 1000,
    endpoints: {
      auth: '/api/auth',
      user: '/api/user',
      chat: '/api/chat',
      images: '/api/images'
    }
  }
} as const;

export default appConfig;
