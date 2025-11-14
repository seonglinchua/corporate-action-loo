import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import { Router } from "wouter";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router base="/corporate-action-loo">
      <App />
    </Router>
   </ErrorBoundary>
)
