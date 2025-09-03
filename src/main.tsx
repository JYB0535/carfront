//import { StrictMode } from 'react'  얘 때문에 마운트나 그런ㄴ게 2번씩 되서 제거 
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />

  </BrowserRouter>
)
