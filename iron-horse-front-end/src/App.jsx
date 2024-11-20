import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import RentaList from './RentalList/RentalList';
import VehicleListing from './VehicleListing/VehicleListing';
import CarInfo from './CarInfo/CarInfo'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rentals" element={
              <RentaList/>
          }/>
          <Route path="/vehicle-listing" element={<VehicleListing />} />
          <Route path="/car-details" element={<CarInfo />} />
        </Routes>
    </Router>
  );
}

export default App;