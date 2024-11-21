import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import styles from "../SearchBar/SearchBar.module.css"

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const formatDateTime = (date, time) => {
    if (!date) return null;
    const formattedTime = time || (date === startDate ? '00:00' : '23:59');
    return `${date}T${formattedTime}:00`;
  };

  const handleSearch = async () => {
    try {
      const formattedStartDateTime = formatDateTime(startDate, startTime);
      const formattedEndDateTime = formatDateTime(endDate, endTime);

      const response = await api.get('/cars/search', {
        params: {
          city,
          startDate: formattedStartDateTime,
          endDate: formattedEndDateTime,
          startTime,
          endTime,
          page,
          size,
        },
      });

      navigate('/vehicle-listing', { 
        state: {
          results: response.content,
          totalPages: response.totalPages,
          currentPage: response.number,
          city
        }
      });
    } catch (error) {
      console.error("Erro ao realizar a busca:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);

    setStartDate(today.toISOString().split('T')[0]);
    setStartTime('00:00'); // Hora inicial

    setEndDate(threeDaysLater.toISOString().split('T')[0]);
    setEndTime('23:59'); // Hora final
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
<div className={styles.mainSearchContainerSearch}>
    <Row className="gy-4 justify-content-center align-items-center">
        <Col xs={12} md={4} lg={4}>
            <div className={styles.inputWrapperSearch}>
                <label>Local</label>
                <input
                    className={styles.localInputSearch}
                    type="text"
                    placeholder="Localização"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </Col>

        <Col xs={12} md={4} lg={3}>
            <div className={styles.inputWrapperSearch}>
                <label>Retirada</label>
                <div className={styles.dateTimeWrapperSearchLeft}>
                    <input
                        id="start-date"
                        className={styles.dateInputSearch}
                        type="date"
                        placeholder="Data"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        id="start-time"
                        className={styles.timeInputSearch}
                        type="time"
                        placeholder="Hora"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
            </div>
        </Col>

        <Col xs={12} md={4} lg={3}>
            <div className={styles.inputWrapperSearch}>
                <label>Devolução</label>
                <div className={styles.dateTimeWrapperSearchRight}>
                    <input
                        id="end-date"
                        className={styles.dateInputSearch}
                        type="date"
                        placeholder="Data"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <input
                        id="end-time"
                        className={styles.timeInputSearch}
                        type="time"
                        placeholder="Hora"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
            </div>
        </Col>

        <Col xs={12} md={4} lg={2}>
            <button className={styles.searchButton} onClick={handleSearch}>
                Pesquisar
            </button>
        </Col>
    </Row>
</div>

  );
};

export default SearchBar;
