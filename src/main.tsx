import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'sonner'
import App from './App'
import i18n from './i18n'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
        <Toaster position="top-right" richColors />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
