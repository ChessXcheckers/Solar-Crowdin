import React from 'react';
import { trackPerformance } from '../utils/production';

interface PerformanceWrapperProps {
  name: string;
  children: React.ReactNode;
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ name, children }) => {
  React.useEffect(() => {
    trackPerformance(name + ' mount', () => {});
  }, [name]);

  return React.createElement(React.Fragment, null, children);
};

// Hook for monitoring component render performance
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = React.useRef(0);
  const startTime = React.useRef(performance.now());

  React.useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (import.meta.env.DEV) {
      console.log(componentName + ' render count: ' + renderCount.current + ', time: ' + renderTime.toFixed(2) + 'ms');
    }
    
    startTime.current = performance.now();
  });

  return renderCount.current;
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  React.useEffect(() => {
    if ('memory' in performance && import.meta.env.DEV) {
      const memory = (performance as any).memory;
      console.log('Memory usage:', {
        used: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
        total: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
        limit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
      });
    }
  }, []);
};