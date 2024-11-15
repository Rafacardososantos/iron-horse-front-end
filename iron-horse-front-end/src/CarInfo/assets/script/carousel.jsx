import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Importar o CSS do Swiper

const Carousel = () => {
    // Dados simulados, como se fossem retornados de um banco de dados
    const imageUrls = [
        "./assets/images/2021 dodge-charger-rt.jpg",
        "./assets/images/2021 dodge-charger-rt_frente.jpeg",
        "./assets/images/2021 dodge-charger-rt_lateral_direita.jpeg.jpg",
        "./assets/images/2021 dodge-charger-rt_lateral_esquerda.jpeg",
        "./assets/images/2021 dodge-charger-rt_traseira.jpeg"
    ];

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Inicializa o Swiper após o componente ser montado
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 540,
            cssMode: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        setSwiperInstance(swiper);

        // Cleanup do Swiper se necessário
        return () => swiper && swiper.destroy();
    }, []);

    const handleLikeClick = () => {
        setLiked(prevLiked => !prevLiked);

        // Enviar a variável liked para o banco de dados via API ou Ajax
        console.log('Curtido:', !liked);

        fetch('/api/save-like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ liked: !liked })
        })
            .then(response => response.json())
            .then(data => console.log('Resposta do servidor:', data))
            .catch(error => console.error('Erro ao salvar no banco:', error));
    };

    return (
        <div className="carousel">
            {/* Swiper Container */}
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {imageUrls.map((url, index) => (
                        <div className="swiper-slide" key={index}>
                            <img src={url} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Controles de navegação */}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>

            {/* Botão de Curtir */}
            <button 
                className={`like-button ${liked ? 'liked' : ''}`} 
                onClick={handleLikeClick} 
                id="like-button"
            >
                {liked ? 'Descurtir' : 'Curtir'}
            </button>
        </div>
    );
};

export default Carousel;
