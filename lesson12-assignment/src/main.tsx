import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { logger } from '@/shared/lib/logger';

window.addEventListener('error', (event) => {
  logger.error('Global window error caught', event.error ?? event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled promise rejection caught', event.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);