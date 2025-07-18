// src/index.js or src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes'; 
import './styles/theme.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes /> 
  </React.StrictMode>
);