import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CarRegister from './CarRegister/CarRegister';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarRegister/>
  </StrictMode>,
)