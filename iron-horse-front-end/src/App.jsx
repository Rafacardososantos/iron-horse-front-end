import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './assets/styles/global.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <>

      <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App