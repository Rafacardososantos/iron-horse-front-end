import React from 'react';

// Componente de Especificações do Veículo
const VehicleSpecifications = () => {
    // Dados de especificações do veículo
    const vehicleSpecificationsData = [
        "Transmissão 8 marchas",
        "Direção Elétrica",
        "Motor 5.7",
        "Câmbio Automático",
        "Porta-malas 455L",
        "Farol LED",
        "Isulfim",
        "Multimídia",
        "Ar-condicionado",
        "Vidros e Travas Elétricas",
        "Alarme",
        "Triângulo",
        "Macaco",
        "Chave de Roda",
        "Estepe",
        "Extintor de Incêndio"
    ];

    return (
        <div className="vehicle-specifications">
            <ul>
                {vehicleSpecificationsData.map((spec, index) => (
                    <li key={index}>{spec}</li>
                ))}
            </ul>
        </div>
    );
};

// Componente de Avaliações
const Reviews = () => {
    // Dados das avaliações
    const reviewsData = [
        { image: "./assets/icons/pessoa1.png", text: "Foi uma experiência surreal, poder desfrutar de um muscle car. Conferir a potência do motor V8 pessoalmente não têm preço!", rating: 5 },
        { image: "./assets/icons/pessoa2.png", text: "Meu marido amou poder ter a experiência e a oportunidade de estar atrás do volante de um Dodge Charger R/T. Era um sonho dele, foi uma surpresa para o aniversário dele!", rating: 4 },
        { image: "./assets/icons/pessoa3.png", text: "Veloz e com muita potência, além de se tratar de um muscle car clássico atualizado! No entanto não me satisfez quanto ao conforto esperado.", rating: 3 },
        { image: "./assets/icons/pessoa4.png", text: "Uma experiência inesquecível, com muita adrenalina! Confortável e estiloso, com um desempenho fantástico.", rating: 5 },
        { image: "./assets/icons/pessoa5.png", text: "Definitivamente um carro para quem ama velocidade! O carro é incrível, mas o atendimento poderia ser melhor.", rating: 4 },
    ];

    const maxTextLength = 200;

    // Função para formatar texto com limite de caracteres
    const formatText = (text) => {
        if (text.length > maxTextLength) {
            return text.slice(0, maxTextLength) + '...';
        } else {
            return text.padEnd(maxTextLength, 'ㅤ');
        }
    };

    return (
        <div className="reviews">
            {reviewsData.slice(0, 5).map((review, index) => (
                <div key={index} className="review">
                    <img src={review.image} alt={`Usuário ${index + 1}`} id="user" />
                    <div className="review-content">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={i < review.rating ? 'fas fa-star' : 'far fa-star'}></i>
                            ))}
                        </div>
                        <p>{formatText(review.text)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Componente principal
const VehiclePage = () => {
    return (
        <div className="vehicle-page">
            <h1>Detalhes do Veículo</h1>
            <VehicleSpecifications />
            <Reviews />
        </div>
    );
};

export default VehiclePage;
