class TokenManager {
  private static instance: TokenManager;
  private tokens: Map<string, string>;

  private constructor() {
    this.tokens = new Map();
  }

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public setToken(key: string, token: string): void {
    // Encriptar o codificar el token antes de almacenarlo
    const encodedToken = btoa(token);
    this.tokens.set(key, encodedToken);
  }

  public getToken(key: string): string | null {
    const encodedToken = this.tokens.get(key);
    if (!encodedToken) return null;
    
    // Decodificar el token
    try {
      return atob(encodedToken);
    } catch {
      return null;
    }
  }

  public removeToken(key: string): void {
    this.tokens.delete(key);
  }

  public clearTokens(): void {
    this.tokens.clear();
  }
}

export const tokenManager = TokenManager.getInstance();
