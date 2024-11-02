import NavigationBar from "../NavigationBar";
import SearchBar from "../SearchBar/SearchBar";
import './Login.css';

import Container from 'react-bootstrap/Container';
import Carousel from "../Carousel/Carousel";


function Login () {
    return(
        <>
        <NavigationBar/>
        <main>
            <div className="login-main-container">
                <SearchBar/>
                <Carousel/>            
            </div>
        </main>
        </>
    )
}

export default Login;