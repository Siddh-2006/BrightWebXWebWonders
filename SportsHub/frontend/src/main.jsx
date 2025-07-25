import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LoginContextProvider from './context/loginContextProvider.jsx';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
  <LoginContextProvider><App /></LoginContextProvider>
  </StrictMode>
);
