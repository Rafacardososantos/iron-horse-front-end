import React, { useState, useEffect } from 'react';

const Rental = () => {
    // Dados simulados do banco de dados
    const vehicleData = {
        vehicleName: "Dodge Charger R/T V8 2021",
        rating: 6.2,
        trips: 5,
        fuelType: "Gasolina",
        doors: 4,
        seats: 5,
        ownerName: "Jordam",
        ownerPhoto: "./assets/images/oculos-de-sol-rayban-aviador-preto-polarizado-cristal.jpg",
        description: "Olá, tenho um Dodge Charger R/T V8 que vai de 0 a 100 Km/h em 4,9 segundos. Meu muscle car conta com freios atualizados, suspensão esportiva ajustada, sistema de escapamento de alto desempenho."
    };

    const [vehiclePrice, setVehiclePrice] = useState(1675.00); // Preço do veículo
    const [startDatetime, setStartDatetime] = useState('');
    const [endDatetime, setEndDatetime] = useState('');
    const [tripDuration, setTripDuration] = useState('');
    const [refundInfo, setRefundInfo] = useState('');
    const [location, setLocation] = useState('');

    const locations = [
        { id: 1, name: "Cais do Porto - Largo do Trabalho, 46" },
        { id: 2, name: "Museu de Arte do Rio Grande do Sul – Praça da Alfândega" },
        { id: 3, name: "R. Sete de Setembro, 1028 - Centro Histórico" },
        { id: 4, name: "Av. Mauá, 1050 - Armazém A7 - Centro Histórico" }
    ];

    const formatMoney = (amount) => {
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const calculateDuration = () => {
        const startDate = new Date(startDatetime);
        const endDate = new Date(endDatetime);

        if (startDate && endDate && endDate > startDate) {
            const diff = new Date(endDate - startDate);
            const days = diff.getUTCDate() - 1;
            const hours = diff.getUTCHours();
            const minutes = diff.getUTCMinutes();
            const durationText = `${days} dias ${hours}h ${minutes} min`;
            setTripDuration(durationText);
        } else {
            setTripDuration("0 dias 0h 0 min");
        }
    };

    const formatRefundDate = () => {
        const startDate = new Date(startDatetime || Date.now());
        const refundDate = new Date(startDate);
        refundDate.setHours(refundDate.getHours() - 1);

        const day = refundDate.getDate();
        let month = refundDate.toLocaleString('pt-BR', { month: 'long' });
        month = month[0].toUpperCase() + month.slice(1);

        const hours = refundDate.getHours();
        const minutes = refundDate.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;

        const formattedDate = `Reembolso total antes de ${day} de ${month}, ${formattedHours}:${minutes} ${period}`;
        setRefundInfo(formattedDate);
    };

    const handleBooking = () => {
        const bookingData = {
            vehiclePrice,
            startDatetime,
            endDatetime,
            location,
            tripDuration,
            refundInfo
        };

        // Enviar bookingData para o banco de dados usando uma chamada de API (simulação)
        console.log("Enviando dados ao banco de dados:", bookingData);
    };

    useEffect(() => {
        formatRefundDate();
        calculateDuration();
    }, [startDatetime, endDatetime]);

    return (
        <div>
            <div className="vehicle-info">
                <h2>{vehicleData.vehicleName}</h2>
                <p>Avaliação: <span id="rate">{vehicleData.rating.toFixed(1)}</span></p>
                <p>{`${vehicleData.trips} ${vehicleData.trips > 1 ? 'viagens' : 'viagem'}`}</p>
                <div className="vehicle-specs">
                    <p>{vehicleData.fuelType}</p>
                    <p>{`${vehicleData.doors} portas`}</p>
                    <p>{`${vehicleData.seats} assentos`}</p>
                </div>
                <div className="owner-info">
                    <img className="owner-photo" src={vehicleData.ownerPhoto} alt="Foto do proprietário" />
                    <p id="name">{vehicleData.ownerName}</p>
                </div>
                <p id="justify-first-line">{vehicleData.description}</p>
            </div>

            <div className="booking-info">
                <p className="money">
                    <u>
                        <center>{formatMoney(vehiclePrice)}</center>
                    </u>
                </p>

                <div>
                    <label htmlFor="location-select">Localização:</label>
                    <select
                        id="location-select"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="start-datetime">Data de Início:</label>
                    <input
                        type="datetime-local"
                        id="start-datetime"
                        value={startDatetime}
                        onChange={(e) => setStartDatetime(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="end-datetime">Data de Término:</label>
                    <input
                        type="datetime-local"
                        id="end-datetime"
                        value={endDatetime}
                        onChange={(e) => setEndDatetime(e.target.value)}
                    />
                </div>

                <p className="trip-duration">{tripDuration}</p>
                <p className="refund-info">{refundInfo}</p>

                <button
                    id="continue-button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleBooking();
                    }}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Rental;
