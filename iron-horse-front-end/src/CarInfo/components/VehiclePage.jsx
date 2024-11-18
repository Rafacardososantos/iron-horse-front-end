import React from 'react';
import { Helmet } from 'react-helmet';

const VehiclePage = () => {
    return (
        <div className="vehicle-page">
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Detalhes do Veículo</title>
                <link rel="stylesheet" href="./assets/css/reset.css" />
                <link rel="stylesheet" href="./assets/css/styles.css" />
                <link rel="stylesheet" href="./assets/css/search.css" />
                <link rel="stylesheet" href="./assets/css/carousel.css" />
                <link rel="stylesheet" href="./assets/css/rental.css" />
                <link rel="stylesheet" href="./assets/css/specs_reviews.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            {/* Outros componentes, como VehicleSpecifications e Reviews */}
        </div>
    );
};

export default VehiclePage;
