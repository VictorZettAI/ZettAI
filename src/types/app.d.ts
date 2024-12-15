export interface Service {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AppConfig {
  name: string;
  version: string;
  defaultLocale: string;
  supportedLocales: string[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  features: {
    darkMode: boolean;
    analytics: boolean;
    notifications: boolean;
    services: Service[];
  };
  limits: {
    maxUploadSize: number;
    maxRequests: number;
    rateLimit: number;
  };
  cache: {
    ttl: number;
    prefix: string;
    invalidateOnUpdate: boolean;
  };
  security: {
    maxLoginAttempts: number;
    lockoutDuration: number;
    passwordMinLength: number;
    requireSpecialChar: boolean;
    requireNumber: boolean;
    requireUppercase: boolean;
    sessionTimeout: number;
  };
  api: {
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
    endpoints: {
      auth: string;
      user: string;
      chat: string;
      images: string;
    };
  };
}
