import './VehicleListing.css';
import carImage1 from '../../public/img/Hatch background1.jpg';
import SearchBar from '../components/SearchBar/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import api from '../utils/api';

const VehicleListing = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialResults = state?.results || [];
  const totalPages = state?.totalPages || 0;
  const currentPage = state?.currentPage || 0;
  const city = state?.city || '';
  const startDate = state?.startDate || '';
  const endDate = state?.endDate || '';

  const [results, setResults] = useState(initialResults);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages - 1);
  const [priceFilter, setPriceFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const reloadSearch = async () => {
    setPage(0);
    setResults([]);
    setHasMore(true);
    setLoading(true);

    try {
      const response = await api.get('/cars/search', {
        params: {
          city,
          startDate,
          endDate,
          page: 0,
          size: 10,
          maxPrice: priceFilter,
        },
      });

      setResults(response.data.content);
      setPage(1);
      setHasMore(response.data.number < response.data.totalPages - 1);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await api.get('/cars/search', {
        params: {
          city,
          startDate,
          endDate,
          page: page + 1,
          size: 10,
          maxPrice: priceFilter,
        },
      });

      if (response.data.content.length > 0) {
        setResults((prevResults) => [...prevResults, ...response.data.content]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.number < response.data.totalPages - 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais carros:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, city, startDate, endDate, page, priceFilter]);

  useEffect(() => {
    if (state?.results && state?.results.length > 0) {
      setResults(state.results);
      setPage(state.currentPage);
      setHasMore(state.currentPage < state.totalPages - 1);
    } else {
      reloadSearch();
    }
  }, [state?.results, state?.city, state?.startDate, state?.endDate, priceFilter]);

  const handleScroll = useCallback(
    (event) => {
      const scrollContainer = event.target;
      const bottom =
        scrollContainer.scrollHeight === scrollContainer.scrollTop + scrollContainer.clientHeight;

      if (bottom && !loading && hasMore) {
        fetchNextPage();
      }
    },
    [loading, hasMore, fetchNextPage]
  );

  useEffect(() => {
    const scrollContainer = document.getElementById('results-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  // Lógica para o mapa
  useEffect(() => {
    const initMap = () => {
      const defaultLocation = { lat: -30.0277, lng: -51.2287 };
      const mapCenter =
        results.length > 0
          ? { lat: results[0].latitude, lng: results[0].longitude }
          : defaultLocation;

      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: mapCenter,
      });

      results.forEach((car) => {
        new window.google.maps.Marker({
          position: { lat: car.latitude, lng: car.longitude },
          map: map,
          label: car.brand + ' ' + car.model + ' ' + car.manufactureYear,
        });
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=APIKEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.initMap = initMap;
    } else {
      initMap();
    }
  }, [results]);

  const handleApplyFilters = () => {
    reloadSearch();
  };

  const handleCarClick = (carId) => {
    navigate('/car-details', { state: { carId } });
  };

  return (
    <div>
      <NavigationBar />
      <SearchBar />

      <div className="main-container">
        <section id="results-container" className="results">
          {results.length > 0 ? (
            results.map((car, index) => (
              <div key={index} className="car" onClick={() => handleCarClick(car.id)}>
                <div className="car-image-card">
                  <img src={car.path || carImage1} alt={car.name || 'Carro'} />
                </div>
                <div className="car-details">
                  <h3>
                    {car.brand + ' ' + car.model + ' ' + car.manufactureYear || 'Nome do Carro'}
                  </h3>
                  <p className="car-price">
                    Valor da diária R$ {car.price.toFixed(2) || 'Preço'}
                  </p>
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
