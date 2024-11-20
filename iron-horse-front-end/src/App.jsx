import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import RentaList from './RentalList/RentalList';
import VehicleListing from './VehicleListing/VehicleListing';
import CarInfo from './CarInfo/CarInfo'
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './ResetPassword/resetPassword';
import AllRentals from './AllRentals/AllRentals';
import QrCodePage from './Confirmation/QrCodePage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rentals" element={
              <RentaList/>
          }/>
          <Route path="/vehicle-listing" element={<VehicleListing />} />
          <Route path="/car-details" element={<ProtectedRoute><CarInfo /></ProtectedRoute>} />
          <Route path="/recovery/reset" element={<ResetPassword />}/>
        <Route path="/my-cars" element={<ProtectedRoute><AllRentals /></ProtectedRoute>} />
        <Route path="test" element={<QrCodePage/>} />
        </Routes>
    </Router>
  );
}

export default App;