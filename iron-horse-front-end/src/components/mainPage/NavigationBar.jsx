import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import './NavigationBar.css'

export default () =>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        console.log("Toggle menu");
        setIsMenuOpen(!isMenuOpen);
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
                        <li>Conta</li>
                        <li>Alugar</li>
                        <li>Anunciar</li>
                        <li>Termos de Uso</li>
                        <li>Política de Privacidade</li>
                        <li>Avisos Legais</li>
                        <li>Acessibilidade</li>
                        <li>Suporte</li>
                    </ul>
                </div>
            )}                
        </header>    
    );
}