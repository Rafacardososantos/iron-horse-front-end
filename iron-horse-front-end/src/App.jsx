import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import VehicleListing from './VehicleListing/VehicleListing';
import CarDetails from './CarDetails/CarDetails';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-listing" element={<VehicleListing />} />
          <Route path='car' element={ <CarDetails carId={2}/> } /> 
        </Routes>
    </Router>
  );
}

export default App;
