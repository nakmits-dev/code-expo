import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { GithubProvider } from './contexts/GithubContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <GithubProvider>
        <App />
      </GithubProvider>
    </HelmetProvider>
  </StrictMode>
);