import { AnalyticsEvent, AnalyticsConfig } from '@/types/analytics';

class Analytics {
  private static instance: Analytics;
  private config: AnalyticsConfig;

  private constructor() {
    this.config = {
      endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT || '/api/analytics',
      batchSize: Number(import.meta.env.VITE_ANALYTICS_BATCH_SIZE) || 10,
      flushInterval: Number(import.meta.env.VITE_ANALYTICS_FLUSH_INTERVAL) || 5000
    };
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    if (!import.meta.env.VITE_ENABLE_ANALYTICS) return;

    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events })
      });

      if (!response.ok) {
        throw new Error(`Analytics error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending analytics:', error);
    }
  }

  public async trackEvent(eventType: string, metadata?: Record<string, any>): Promise<void> {
    const event: AnalyticsEvent = {
      eventType,
      metadata,
      timestamp: Date.now(),
      sessionId: this.getSessionId()
    };

    await this.sendEvents([event]);
  }

  public async trackFormSubmission(formId: string, success: boolean): Promise<void> {
    await this.trackEvent('form_submission', {
      formId,
      success,
      url: window.location.href
    });
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}

export const analytics = Analytics.getInstance();

export const trackFormSubmission = async (formId: string, success: boolean = true): Promise<void> => {
  await analytics.trackFormSubmission(formId, success);
};
