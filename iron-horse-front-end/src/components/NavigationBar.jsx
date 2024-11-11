/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPopup from "../LoginPopup/LoginPopup";
import CreateAccount from "../Create-Account/CreateAccount";
import "./NavigationBar.css";
import MoreInformation from "../CarRegister-MoreInformation/MoreInformation";

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

  const openSignUp = () => {
    setActivePopup("signUp");
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
        />
      )}

      {activePopup === "signUp" && <CreateAccount onClose={closePopup} />}

      {activePopup === "MoreInformation" && (
        <>
          <MoreInformation onClose={closePopup} />
        </>
      )}
    </>
  );
};
