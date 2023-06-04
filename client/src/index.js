import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/global.css'
import { AppProvider } from './context/appContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
