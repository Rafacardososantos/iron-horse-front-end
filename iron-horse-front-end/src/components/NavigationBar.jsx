import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from '../LoginPopup/LoginPopup';
import CarRegister from "../CarRegister/CarRegister";
import './NavigationBar.css'

export default () =>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return(      
        <header>
            <div className="logo-img">
                <img className="user-profile-img" src="/img/Logo_UVIO_contrario.png" alt="Logo UVIO" />
            </div>

            <div className="user-img" onClick={toggleMenu}>
                <img className="user-profile-img" src="/img/Perfil-Usuario.png" alt="Image do usuário" />
            </div>
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); openPopup(); toggleMenu(); }}>Conta</a></li>
                        <li>Alugar</li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); openPopup(); }}></a>Anunciar</li>
                        <li>Termos de Uso</li>
                        <li>Política de Privacidade</li>
                        <li>Avisos Legais</li>
                        <li>Acessibilidade</li>
                        <li>Suporte</li>
                    </ul>
                </div>
            )}
            {isPopupOpen && (
                <LoginPopup onClose={closePopup}/>
                
            )}
            {isPopupOpen && (
                <CarRegister onClose={closePopup}/>
            )}                  
        </header>    
    );
}