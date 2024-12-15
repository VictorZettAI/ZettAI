import { env } from '../config/env';

export const CONFIG = {
  site: {
    name: 'ZettAI',
    description: 'Soluciones de IA innovadoras para empresas',
    url: 'https://zettai.com',
    locale: 'es',
  },
  api: {
    baseUrl: env.API_URL,
    timeout: env.API_TIMEOUT,
  },
  analytics: {
    googleAnalyticsId: env.ANALYTICS_API_KEY,
    enableAnalytics: env.IS_PROD && env.ENABLE_ANALYTICS,
  },
  features: {
    enableChat: env.ENABLE_CHAT,
    enableDarkMode: env.ENABLE_DARK_MODE,
    enableAnalytics: env.ENABLE_ANALYTICS,
  },
  contact: {
    email: env.CONTACT_EMAIL || 'contacto@zettai.com',
    phone: env.CONTACT_PHONE || '+34 900 123 456',
    address: env.CONTACT_ADDRESS || 'Calle Innovación, 123, 28001 Madrid',
  },
  social: {
    twitter: env.SOCIAL_TWITTER || 'https://twitter.com/zettai',
    linkedin: env.SOCIAL_LINKEDIN || 'https://linkedin.com/company/zettai',
    github: env.SOCIAL_GITHUB || 'https://github.com/zettai',
  },
} as const;

export default CONFIG;
