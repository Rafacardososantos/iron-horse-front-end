import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import RentaList from './RentalList/RentalList';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rentals" element={
              <RentaList/>
          }/>
        </Routes>
    </Router>
  );
}

export default App;
