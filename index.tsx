import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import RootApp from './RootApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

if (rootElement.innerHTML.trim()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
