import { env } from './env';

export const CSP_POLICY = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    env.IS_DEV ? "'unsafe-inline'" : '',
    'https://apis.google.com',
    'https://api.openai.com'
  ].filter(Boolean),
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'data:', 'https:'],
  'connect-src': [
    "'self'",
    'https://api.openai.com',
    env.IS_DEV ? 'ws:' : '',
    env.ANALYTICS_ENDPOINT,
    env.WEBSOCKET_URL,
  ].filter(Boolean),
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': [],
  'block-all-mixed-content': []
};

export const RATE_LIMIT_CONFIG = {
  windowMs: Number(env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: Number(env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite de solicitudes por ventana
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  formSubmissions: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: Number(env.MAX_FORM_SUBMISSIONS) || 5 // límite de envíos de formulario
  }
};

export const INPUT_VALIDATION = {
  maxLength: {
    name: 100,
    email: 255,
    message: 1000,
    search: 200
  },
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
    phone: /^\+?[\d\s-]{8,}$/
  },
  sanitization: {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      'a': ['href', 'target', 'rel']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style']
  }
};

// Configuración de seguridad para cookies
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !env.IS_DEV,
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
};

// Lista de dominios permitidos para CORS
export const ALLOWED_ORIGINS = env.IS_DEV
  ? ['http://localhost:5173', 'http://localhost:3000']
  : [env.API_URL].filter(Boolean);
