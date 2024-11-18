import React, { useState, useEffect } from 'react';
import "../css/reset.css";
import "../css/rental.css";
import gaspump from '../icons/posto-de-gasolina.png';
import doorclosed from "../icons/porta_carro_inverso.png";
import usersseat from "../icons/assento-de-carro-inverso.png";
import ownerPhoto from "../images/oculos-de-sol-rayban-aviador-preto-polarizado-cristal.jpg";

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
        ownerPhoto: ownerPhoto,
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

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então soma 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleBooking = () => {
        const formattedStartDatetime = formatDateTime(startDatetime);
        const formattedEndDatetime = formatDateTime(endDatetime);
        const selectedLocation = locations.find(loc => loc.id === Number(location));
        const locationName = selectedLocation ? selectedLocation.name : '';

        const bookingData = {
            vehiclePrice,
            startDatetime: formattedStartDatetime,
            endDatetime: formattedEndDatetime,
            location: locationName,
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
        <section className="car-rental">
            <div className="vehicle-info">
                <h2>{vehicleData.vehicleName}</h2>
                <div className="rating">
                    <span id="rate">{vehicleData.rating.toFixed(1)}</span>
                    <i style={{ color: '#5A2879' }} className="fas fa-star" id="star"></i>
                    <span id="trips">{`${vehicleData.trips} ${vehicleData.trips > 1 ? 'viagens' : 'viagem'}`}</span>
                </div>

                <div className="vehicle-specs">
                    <p><i className="gas-pump"><img src={gaspump} alt="Gasolina" /></i>{vehicleData.fuelType}</p>
                    <p><i className="door-closed"><img src={doorclosed} alt="Portas" /></i>{vehicleData.doors} portas</p>
                    <p><i className="users-seat"><img src={usersseat} alt="Assentos" /></i>{vehicleData.seats} assentos</p>
                </div>

                <div className="owner-info">
                    <h4>PROPRIETÁRIO</h4>
                    <br />
                    <div className="position">
                        <img className="owner-photo" src={vehicleData.ownerPhoto} alt="Proprietário" />
                        <p id="name">{vehicleData.ownerName}</p>
                    </div>
                    <br />
                    <h4>DESCRIÇÃO</h4>
                    <br />
                    <p id="justify-first-line">{vehicleData.description}</p>
                </div>
            </div>

            <div className="booking-info">
                <h2 className="money">
                    <u>
                        <center>{formatMoney(vehiclePrice)}</center>
                    </u>
                </h2>

                <div className="trip-timing">
                    <label style={{ color: '#B350F1', fontSize: '2ch' }}>Início viagem</label>
                    <br />
                    <input
                        className="base-viagem"
                        type="datetime-local"
                        id="start-datetime"
                        value={startDatetime}
                        onChange={(e) => setStartDatetime(e.target.value)}
                    />
                </div>

                <div className="trip-timing2">
                    <label style={{ color: '#B350F1', fontSize: '2ch' }}>Fim viagem</label>
                    <br />
                    <input
                        className="base-viagem"
                        type="datetime-local"
                        id="end-datetime"
                        value={endDatetime}
                        onChange={(e) => setEndDatetime(e.target.value)}
                    />
                </div>

                <div className="pickup-location">
                    <label>Local de Retirada & Devolução do Veículo</label>
                    <br />
                    <select
                        className="base-viagem"
                        id="location-select"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                </div>

                <p className="trip-duration">{tripDuration}</p>
                <br />
                <button
                    id="continue-button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleBooking();
                    }}
                >
                    Continuar
                </button>

                <div className="cancel">
                    <p className="free-cancel" style={{ fontWeight: 'bold' }}>Cancelamento Grátis</p>
                    <br />
                    <p className="refund-info">{refundInfo}</p>
                </div>
            </div>
        </section>
    );
};

export default Rental;
