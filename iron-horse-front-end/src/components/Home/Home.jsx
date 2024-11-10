import NavigationBar from "../NavigationBar";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css';
import Carousel from "../Carousel/Carousel";


function Home () {
    return(
        <>
        <div className="home-main-container">        
        <NavigationBar/>
        
            <main>            
                <SearchBar/>
                <Carousel/>
                <h2>Alugue praticamente qualquer carro, em qualquer lugar!</h2>                     
            </main> 
            </div>
        </>
    )
}

export default Home;