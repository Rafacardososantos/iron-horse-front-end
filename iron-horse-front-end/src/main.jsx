import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QrCodePage from './Confirmation/QrCodePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrCodePage/>
  </StrictMode>,
)
