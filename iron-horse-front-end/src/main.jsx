import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreateAccount from './CreateAccount/CreateAccount'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateAccount/>
  </StrictMode>,
)