import React, { useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import "./SearchBar.css";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/search", {
        params: {
          location,
          startDate,
          startTime,
          endDate,
          endTime,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao realizar a busca:", error);
    }
  };

  return (
    <div className="main-search-container">
      <Row className="gy-3 justify-content-center align-items-center">
        <Col xs={12} md={4} lg={4}>
          <div className="input-wrapper">
            <label>Local</label>
            <input
              className="local-input"
              type="text"
              placeholder="Localização"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </Col>

        <Col xs={12} md={4} lg={3}>
          <div className="input-wrapper">
            <label>Retirada</label>
            <div className="date-time-wrapper">
              <input
                id="start-date"
                className="date-input"
                type={startDate === "" ? "text" : "date"}
                placeholder="Data"
                value={startDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = startDate ? "date" : "text")}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                id="start-time"
                className="time-input"
                type={startTime === "" ? "text" : "time"}
                placeholder="Hora"
                value={startTime}
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = startTime ? "time" : "text")}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
        </Col>

        <Col xs={12} md={4} lg={3}>
          <div className="input-wrapper">
            <label>Devolução</label>
            <div className="date-time-wrapper">
              <input
                id="end-date"
                className="date-input"
                type={endDate === "" ? "text" : "date"}
                placeholder="Data"
                value={endDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = endDate ? "date" : "text")}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                id="end-time"
                className="time-input"
                type={endTime === "" ? "text" : "time"}
                placeholder="Hora"
                value={endTime}
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = endTime ? "time" : "text")}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </Col>

        <Col xs={12} md={4} lg={2}>
          <button className="search-button" onClick={handleSearch}>
            Pesquisar
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
