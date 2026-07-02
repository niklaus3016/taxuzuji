import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent ResizeObserver loop limit exceeded / loop completed with undelivered notifications
// from bubbling up as Script error in iframe environments.
const handleGlobalError = (e: ErrorEvent) => {
  if (
    e.message &&
    (e.message.includes('ResizeObserver') ||
     e.message.includes('Script error.') ||
     e.message.includes('Resize observer'))
  ) {
    e.stopImmediatePropagation();
    e.preventDefault();
    return true;
  }
};

const handleGlobalRejection = (e: PromiseRejectionEvent) => {
  if (
    e.reason &&
    e.reason.message &&
    (e.reason.message.includes('ResizeObserver') ||
     e.reason.message.includes('Resize observer'))
  ) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
};

window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handleGlobalRejection);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

