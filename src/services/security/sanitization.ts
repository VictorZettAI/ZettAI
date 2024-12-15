import DOMPurify from 'dompurify';

export class InputSanitizer {
  private static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  private static nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

  static sanitizeInput(input: string): string {
    if (!input) return '';
    return DOMPurify.sanitize(input.trim(), {
      ALLOWED_TAGS: [], // Strip all HTML tags
      ALLOWED_ATTR: [] // Strip all attributes
    });
  }

  static sanitizeName(name: string): string {
    const sanitized = this.sanitizeInput(name);
    return this.nameRegex.test(sanitized) ? sanitized : '';
  }

  static sanitizeEmail(email: string): string {
    const sanitized = this.sanitizeInput(email);
    return this.emailRegex.test(sanitized) ? sanitized.toLowerCase() : '';
  }

  static sanitizePhone(phone: string | undefined): string {
    if (!phone) return '';
    const sanitized = this.sanitizeInput(phone);
    return this.phoneRegex.test(sanitized) ? sanitized : '';
  }

  static sanitizeText(text: string, maxLength: number = 1000): string {
    const sanitized = this.sanitizeInput(text);
    return sanitized.length > maxLength ? sanitized.slice(0, maxLength) : sanitized;
  }

  static validateInput(input: string, type: 'name' | 'email' | 'phone' | 'text'): boolean {
    switch (type) {
      case 'name':
        return this.nameRegex.test(this.sanitizeInput(input));
      case 'email':
        return this.emailRegex.test(this.sanitizeInput(input));
      case 'phone':
        return this.phoneRegex.test(this.sanitizeInput(input));
      case 'text':
        return this.sanitizeInput(input).length > 0;
      default:
        return false;
    }
  }
}

export class OutputSanitizer {
  static sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false
    });
  }

  static escapeJson(data: any): string {
    return JSON.stringify(data).replace(/</g, '\\u003c')
                             .replace(/>/g, '\\u003e')
                             .replace(/&/g, '\\u0026');
  }
}
