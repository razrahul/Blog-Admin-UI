import React, { Suspense} from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SuspenseContent from './components/suspance/SuspenseContent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<SuspenseContent />}>
     <App />
    </Suspense>
  </StrictMode>,
)
