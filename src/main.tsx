import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

if(!navigator.geolocation) {
  alert("Imposible obtener tu ubicación.");

  throw new Error("Imposible obtener tu ubicación.");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
