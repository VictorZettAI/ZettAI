import { RATE_LIMIT_CONFIG } from '../../config/security';

class RateLimiter {
  private requests: Map<string, number[]>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor() {
    this.requests = new Map();
    this.windowMs = RATE_LIMIT_CONFIG.windowMs;
    this.maxRequests = RATE_LIMIT_CONFIG.max;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Obtener o inicializar el array de timestamps para este identificador
    let timestamps = this.requests.get(identifier) || [];
    
    // Limpiar timestamps antiguos
    timestamps = timestamps.filter(timestamp => timestamp > windowStart);

    // Verificar si se excede el límite
    if (timestamps.length >= this.maxRequests) {
      return true;
    }

    // Agregar nuevo timestamp
    timestamps.push(now);
    this.requests.set(identifier, timestamps);

    return false;
  }

  getRemainingRequests(identifier: string): number {
    const timestamps = this.requests.get(identifier) || [];
    const windowStart = Date.now() - this.windowMs;
    const currentRequests = timestamps.filter(timestamp => timestamp > windowStart).length;
    return Math.max(0, this.maxRequests - currentRequests);
  }

  getResetTime(identifier: string): number {
    const timestamps = this.requests.get(identifier) || [];
    if (timestamps.length === 0) return 0;

    const oldestTimestamp = Math.min(...timestamps);
    return Math.max(0, oldestTimestamp + this.windowMs - Date.now());
  }
}

export const rateLimiter = new RateLimiter();
