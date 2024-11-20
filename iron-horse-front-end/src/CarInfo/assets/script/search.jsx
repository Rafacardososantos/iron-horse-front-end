import React, { useState } from 'react';
import "../css/reset.css";
import "../css/search.css";

const SearchSection = () => {
    // Estados para armazenar os valores dos campos
    const [location, setLocation] = useState('');
    const [pickupDateTime, setPickupDateTime] = useState('');
    const [returnDateTime, setReturnDateTime] = useState('');


    // Função para formatar a data no formato 'YYYY-MM-DD HH:MM'
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então soma 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Retorna o formato 'YYYY-MM-DD HH:MM:SS'
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Função para lidar com o envio de dados
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão

        // Valida se todos os campos foram preenchidos
        if (!location || !pickupDateTime || !returnDateTime) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Formata as datas sem o 'T'
        const formattedPickupDate = formatDateTime(pickupDateTime);
        const formattedReturnDate = formatDateTime(returnDateTime);

        // Simula o envio dos dados ao banco de dados
        const data = {
            location,
            pickupDateTime: formattedPickupDate,
            returnDateTime: formattedReturnDate
        };

        console.log('Dados enviados ao banco:', data);

        // Exemplo de como enviar os dados via fetch (substitua a URL pela URL real da API)
        /*
        fetch("https://sua-api.com/endpoint", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do banco de dados:", data);
        })
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
        });
        */
    };

    return (
        <section className="search-section">
            <form onSubmit={handleSubmit}>
                <div className="search-fields">
                    <dl>
                        <dt style={{ marginLeft: "5%" }}>Lista</dt>
                        <dt>
                            <input
                                className="base-local"
                                type="text"
                                placeholder="Localização"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </dt>
                    </dl>

                    <div className="date-time1">
                        <dl>
                            <dt style={{ marginLeft: "10%" }}>Retirada</dt>
                            <dt>
                                <input
                                    className="base-retirada"
                                    type="datetime-local"
                                    id="pickup-datetime1"
                                    value={pickupDateTime}
                                    onChange={(e) => setPickupDateTime(e.target.value)}
                                    required
                                />
                            </dt>
                        </dl>
                    </div>

                    <div className="date-time2">
                        <dl>
                            <dt style={{ marginLeft: "10%" }}>Devolução</dt>
                            <dt>
                                <input
                                    className="base-devolucao"
                                    type="datetime-local"
                                    id="pickup-datetime2"
                                    value={returnDateTime}
                                    onChange={(e) => setReturnDateTime(e.target.value)}
                                    required
                                />
                            </dt>
                        </dl>
                    </div>

                    <button type="submit" id="search-button">Pesquisar</button>
                </div>
            </form>
        </section>
    );
};

export default SearchSection;
