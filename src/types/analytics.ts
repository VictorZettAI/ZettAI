export interface AnalyticsEvent {
  eventType: string;
  metadata?: Record<string, any>;
  timestamp: number;
  sessionId: string;
}

export interface AnalyticsConfig {
  endpoint: string;
  batchSize: number;
  flushInterval: number;
}

export interface FormAnalytics {
  formId: string;
  success: boolean;
  url: string;
  timestamp: number;
}

export type AnalyticsEventType = 
  | 'form_submission'
  | 'page_view'
  | 'button_click'
  | 'error'
  | 'api_call';
