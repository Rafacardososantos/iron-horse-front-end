import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import VehicleListing from './VehicleListing/VehicleListing';
import CarInfo from './CarInfo/CarInfo'
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './ResetPassword/resetPassword';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-listing" element={<VehicleListing />} />
          <Route path="/car-details" element={<ProtectedRoute><CarInfo /></ProtectedRoute>} />
          <Route
          path="/recovery/reset"
          element={<ResetPassword />}
        />
        </Routes>
    </Router>
  );
}

export default App;