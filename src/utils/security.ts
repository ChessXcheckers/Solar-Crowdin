// Security utilities for production

// Content Security Policy helper
export const setupCSP = () => {
  if (import.meta.env.PROD) {
    // CSP should be set via server headers, but this can serve as a fallback
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.coingecko.com https://*.googleapis.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim();
    
    document.head.appendChild(meta);
  }
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .trim();
};

// Wallet address validation
export const isValidAddress = (address: string): boolean => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
};

// Amount validation for token purchases
export const validateTokenAmount = (amount: string): { isValid: boolean; error?: string } => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Invalid number format' };
  }
  
  if (numAmount <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  
  if (numAmount > 1000000) {
    return { isValid: false, error: 'Amount exceeds maximum limit' };
  }
  
  return { isValid: true };
};

// Rate limiting for API calls
class RateLimiter {
  private calls: number[] = [];
  
  constructor(private maxCalls: number, private timeWindow: number) {}
  
  canMakeRequest(): boolean {
    const now = Date.now();
    this.calls = this.calls.filter(time => now - time < this.timeWindow);
    
    if (this.calls.length >= this.maxCalls) {
      return false;
    }
    
    this.calls.push(now);
    return true;
  }
}

export const apiRateLimiter = new RateLimiter(10, 60000); // 10 calls per minute

// Secure random number generation
export const generateSecureRandom = (): string => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(16);
};

// Environment-based security checks
export const performSecurityChecks = () => {
  if (import.meta.env.PROD) {
    // Check if running on HTTPS
    if (location.protocol !== 'https:') {
      console.warn('Application should run on HTTPS in production');
    }
    
    // Check for mixed content
    if (document.querySelector('script[src^="http:"], link[href^="http:"]')) {
      console.warn('Mixed content detected - ensure all resources use HTTPS');
    }
    
    // Disable right-click context menu (optional security measure)
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Disable text selection on sensitive elements
    document.addEventListener('selectstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('no-select')) {
        e.preventDefault();
      }
    });
  }
};