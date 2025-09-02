//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode> 얘 때문에 마운트나 그런ㄴ게 2번씩 되서 제거 
    <App />
  //</StrictMode>,
)
