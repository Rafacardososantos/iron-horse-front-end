import React from 'react';
import "../css/reset.css";
import "../css/specs_reviews.css";
import person1 from "../icons/pessoa1.png";
import person2 from "../icons/pessoa2.png";
import person3 from "../icons/pessoa3.png";
import person4 from "../icons/pessoa4.png";
import person5 from "../icons/pessoa5.png";

// Componente de Especificações do Veículo
const VehicleSpecifications = ({car}) => {

    const translateKeyToPortuguese = (key) => {
        const translations = {
          insulfilm: "Insufilm",
          tagPike: "Tag Pike",
          antiTheftSecret: "Antifurto Secreto",
          multimedia: "Multimídia",
          airConditioner: "Ar Condicionado",
          electricWindowsAndLocks: "Vidros Elétricos e Travas",
          triangle: "Triângulo",
          jack: "Macaco",
          wheelWrench: "Chave de Roda",
          spareTire: "Estepe",
          fireExtinguisher: "Extintor de Incêndio",
          alarm: "Alarme",
          smokersAccepted: "Fumantes Permitidos",
          tagActivated: "Tag Ativada",
          isFinesBelongToTheOffender: "Multas São de Responsabilidade do Infrator",
          isDocsUptoDate: "Documentos em Dia",
          isVeicleModified: "Veículo Modificado",
          isTrueInformation: "Informações Verídicas"
        };
      
        return translations[key] || key.replace(/([A-Z])/g, ' $1').toUpperCase();
      };

    return (
        <div className="vehicle-specifications">
<ul>
  {Object.entries(car.car.carInfo.carFeaturesUpdateDto)
    .filter(([key, value]) => value === true)  // Filtra apenas as entradas com valor true
    .map(([key]) => (
      <li key={key}>
        <strong>{translateKeyToPortuguese(key)}</strong>
      </li>
    ))}
</ul>
        </div>
    );
};

// Componente de Avaliações
const Reviews = ({car}) => {
 

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
            {car.car.reviews.slice(0, 5).map((review, index) => (
                <div key={index} className="review">
                    <img src='./img/Perfil-Usuario.png' alt={`Usuário ${index + 1}`} id="user" />
                    <div className="review-content">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={i < review.rate ? 'fas fa-star' : 'far fa-star'}></i>
                            ))}
                        </div>
                        <p>Prós: {formatText(review.pros)}</p>
                        <p>Cons: {formatText(review.cons)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Componente principal
const VehiclePage = ({car}) => {
    return (
        <section className="car-specs-reviews">
            <VehicleSpecifications car={car} />
            <Reviews car={car} />
        </section>
    );
};

export default VehiclePage;
