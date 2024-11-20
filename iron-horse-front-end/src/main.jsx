import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RentPopup from './rentPopup/rentPopup';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RentPopup/>
  </StrictMode>,
)