import React from "react";
import "./assets/css/reset.css";
import "./assets/css/styles.css";
import "./assets/css/search.css";
import "./assets/css/carousel.css";
import "./assets/css/rental.css";
import "./assets/css/specs_reviews.css";
import VehiclePage from "./components/VehiclePage";
import Header from "./components/Header";
import SearchSection from "./assets/script/search";
import Carousel from "./assets/script/carousel";
import Rental from "./assets/script/rental";
import VehicleSpecifications from "./assets/script/specs_reviews"

const CarInfo = () => {
    return (
        <div className="CarInfo">
            <VehiclePage />
            <Header />
            <body>
                <SearchSection />
                <Carousel />
                <section class="car-information">
                    <Rental />
                    <VehicleSpecifications />
                </section>
            </body>
        </div>
    );
};

export default CarInfo;
