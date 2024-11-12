import React, {useState} from "react";
import {Row, Col} from 'react-bootstrap';
import "./SearchBar.css"

export default () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    return (
      <div className="search-container">          
        <div className="input-group-local">
          <label>Local</label> 
          <input className="local-input" type="text" placeholder="Localização" />
        </div>
             
        <div className="input-group">
          <label>Retirada</label> 
          <div className="datetime-container">
              <input
                  id="start-date"
                  className=""
                  type="datetime-local"
                  placeholder="Data"
                  // value={startDate}
                  // onFocus={(e) => (e.target.type = "date")}
                  // onBlur={(e) => (e.target.type = startDate ? "date" : "text")}
                  // onChange={(e) => setStartDate(e.target.value)}
              />
              {/* <input
                id=""
                className="time-input"
                type={startTime === "" ? "text" : "time"}
                placeholder="Hora"
                value={startTime}
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = startTime ? "time" : "text")}
                onChange={(e) => setStartTime(e.target.value)}
              /> */}
          </div>
        </div>
        
        <div className="input-group">
          <label>Devolução</label>
          <div className="datetime-container">
            <input
              id="end-date"
              className=""
              type="datetime-local"
              placeholder="Data"
              // value={endDate}
              // onFocus={(e) => (e.target.type = "date")}
              // onBlur={(e) => (e.target.type = endDate ? "date" : "text")}
              // onChange={(e) => setEndDate(e.target.value)}
            />
            {/* <input
            id="end-time"
            className=""
            type={endTime === "" ? "text" : "time"}
            placeholder="Hora"
            value={endTime}
            onFocus={(e) => (e.target.type = "time")}
            onBlur={(e) => (e.target.type = endTime ? "time" : "text")}
            onChange={(e) => setEndTime(e.target.value)}
          /> */}
          </div>
        </div>

        <div className="input-group">
          <button className="search-button">Pesquisar</button>
        </div>
        
   
      </div>
    )
}
