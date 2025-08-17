import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { validateEnvironment, reportError } from './utils/production'
import { Web3ModalProvider } from './lib/wagmi.tsx'

// Validate environment in production
try {
  validateEnvironment();
} catch (error) {
  reportError(error as Error, 'Environment validation');
}

// Global error handler
window.addEventListener('error', (event) => {
  reportError(new Error(event.message), 'Global error handler');
});

window.addEventListener('unhandledrejection', (event) => {
  reportError(new Error(event.reason), 'Unhandled promise rejection');
});

createRoot(document.getElementById("root")!).render(
  <Web3ModalProvider>
    <App />
  </Web3ModalProvider>
);
