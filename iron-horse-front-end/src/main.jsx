import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';
import App from './App';
import AllRentals from './AllRentals/AllRentals';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CarProvider>
        <AllRentals />
      </CarProvider>
    </AuthProvider>
  </StrictMode>
);
