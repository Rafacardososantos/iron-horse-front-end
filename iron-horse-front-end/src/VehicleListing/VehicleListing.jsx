import './VehicleListing.css';
import carImage1 from '../../public/img/Hatch background1.jpg';
import SearchBar from '../components/SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import api from '../utils/api';

const VehicleListing = () => {
  const { state } = useLocation();

  const initialResults = state?.results || [];
  const totalPages = state?.totalPages || 0;
  const currentPage = state?.currentPage || 0;
  const city = state?.city || '';

  const [results, setResults] = useState(initialResults);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages - 1);

  const fetchNextPage = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await api.get('/cars/search', {
        params: {
          city,
          page: page + 1,
          size: 10,
        },
      });

      setResults(prevResults => [...prevResults, ...response.content]);
      setPage(prevPage => prevPage + 1);
      setHasMore(response.number < response.totalPages - 1);
    } catch (error) {
      console.error("Erro ao carregar mais carros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = (event) => {
      const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
      if (bottom) {
        fetchNextPage();
      }
    };

    const scrollContainer = document.getElementById("results-container");
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

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
          label: car.brand + " " + car.model + " " + car.manufactureYear,
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
      <NavigationBar />
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
        <section id="results-container" className="results">
          {results.length > 0 ? (
            results.map((car, index) => (
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
            <p>Nenhum carro encontrado para esta pesquisa.</p>
          )}
          {loading && <p>Carregando mais...</p>}
        </section>

        <div id="map"></div>
      </div>
    </div>
  );
};

export default VehicleListing;
