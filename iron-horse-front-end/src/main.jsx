import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'; 
import Home from './components/Home/Home'
import RentaList from './RentalList/RentalList';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <RentaList/>
    </Router>
  </StrictMode>,
)
