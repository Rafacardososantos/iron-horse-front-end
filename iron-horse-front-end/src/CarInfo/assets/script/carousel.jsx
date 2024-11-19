import React, { useRef, useState, useEffect } from 'react';
import "../css/reset.css";
import "../css/carousel.css";
import image1 from "../images/2021 dodge-charger-rt.jpg";
import image2 from "../images/2021 dodge-charger-rt_frente.jpeg";
import image3 from "../images/2021 dodge-charger-rt_lateral_direita.jpeg.jpg";
import image4 from "../images/2021 dodge-charger-rt_lateral_esquerda.jpeg";
import image5 from "../images/2021 dodge-charger-rt_traseira.jpeg";
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Carousel = ({images}) => {
    const swiperContainerRef = useRef(null);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        // Inicializa o Swiper após o componente ser montado
        if (swiperContainerRef.current) {
            const swiperInstance = new Swiper(swiperContainerRef.current, {
                loop: true,
                slidesPerView: 1, 
                modules: [Navigation],
                centeredSlides: true,
                spaceBetween: 800,  // Reduz o espaço entre os slides
                initialSlide: 0,   // Inicia no primeiro slide
                infinity: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

            // Garantir que a navegação seja resetada ao inicializar
            swiperInstance.update(); // Atualiza a instância após o DOM ser montado

        }
    }, []); // Executa apenas uma vez, ao montar o componente

    return (
        <div className="vehicle-photos">
            <div className="vehicle-image">
                <div className="swiper-container" ref={swiperContainerRef}>
                    <div className="swiper-wrapper">
                        {images.map((image, index) => (
                            <div className="swiper-slide" key={index}>
                                <img className="car-image-imaginha" src={image.path} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
