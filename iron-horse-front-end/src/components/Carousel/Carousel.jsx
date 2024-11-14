import React from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import "./Carousel.css"

export default () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,   
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
  };

  const images = [
    '/img/Hatch background1.jpg',
    '/img/Hatch background2.jpg',
    '/img/Hatch background3.jpg',
    '/img/Hatch background4.jpg'
  ]
    return (        
      <div className="main-carousel-container">
        <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img className='carousel-image' src={image} alt={`Slide ${index + 1}`} style={{height: '10%'}} />
          </div>
        ))}
        </Slider>
      </div>
    )
}

