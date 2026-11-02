import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// Initialize saved theme (defaults to dark)
const savedTheme = localStorage.getItem('theme') || 'dark'
document.documentElement.classList.add(savedTheme)
if (savedTheme === 'light') document.documentElement.classList.remove('dark')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
