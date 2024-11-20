import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPopup from "../LoginPopup/LoginPopup";
import CreateAccount from "../Create-Account/CreateAccount";
import "./NavigationBar.css";
import { useNavigate } from 'react-router-dom';
import CarRegister from "../CarRegister/CarRegister"
import ResetPassword from "../ResetPassword/resetPassword";

export default () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/'; 
  }

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
          alt="Imagem do usuário"
        />
      </div>
      {isMenuOpen && (
        <div className="dropdown-menu">
          {isLoggedIn ? (
            // Exibe "Anunciar" e "Logout" somente se o usuário estiver logado
            <>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openPopup("CarRegister");
                    toggleMenu();
                  }}
                >
                  Anunciar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    toggleMenu();
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            // Exibe "Sign In" e "Sign Up" somente se o usuário não estiver logado
            <>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openPopup("login");
                    toggleMenu();
                  }}
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openPopup("signUp");
                    toggleMenu();
                  }}
                >
                  Sign Up
                </a>
              </li>
            </>
          )}
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

    {activePopup === "signUp" && < CreateAccount onClose={closePopup} />}

    {activePopup === "forgotPassword" && <ResetPassword onClose={closePopup} />}

    {activePopup === "CarRegister" && <CarRegister onClose={closePopup} />}
  </>
  );
};
