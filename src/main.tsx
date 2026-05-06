import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!, {
  onCaughtError: (error) => {
    console.error('Caught error:', error);
  },
  onUncaughtError: (error) => {
    console.error('Uncaught error:', error);
  },
  onRecoverableError: (error) => {
    console.warn('Recoverable error:', error);
  },
}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
