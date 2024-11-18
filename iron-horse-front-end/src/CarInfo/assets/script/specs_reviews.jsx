import React from 'react';
import "../css/reset.css";
import "../css/specs_reviews.css";
import person1 from "../icons/pessoa1.png";
import person2 from "../icons/pessoa2.png";
import person3 from "../icons/pessoa3.png";
import person4 from "../icons/pessoa4.png";
import person5 from "../icons/pessoa5.png";

// Componente de Especificações do Veículo
const VehicleSpecifications = () => {
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
    const reviewsData = [
        { image: person1, text: "Foi uma experiência surreal, poder desfrutar de um muscle car. Conferir a potência do motor V8 pessoalmente não têm preço!", rating: 5 },
        { image: person2, text: "Meu marido amou poder ter a experiência e a oportunidade de estar atrás do volante de um Dodge Charger R/T. Era um sonho dele, foi uma surpresa para o aniversário dele!", rating: 4 },
        { image: person3, text: "Veloz e com muita potência, além de se tratar de um muscle car clássico atualizado! No entanto não me satisfez quanto ao conforto esperado.", rating: 3 },
        { image: person4, text: "Uma experiência inesquecível, com muita adrenalina! Confortável e estiloso, com um desempenho fantástico.", rating: 5 },
        { image: person5, text: "Definitivamente um carro para quem ama velocidade! O carro é incrível, mas o atendimento poderia ser melhor.", rating: 4 },
    ];

    const maxTextLength = 200;

    const formatText = (text) => {
        if (text.length > maxTextLength) {
            return text.slice(0, maxTextLength) + '...';
        } else {
            return text.padEnd(maxTextLength, 'ㅤ');
        }
    };

    return (
        <div className="reviews">
            <h4>AVALIAÇÕES</h4>
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
        <section className="car-specs-reviews">
            <VehicleSpecifications />
            <Reviews />
        </section>
    );
};

export default VehiclePage;
