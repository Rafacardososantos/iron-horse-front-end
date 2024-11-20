
import "./assets/css/reset.css";
import "./assets/css/styles.css";
import "./assets/css/search.css";
import "./assets/css/carousel.css";
import "./assets/css/rental.css";
import "./assets/css/specs_reviews.css";
import VehiclePage from "./components/VehiclePage";
import Carousel from "./assets/script/carousel";
import Rental from "./assets/script/rental";
import VehicleSpecifications from "./assets/script/specs_reviews"
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from "../components/SearchBar/SearchBar";
import NavigationBar from "../components/NavigationBar";

const CarInfo = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const carId = state?.carId;

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);


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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const fetchCarDetails = async () => {
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

                const response = await fetch(`http://localhost:8080/v1/car-overviews/${carId}`, {
                    method: 'GET',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar os detalhes do carro');
                }

                const data = await response.json();
                console.log('Resposta da API:', data);
                setCar(data);
                setLoading(false);             
            } catch (error) {
                console.error('Erro ao buscar detalhes do carro:', error);
                setLoading(false);
            }
        };

       

        fetchCarDetails();
    }, [carId]);
    
      const customSettings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: false,
        draggable: true,
      };

    const isFormValid = () => {
        return pickupDate && returnDate;
    };

    if (loading) {
        return <div>Carregando...</div>;
    };

    if (!car) {
        return <div>Erro ao carregar os detalhes do carro.</div>;
    };

    return (
        <div className="CarInfo">
            <VehiclePage />
            <NavigationBar />
            <body>
                <SearchBar/>
                <Carousel images={car.car.images} />
                <section class="car-information">
                    <Rental car={car} />
                    <VehicleSpecifications car={car} />
                </section>
            </body>
        </div>
    );
};

export default CarInfo;
