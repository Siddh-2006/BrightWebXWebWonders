import { StrictMode,useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavContextProvider from './context/navContextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <NavContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </NavContextProvider>
)
