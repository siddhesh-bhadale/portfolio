import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found in index.html.');
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
