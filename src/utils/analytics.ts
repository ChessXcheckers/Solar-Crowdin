import { isProd } from '../utils/production';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;

  init() {
    if (this.isInitialized || !isProd) return;
    
    // Initialize analytics in production
    this.isInitialized = true;
    console.log('Analytics initialized');
  }

  track(event: string, properties?: Record<string, any>) {
    if (!isProd) {
      console.log('Analytics Event:', { event, properties });
      return;
    }

    // Send to analytics service in production
    this.sendEvent({ event, properties });
  }

  page(path: string, properties?: Record<string, any>) {
    this.track('page_view', { path, ...properties });
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!isProd) {
      console.log('Analytics Identify:', { userId, traits });
      return;
    }

    // Send identification to analytics service
  }

  private sendEvent(eventData: AnalyticsEvent) {
    // In production, send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    try {
      // gtag('event', eventData.event, eventData.properties);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
}

export const analytics = new Analytics();

// Web Vitals monitoring (simplified for now)
export const measureWebVitals = () => {
  if (!isProd) return;

  // Basic performance monitoring
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      analytics.track('page_load_time', {
        load_time: navigation.loadEventEnd - navigation.fetchStart,
        dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      });
    }
  }
};

// Business metrics tracking
export const trackPresaleMetrics = {
  walletConnect: (walletType: string) => 
    analytics.track('wallet_connect', { wallet_type: walletType }),
  
  presalePurchase: (amount: string, token: string) =>
    analytics.track('presale_purchase', { amount, payment_token: token }),
  
  presaleView: (stage: string) =>
    analytics.track('presale_view', { stage }),
  
  tokenCalculation: (inputAmount: string, outputTokens: string) =>
    analytics.track('token_calculation', { input_amount: inputAmount, output_tokens: outputTokens }),
  
  vipStatusView: (level: string) =>
    analytics.track('vip_status_view', { vip_level: level }),
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  analytics.track('error', {
    error_message: error.message,
    error_stack: error.stack,
    context,
    timestamp: Date.now(),
    url: window.location.href,
    user_agent: navigator.userAgent,
  });
};