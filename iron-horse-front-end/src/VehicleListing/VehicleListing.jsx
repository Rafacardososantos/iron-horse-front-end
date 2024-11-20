import './VehicleListing.css';
import carImage1 from '../../public/img/Hatch background1.jpg';
import SearchBar from '../components/SearchBar/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import api from '../utils/api';

const VehicleListing = () => {
  const { state } = useLocation();

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
  const navigate = useNavigate();

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
        },
      });

      setResults(response.content);
      setPage(1);
      setHasMore(response.number < response.totalPages - 1);
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
        },
      });

      if (response.content.length > 0) {
        setResults((prevResults) => [...prevResults, ...response.content]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.number < response.totalPages - 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais carros:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, city, startDate, endDate, page]);

  useEffect(() => {
    if (state?.results && state?.results.length > 0) {
      setResults(state.results);
      setPage(state.currentPage);
      setHasMore(state.currentPage < state.totalPages - 1);
    } else {
      reloadSearch();
    }
  }, [state?.results, state?.city, state?.startDate, state?.endDate]);

  const handleScroll = useCallback((event) => {
    const scrollContainer = event.target;
    const bottom =
      scrollContainer.scrollHeight === scrollContainer.scrollTop + scrollContainer.clientHeight;

    if (bottom && !loading && hasMore) {
      fetchNextPage();
    }
  }, [loading, hasMore, fetchNextPage]);

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

  const handleCarClick = (carId) => {
    navigate('/car-details', { state: { carId } });
  };
 
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
              <div key={index} className="car"  onClick={() => handleCarClick(car.id)}>
                <div className="car-image-card">
                  <img src={car.path || carImage1} alt={car.name || 'Carro'} />
                </div>
                <div className="car-details">   
                <h3>{car.brand + ' ' + car.model + ' ' + car.manufactureYear || 'Nome do Carro'}</h3>              
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