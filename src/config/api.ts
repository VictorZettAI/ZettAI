import { env } from './env';

export const API_BASE_URL = env.API_BASE_URL;

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: Number(env.API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      verify: '/auth/verify',
    },
    user: {
      profile: '/user/profile',
      settings: '/user/settings',
      preferences: '/user/preferences',
    },
    ai: {
      chat: '/ai/chat',
      completion: '/ai/completion',
      image: '/ai/image',
      embedding: '/ai/embedding',
    },
    services: {
      machinelearning: '/services/ml',
      analytics: '/services/analytics',
      automation: '/services/automation',
      bigdata: '/services/bigdata',
      consulting: '/services/consulting',
    },
  },
  rateLimiting: {
    maxRequests: Number(env.RATE_LIMIT_MAX_REQUESTS) || 100,
    windowMs: Number(env.RATE_LIMIT_WINDOW_MS) || 60000,
    message: 'Too many requests, please try again later.',
  },
  retry: {
    attempts: 3,
    backoff: {
      min: 1000,
      max: 5000,
      factor: 2,
    },
  },
  errorMessages: {
    network: 'Error de conexión. Por favor, verifica tu conexión a internet.',
    timeout: 'La solicitud ha excedido el tiempo límite.',
    unauthorized: 'No autorizado. Por favor, inicia sesión nuevamente.',
    forbidden: 'No tienes permisos para realizar esta acción.',
    notFound: 'El recurso solicitado no fue encontrado.',
    server: 'Error del servidor. Por favor, intenta más tarde.',
  },
} as const;

export type ApiEndpoints = typeof API_CONFIG.endpoints;
export type ApiErrorMessages = typeof API_CONFIG.errorMessages;

export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

export const handleApiError = (error: any): string => {
  if (!error.response) {
    return API_CONFIG.errorMessages.network;
  }

  switch (error.response.status) {
    case 401:
      return API_CONFIG.errorMessages.unauthorized;
    case 403:
      return API_CONFIG.errorMessages.forbidden;
    case 404:
      return API_CONFIG.errorMessages.notFound;
    case 429:
      return API_CONFIG.rateLimiting.message;
    case 500:
      return API_CONFIG.errorMessages.server;
    default:
      return error.response.data?.message || API_CONFIG.errorMessages.server;
  }
};
