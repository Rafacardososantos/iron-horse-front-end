import React from "react";
import "./assets/css/reset.css";
import "./assets/css/styles.css";
import "./assets/css/search.css";
import "./assets/css/carousel.css";
import "./assets/css/rental.css";
import "./assets/css/specs_reviews.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const App = () => {
    return (
        <div>
            {/* Header */}
            <header>
                <img src="./assets/icons/Logo_UVIO_contrario.png" alt="Logo Uvio" className="logo" />
                <img src="./assets/icons/Perfil-Usuario.png" alt="Usuário" className="user-icon" />
            </header>

            {/* Formulário de Pesquisa */}
            <section className="search-section">
                <div className="search-fields">
                    <dl>
                        <dt style={{ marginLeft: "5%" }}>Lista</dt>
                        <dt>
                            <input className="base-local" type="text" placeholder="Localização" id="location" />
                        </dt>
                    </dl>
                    <div className="date-time1">
                        <dl>
                            <dt style={{ marginLeft: "10%" }}>Retirada</dt>
                            <dt>
                                <input className="base-retirada" type="datetime-local" id="pickup-datetime1" />
                            </dt>
                        </dl>
                    </div>
                    <div className="date-time2">
                        <dl>
                            <dt style={{ marginLeft: "10%" }}>Devolução</dt>
                            <dt>
                                <input className="base-devolucao" type="datetime-local" id="pickup-datetime2" />
                            </dt>
                        </dl>
                    </div>
                    <button id="search-button">Pesquisar</button>
                </div>
            </section>

            {/* Detalhes do Veículo */}
            <section className="vehicle-photos">
                <div className="vehicle-image">
                    {/* Carrossel de Imagens */}
                    <Swiper navigation className="swiper-container">
                        <SwiperSlide>
                            <img alt="Slide 1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img alt="Slide 2" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img alt="Slide 3" />
                        </SwiperSlide>
                    </Swiper>
                    {/* Ícone de Curtir */}
                    <div className="like-icon-border">
                        <button className="like-icon" id="like-button">
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </section>
            {/* Outras seções seguem o mesmo padrão */}
        </div>
    );
};

export default App;
