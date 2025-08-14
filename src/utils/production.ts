// Production readiness utilities

export const isProd = import.meta.env.PROD;
export const isDev = import.meta.env.DEV;

// Environment validation
export const validateEnvironment = () => {
  const requiredVars = [
    'VITE_PRESALE_CONTRACT_ADDRESS',
    'VITE_USDT_CONTRACT_ADDRESS',
    'VITE_USDC_CONTRACT_ADDRESS',
    'VITE_TOKEN_CONTRACT_ADDRESS'
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0 && isProd) {
    console.error('Missing required environment variables in production:', missing);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return true;
};

// Performance monitoring
export const trackPerformance = (name: string, fn: () => void) => {
  if (isProd) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Error reporting
export const reportError = (error: Error, context?: string) => {
  if (isProd) {
    // In production, you would send to error tracking service
    console.error('Production error:', { error, context, timestamp: Date.now() });
  } else {
    console.error('Development error:', error, context);
  }
};

// Security headers check
export const checkSecurityHeaders = () => {
  if (isProd && typeof window !== 'undefined') {
    const requiredHeaders = ['X-Frame-Options', 'X-Content-Type-Options'];
    // This would typically be checked on the server side
    console.log('Security headers should be configured on the server');
  }
};