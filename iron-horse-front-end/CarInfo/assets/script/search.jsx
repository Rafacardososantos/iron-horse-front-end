import React, { useState } from 'react';

const SearchForm = () => {
    // Estados para armazenar os valores dos campos
    const [location, setLocation] = useState('');
    const [pickupDateTime, setPickupDateTime] = useState('');
    const [returnDateTime, setReturnDateTime] = useState('');

    // Função para lidar com o envio de dados
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão

        // Valida se todos os campos foram preenchidos
        if (!location || !pickupDateTime || !returnDateTime) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simula o envio dos dados ao banco de dados
        const data = {
            location,
            pickupDateTime,
            returnDateTime
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="location">Localização:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="pickup-datetime1">Data e hora de retirada:</label>
                <input
                    type="datetime-local"
                    id="pickup-datetime1"
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="pickup-datetime2">Data e hora de devolução:</label>
                <input
                    type="datetime-local"
                    id="pickup-datetime2"
                    value={returnDateTime}
                    onChange={(e) => setReturnDateTime(e.target.value)}
                    required
                />
            </div>

            <button type="submit" id="search-button">Pesquisar</button>
        </form>
    );
};

export default SearchForm;
