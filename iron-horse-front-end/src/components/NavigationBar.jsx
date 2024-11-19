import { useState, navigate } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPopup from "../LoginPopup/LoginPopup";
import CreateAccount from "../Create-Account/CreateAccount";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import "./NavigationBar.css";
import CarRegister from "../CarRegister/CarRegister"

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

  const home = () => {
    navigate("/");
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
            onClick={home}
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

      {activePopup === "MoreInformation" && <CarRegister onClose={closePopup} />}
    </>
  );
};
