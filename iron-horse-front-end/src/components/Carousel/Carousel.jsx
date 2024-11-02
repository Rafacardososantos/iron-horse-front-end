import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Container  from 'react-bootstrap/Container';
import "./Carousel.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,   
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    '/img/Hatch background1.jpg',
    '/img/Hatch background2.jpg',
    '/img/Hatch background3.jpg',
    '/img/Hatch background4.jpg'
  ]
    return (        
      <div>
        <Slider {...settings}>
        {images.map((image, index) => (
          <div className='carousel-container' key={index}>
            <img className='carousel-image' src={image} alt={`Slide ${index + 1}`}  />
          </div>
        ))}
        </Slider>
      </div>
    )
}

