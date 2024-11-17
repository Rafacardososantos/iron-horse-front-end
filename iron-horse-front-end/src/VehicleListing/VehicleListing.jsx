import './VehicleListing.css';
import carImage1 from '../../public/img/Hatch background1.jpg';
import SearchBar from '../components/SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';

const VehicleListing = () => {
  const { state } = useLocation();
  const results = state?.results || [];

  useEffect(() => {
    const initMap = () => {
      const defaultLocation = { lat: -30.0277, lng: -51.2287 };
      
      const mapCenter = results.length > 0 ? 
        { lat: results[0].latitude, lng: results[0].longitude } : 
        defaultLocation;

      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: mapCenter,
      });

      results.forEach(car => {
        new window.google.maps.Marker({
          position: { lat: car.latitude, lng: car.longitude },
          map: map,
          label: car.price,
        });
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=APIKEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }
  }, [results]);

  return (
    <div>
      <NavigationBar/>
      <SearchBar />

      <section className="filters">
        <button>Preço diário</button>
        <button>Tipo de veículo</button>
        <button>Ano de Fabricação</button>
        <button>Ano do Modelo</button>
        <button>Assentos</button>
        <button>Combustível</button>
        <button>Dirija até meu encontro</button>
        <button>Filtros</button>
      </section>

      <div className="main-container">
        <section className="results">
          {results.length > 0 ? (results.map((car, index) => (
            <div key={index} className="car">
              <div className="car-image-card">
                <img src={car.path || carImage1} alt={car.name || 'Carro'} />
              </div>
              <div className="car-details">
                <h3>{car.brand + " " + car.model + " " + car.manufactureYear || 'Nome do Carro'}</h3>
                <p className="car-price">Valor da diária R$ {car.price.toFixed(2) || 'Preço'}</p>
                <p className="car-location">{car.city || 'Localização'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum carro encontrado para essa pesquisa.</p>
        )}
        </section>

        <div id="map"></div>
      </div>
    </div>
  );
};

export default VehicleListing;
