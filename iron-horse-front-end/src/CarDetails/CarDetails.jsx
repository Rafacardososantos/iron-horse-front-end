import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import styles from './CarDetails.module.css';


const CarDetails = ({ carId }) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const calculatePrice = (carPrice) => {
        if (pickupDate && returnDate && pickupTime && returnTime) {

            const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
            const returnDateTime = new Date(`${returnDate}T${returnTime}`);

            if (returnDateTime > pickupDateTime) {
                const differenceInTime = returnDateTime - pickupDateTime;
                const differenceInHours = differenceInTime / (1000 * 3600);
                const differenceInDays = differenceInHours / 24;

                const newTotalPrice = differenceInDays * carPrice;
                setTotalPrice(newTotalPrice);
            } else {
                alert('A data de devolução deve ser maior que a de retirada!');
            }
        }
    };

    const handlePickupDateChange = (e) => {
        setPickupDate(e.target.value);
        if (car && car.price) {
            calculatePrice(car.price);
        }
    };

    const handlePickupTimeChange = (e) => {
        setPickupTime(e.target.value);
        if (car && car.price) {
            calculatePrice(car.price);
        }
    };

    const handleReturnDateChange = (e) => {
        setReturnDate(e.target.value);
        if (car && car.price) {
            calculatePrice(car.price);
        }
    };

    const handleReturnTimeChange = (e) => {
        setReturnTime(e.target.value);
        if (car && car.price) {
            calculatePrice(car.price);
        }
    };

    const formatDate = (dateString) => {
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
        if (pickupDate && returnDate && pickupTime && returnTime) {
            calculatePrice(car.price);
        }
    }, [pickupDate, pickupTime, returnDate, returnTime])

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
                if (data.price) {
                    calculatePrice(data.price);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do carro:', error);
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [carId]);


    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!car) {
        return <div>Erro ao carregar os detalhes do carro.</div>;
    }

    return (
        <div className={styles['car-details']}>
            {/* Car Image and Header Section */}
            <div className={styles['car-image']}>
                <img
                    src={car.car.image || './img/2021 dodge-charger-rt.jpg'}
                    alt={`${car.car.brand} ${car.car.model}`}
                />
            </div>
            <h2>{car.car.brand} {car.car.model} {car.car.manufactureYear}</h2>
            <div className={styles['car-two-columns']}>
                <div className={styles['car-header']}>
                    

                    <p className={styles['car-rating']}>
                        <strong>Avaliação:</strong>
                        {car.car.reviews && car.car.reviews.length ?
                            (car.car.reviews.reduce((acc, review) => acc + review.rate, 0) / car.car.reviews.length).toFixed(1) :
                            'Sem avaliações'} ({car.car.reviews ? car.car.reviews.length : 0}
                        <span className={styles['estrela-roxa']}>★</span> viagens)
                    </p>

                    {/* Car Info Section */}
                    <div className={styles['car-info']}>
                        <div className={styles['car-info-item']}>
                            <p className={styles['fuel-info']}>
                                <img src="../img/posto-de-gasolina.png" alt="combustível" className={styles['imagem-tanque']} />
                                <strong>{car.car.carInfo.fuelType}</strong>
                            </p>
                        </div>
                        <div className={styles['car-info-item']}>
                            <p className={styles['door-info']}>
                                <img src="../img/porta_carro_inverso.png" alt="porta" className={styles['imagem-porta']} />
                                <strong>{car.car.carInfo.numDoors} Portas</strong>
                            </p>
                        </div>
                    </div>

                    <div className={styles['seat-info']}>
                        <img src="../img/assento-de-carro-inverso.png" alt="assentos" className={styles['imagem-assento']} />
                        <strong>{car.car.carInfo.numSeats} Assentos</strong>
                    </div>

                    {/* Car Description Section */}
                    <div className={styles['car-description']}>
                        <h3>Descrição do Proprietário</h3>
                        <p>{car.description}</p>
                    </div>
                </div>

                {/* Rent Section */}
                <div className={styles['car-rent']}>
                    <div className={styles['select-rent']}>
                        <div className={styles['car-details-text']}>
                            <h2><strong>Preço:</strong> R$ {car.price.toFixed(2)} /D</h2>
                            <hr />
                        </div>

                        {/* Date and Time Input Fields */}
                        <div className={styles['form-field']}>
                            <label htmlFor="pickup-date">Retirada:</label>
                            <h3>Retirada: </h3>
                            <div className={styles['datetime-container']}>
                                <input
                                    type="date"
                                    id="pickup-date"
                                    name="pickup-date"
                                    value={pickupDate}
                                    onChange={handlePickupDateChange}
                                    className={styles['datetime-input']}
                                />
                                <input
                                    type="time"
                                    id="pickup-time"
                                    name="pickup-time"
                                    value={pickupTime}
                                    onChange={handlePickupTimeChange}
                                    className={styles['datetime-input']}
                                />
                            </div>
                        </div>

                        <div className={styles['form-field']}>
                            <label htmlFor="return-date">Devolução:</label>
                            <h3>Devolução: </h3>
                            <div className={styles['datetime-container']}>
                                <input
                                    type="date"
                                    id="return-date"
                                    name="return-date"
                                    value={returnDate}
                                    onChange={handleReturnDateChange}
                                    className={styles['datetime-input']}
                                />
                                <input
                                    type="time"
                                    id="return-time"
                                    name="return-time"
                                    value={returnTime}
                                    onChange={handleReturnTimeChange}
                                    className={styles['datetime-input']}
                                />
                            </div>
                        </div>

                        <div className={styles['form-field']}>
                            <label htmlFor="location">Local:</label>
                            <h3>Local de Retirada/Devolução: </h3>
                            <select
                                id="location"
                                name="location"
                                value={car.car.location || ''}
                                className={styles['select-location']}
                            >
                                <option value="">Selecione o local</option>
                                <option value="Local 1">Local 1</option>
                                <option value="Local 2">Local 2</option>
                                <option value="Local 3">Local 3</option>
                            </select>
                        </div>

                        <h2><strong>Preço:</strong> R$ {totalPrice.toFixed(2)}</h2>
                        <button className={styles['btn-continue']}>CONTINUAR</button>
                    </div>
                </div>
            </div>


            {/* Car Specifications Section */}
            <h3 className={styles['car-specs-title']}>Especificações</h3>
            <div className={styles['car-specs']}>
            
                <ul className={styles['specs-list']}>
                    {[
                        { label: 'Transmissão', value: car.car.carInfo.transmission },
                        { label: 'Direção', value: car.car.carInfo.directionType },
                        { label: 'Motor', value: car.car.carInfo.cylinderDisplacement },
                        { label: 'Porta Malas', value: car.car.carInfo.trunkCapacity },
                        { label: 'Farol', value: car.car.carInfo.headlightBulb },
                        { label: 'Quilometragem', value: car.car.carInfo.mileage },
                        { label: 'Cor', value: car.car.carInfo.color }
                    ].map((spec, index) => (
                        <li key={index}>
                            <div className={styles['feature-item']}>
                                <span className={styles['dot']}></span>
                                <strong>{spec.label}</strong> {spec.value}
                            </div>
                        </li>
                    ))}

                    {/* Additional Car Features */}
                    {car.car.carInfo.carFeaturesUpdateDto && (
                        <>
                            {car.car.carInfo.carFeaturesUpdateDto.insulfilm && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Insufilm</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.airConditioner && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Ar Condicionado</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.multimedia && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Multimídia</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.electricWindowsAndLocks && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Vidros Elétricos</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.triangle && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Triângulo</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.jack && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Macaco</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.alarm && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Alarme</strong></div>
                                </li>
                            )}
                            {car.car.carInfo.carFeaturesUpdateDto.spareTire && (
                                <li>
                                    <div className={styles['feature-item']}><span className={styles['dot']}></span><strong>Estepe</strong></div>
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>

            <div className={styles['car-reviews']}>
                <h3>Avaliações</h3>
                <ul>
                    {car.car.reviews.map((review, index) => (
                        <li key={index} className={styles['review-item']}>
                            <div className={styles['review-header']}>
                                <img
                                    src="./img/Perfil-Usuario.png"
                                    alt="Avatar"
                                    className={styles['review-avatar']}
                                />
                                <div className={styles['review-content']}>
                                    <div className={styles['review-rating']}>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            i < review.rate ?
                                                <span key={i} className={styles['star full']}>★</span> :
                                                <span key={i} className={styles['star empty']}>☆</span>
                                        ))}
                                    </div>
                                    <p><strong>Prós:</strong> {review.pros}</p>
                                    <p><strong>Contras:</strong> {review.cons}</p>
                                    <p><strong>Criado em:</strong> {formatDate(review.created_at)}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );
};

export default CarDetails;
