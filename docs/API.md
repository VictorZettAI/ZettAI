# API Documentation

## 🔌 Endpoints

### Contact Form API

#### POST /api/contact

Envía un mensaje a través del formulario de contacto.

```typescript
interface ContactRequest {
  name: string;      // Nombre del remitente
  email: string;     // Email del remitente
  subject?: string;  // Asunto del mensaje (opcional)
  message: string;   // Contenido del mensaje
}

interface ContactResponse {
  success: boolean;
  message: string;
}
```

##### Rate Limiting

- Máximo 5 solicitudes por IP en 15 minutos
- Tiempo de espera: 15 minutos

##### Validación

- `name`: 2-100 caracteres, solo letras y espacios
- `email`: Formato de email válido
- `subject`: 0-200 caracteres
- `message`: 10-1000 caracteres

##### Códigos de Respuesta

- `200`: Mensaje enviado correctamente
- `400`: Datos inválidos
- `429`: Demasiadas solicitudes
- `500`: Error del servidor

### Analytics API

#### POST /api/analytics/track

Registra eventos de análisis.

```typescript
interface AnalyticsEvent {
  eventType: string;   // Tipo de evento
  metadata?: object;   // Datos adicionales
  timestamp: number;   // Timestamp del evento
}

interface AnalyticsResponse {
  success: boolean;
  eventId: string;
}
```

## 🔒 Seguridad

### InputSanitizer

Servicio para sanitización de inputs.

```typescript
class InputSanitizer {
  static sanitizeName(name: string): string;
  static sanitizeEmail(email: string): string;
  static sanitizeText(text: string, maxLength: number): string;
}
```

### RateLimiter

Servicio para control de rate limiting.

```typescript
class RateLimiter {
  isRateLimited(key: string): boolean;
  resetLimit(key: string): void;
}
```

## 🎨 Componentes

### Contact

Componente de formulario de contacto.

```typescript
interface ContactProps {
  // No requiere props
}

function Contact(): JSX.Element;
```

#### Características

- Validación de formulario
- Animaciones con Framer Motion
- Mensajes de error accesibles
- Integración con servicios de seguridad
- Soporte para analytics
