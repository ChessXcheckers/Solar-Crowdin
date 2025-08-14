// Deployment checklist and configuration

export const PRODUCTION_CHECKLIST = {
  environment: {
    'Environment Variables': 'All required environment variables are set',
    'API Keys': 'All API keys are properly configured',
    'Contract Addresses': 'Smart contract addresses are verified',
    'Network Configuration': 'Correct blockchain network is configured'
  },
  
  security: {
    'HTTPS': 'Application runs on HTTPS',
    'CSP Headers': 'Content Security Policy is configured',
    'Input Validation': 'All user inputs are validated and sanitized',
    'Error Handling': 'Sensitive information is not exposed in errors'
  },
  
  performance: {
    'Bundle Size': 'JavaScript bundles are optimized and split',
    'Image Optimization': 'Images are compressed and properly sized',
    'Lazy Loading': 'Non-critical components are lazy loaded',
    'Caching': 'Proper caching headers are set'
  },
  
  seo: {
    'Meta Tags': 'Title, description, and social media tags are set',
    'Structured Data': 'Schema.org markup is implemented',
    'Sitemap': 'XML sitemap is generated and submitted',
    'Analytics': 'Google Analytics or similar is configured'
  },
  
  monitoring: {
    'Error Tracking': 'Error monitoring service is configured',
    'Performance Monitoring': 'Web vitals and performance metrics are tracked',
    'Uptime Monitoring': 'Server uptime monitoring is enabled',
    'User Analytics': 'User behavior tracking is implemented'
  }
};

// Validate production readiness
export const validateProductionReadiness = () => {
  const issues: string[] = [];
  
  // Check environment variables
  const requiredEnvVars = [
    'VITE_PRESALE_CONTRACT_ADDRESS',
    'VITE_USDT_CONTRACT_ADDRESS',
    'VITE_USDC_CONTRACT_ADDRESS',
    'VITE_TOKEN_CONTRACT_ADDRESS'
  ];
  
  requiredEnvVars.forEach(varName => {
    if (!import.meta.env[varName]) {
      issues.push(`Missing environment variable: ${varName}`);
    }
  });
  
  // Check HTTPS in production
  if (import.meta.env.PROD && location.protocol !== 'https:') {
    issues.push('Application should run on HTTPS in production');
  }
  
  // Check for console.log statements in production
  if (import.meta.env.PROD && window.console.log.toString().includes('console.log')) {
    issues.push('Console logs should be removed in production');
  }
  
  return {
    isReady: issues.length === 0,
    issues
  };
};

// Performance budget thresholds
export const PERFORMANCE_BUDGET = {
  // Core Web Vitals thresholds
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  
  // Additional metrics
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  
  // Bundle sizes (KB)
  maxBundleSize: 1000,
  maxChunkSize: 500
};

// Deployment environment configuration
export const DEPLOYMENT_CONFIG = {
  production: {
    buildCommand: 'npm run build',
    outputDir: 'dist',
    nodeVersion: '18.x',
    environmentVars: [
      'VITE_PRESALE_CONTRACT_ADDRESS',
      'VITE_USDT_CONTRACT_ADDRESS',
      'VITE_USDC_CONTRACT_ADDRESS',
      'VITE_TOKEN_CONTRACT_ADDRESS',
      'VITE_GOOGLE_AI_API_KEY'
    ]
  },
  
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  
  redirects: [
    { from: '/app', to: '/', status: 301 },
    { from: '/presale', to: '/', status: 301 }
  ]
};