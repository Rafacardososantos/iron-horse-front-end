import React from "react";
import  "../assets/css/reset.css";
import "../assets/css/styles.css";
import logo from "../assets/icons/Logo_UVIO_contrario.png";
import userIcon from "../assets/icons/Perfil-Usuario.png";

const Header = () => (
    <header>
        <img src={logo} alt="Logo Uvio" className="logo" />
        <img src={userIcon} alt="Usuário" className="user-icon" />
    </header>
);

export default Header;