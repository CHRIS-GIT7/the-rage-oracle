// Safeguard window.fetch against packages attempting direct assignment (e.g., formdata-polyfill)
if (typeof window !== 'undefined') {
  try {
    const origFetch = window.fetch;
    let currentFetch = origFetch;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(fn) {
        currentFetch = fn;
      },
    });
  } catch (e) {
    // Ignore if already configured
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
