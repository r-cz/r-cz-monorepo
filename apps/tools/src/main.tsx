import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider as ShadcnThemeProvider } from '@r-cz/shadcn-ui'
import { ThemeProvider as LegacyThemeProvider } from '@r-cz/theme'
import '@r-cz/shadcn-ui/src/styles/globals.css'
import './index.css'

// Create root and render app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ShadcnThemeProvider defaultTheme="system">
      <LegacyThemeProvider>
        <App />
      </LegacyThemeProvider>
    </ShadcnThemeProvider>
  </React.StrictMode>,
)