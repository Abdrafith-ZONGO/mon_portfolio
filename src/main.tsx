import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LangProvider } from './i18n/LangContext'  // ← AJOUTE

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LangProvider>   {/* ← WRAP ici */}
      <App />
    </LangProvider>
  </React.StrictMode>
)