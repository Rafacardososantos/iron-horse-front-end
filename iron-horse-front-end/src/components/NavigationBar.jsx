import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css'

export default () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openPopup = (popupType) => {
    setActivePopup(popupType);
    setIsMenuOpen(false);
  };

  const closePopup = () => {
    setActivePopup(null);
  };



  return (
    <>
      <header>
        <div className="logo-img">
          <img
            className="user-profile-img"
            src="/img/Logo_UVIO_contrario.png"
            alt="Logo UVIO"
          />
        </div>

        <div className="user-img" onClick={toggleMenu}>
          <img
            className="user-profile-img"
            src="/img/Perfil-Usuario.png"
            alt="Image do usuário"
          />
        </div>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openPopup("login");
                    toggleMenu();
                  }}
                >
                  Conta
                </a>
              </li>
              <li>Alugar</li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openPopup("MoreInformation");
                    toggleMenu();
                  }}
                >
                  Anunciar
                </a>
              </li>
              <li>Termos de Uso</li>
              <li>Política de Privacidade</li>
              <li>Avisos Legais</li>
              <li>Acessibilidade</li>
              <li>Suporte</li>
            </ul>
          </div>
        )}
      </header>

      {activePopup === "login" && (
        <LoginPopup
          onClose={closePopup}
          openSignUp={() => openPopup("signUp")}
          openForgotPassword={() => openPopup("forgotPassword")}
        />
      )}

      {activePopup === "signUp" && <CreateAccount onClose={closePopup} />}

      {activePopup === "forgotPassword" && <ForgotPassword onClose={closePopup} />}

      {activePopup === "MoreInformation" && (
        <>
          <MoreInformation onClose={closePopup} />
        </>
      )}
    </>
  );
};
