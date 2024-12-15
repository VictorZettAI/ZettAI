import { CSP_POLICY } from '../config/security';
import { env } from '../config/env';

export function setupSecurityHeaders(app: any) {
  // Configurar CSP
  app.use((req: any, res: any, next: any) => {
    const csp = Object.entries(CSP_POLICY)
      .map(([key, values]) => `${key} ${values.join(' ')}`)
      .join('; ');

    res.setHeader('Content-Security-Policy', csp);
    
    // Otras cabeceras de seguridad importantes
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', env.API_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    next();
  });

  // Middleware para prevenir inyección de parámetros
  app.use((req: any, res: any, next: any) => {
    const sanitizeValue = (value: string) => {
      if (typeof value !== 'string') return value;
      return value.replace(/[<>]/g, '');
    };

    if (req.query) {
      Object.keys(req.query).forEach(key => {
        req.query[key] = sanitizeValue(req.query[key]);
      });
    }

    if (req.body && typeof req.body === 'object') {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          req.body[key] = sanitizeValue(req.body[key]);
        }
      });
    }

    next();
  });
}
