import React, { useState, useEffect } from 'react';
import "../css/reset.css";
import "../css/rental.css";
import { useLocation, useNavigate } from 'react-router-dom';
import gaspump from '../icons/posto-de-gasolina.png';
import doorclosed from "../icons/porta_carro_inverso.png";
import usersseat from "../icons/assento-de-carro-inverso.png";
import ownerPhoto from "../images/oculos-de-sol-rayban-aviador-preto-polarizado-cristal.jpg";

const Rental = ({car}) => {
    const { state } = useLocation();
    const carId = state?.carId;
    console.log(carId);
    const [vehiclePrice, setVehiclePrice] = useState(1675.00); // Preço do veículo
    const [startDatetime, setStartDatetime] = useState('');
    const [loading, setLoading] = useState(true);
    const [endDatetime, setEndDatetime] = useState('');
    const [tripDuration, setTripDuration] = useState('');
    const [refundInfo, setRefundInfo] = useState('');
    const [location, setLocation] = useState('');

    //SLA
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [imagePaths, setImagePaths] = useState([]);

    const handleContinue = async (e) => {
        e.preventDefault();
        const formattedPickupDate = formatDate(pickupDate);
        const formattedReturnDate = formatDate(returnDate);
        if (isFormValid()) {
            setIsButtonClicked(true);
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token não encontrado');
                    return;
                }

                const headers = {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                };

                const response = await fetch(`http://localhost:8080/v1/rentals/${carId}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        expectedEndDate: formattedReturnDate,
                        startDate: formattedPickupDate
                    }),
                });

                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                }

            } catch (error) {
                console.error('Erro ao fazer aluguel:', error);
                setLoading(false);
            }
            console.log('Formulário válido, prosseguindo...');
        } else {
            console.log('Por favor, preencha ambos os campos de data e hora.');
        }

    };

    const formatMoney = (amount) => {
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (date) => {
        if (!date) return '';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleString('pt-BR', options).replace(',', '');
    };

    const formatDateDetails = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(`${year}-${month}-${day}`);

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        return new Intl.DateTimeFormat('pt-BR', options).format(date);
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

    const isFormValid = () => {
        return pickupDate && returnDate;
    };

    return (
        <section className="car-rental">
            <div className="vehicle-info">
            <h2>{car.car.brand} {car.car.model} {car.car.manufactureYear}</h2>
                <div className="rating">
                {car.reviews && car.reviews.length ?
                            (car.car.reviews.reduce((acc, review) => acc + review.rate, 0) / car.car.reviews.length).toFixed(1) :
                            'Sem avaliações'} ({car.reviews ? car.reviews.length : 0}
                        <span id="star">★</span> viagens)
                </div>

                <div className="vehicle-specs">
                    <p><i className="gas-pump"><img src={gaspump} alt="Gasolina" /></i>{car.car.carInfo.fuelType}</p>
                    <p><i className="door-closed"><img src={doorclosed} alt="Portas" /></i>{car.car.carInfo.numDoors} portas</p>
                    <p><i className="users-seat"><img src={usersseat} alt="Assentos" /></i>{car.car.carInfo.numSeats} assentos</p>
                </div>

                <div className="owner-info">
                    <h4>DESCRIÇÃO</h4>
                    <br />
                    <p id="justify-first-line">{car.description}</p>
                </div>
            </div>

            <div className="booking-info">
                <h2 className="money">
                    <u>
                        <center>{formatMoney(car.price)}</center>
                    </u>
                </h2>

                <div className="trip-timing">
                    <label style={{ color: '#B350F1', fontSize: '2ch' }}>Início viagem</label>
                    <br />
                    <input
                        className="base-viagem"
                        type="datetime-local"
                        id="start-datetime"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                    />
                </div>

                <div className="trip-timing2">
                    <label style={{ color: '#B350F1', fontSize: '2ch' }}>Fim viagem</label>
                    <br />
                    <input
                        className="base-viagem"
                        type="datetime-local"
                        id="end-datetime"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>

                <p className="trip-duration">{tripDuration}</p>
                <br />
                <button
                        id="continue-button"
                        onClick={handleContinue}
                        disabled={isButtonClicked || !isFormValid()} 
                    >
                        {isButtonClicked ? 'Reserva em andamento...' : 'ALUGAR'}
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
