/* eslint-disable react/prop-types */
import { useState } from "react";
import "./LoginPopup.css";
import showPasswordIcon from "../img/Visualização_Permitida.png";
import hidePasswordIcon from "/img/Visualizar.png";
import googleLogo from "../img/Logotipo_Google.png";
import api from "../utils/api";

const LoginPopup = ({ onClose, openForgotPassword, openSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia os dados de login para o backend
      //const response = await fetch("https://iron-horse-api-production.up.railway.app/v1/auth/login", {
        //method: "POST",
        //headers: {
          //"Content-Type": "application/json",
        //},
        //body: JSON.stringify({ email, password }),
      //});

      const response = await api.post("auth/login", {email, password});

      // Verifica se a resposta foi bem-sucedida
      if (response.accessToken) {
        // Armazena o accessToken no localStorage
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        onClose(); // Fecha o popup após login bem-sucedido
        window.location.reload();
      } else {
        console.error("Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao enviar dados de login", error);
      setError("Erro ao realizar login: " + error.response.data.title);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "popup") {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOutsideClick}>
      <div className="popup-content">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt="Ícone de visualização"
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openForgotPassword();
            }}
          >
            Esqueceu a senha?
          </a>
        </p>
        <button className="google-login">
          <div className="google-logo-container">
            <img src={googleLogo} alt="Google logo" className="google-icon" />
          </div>
          Login com o Google
        </button>
        <p>
          Não possui conta?{" "}
          <b
            onClick={(e) => {
              e.preventDefault();
              openSignUp();
            }}
          >
            Cadastre-se
          </b>
        </p>
      </div>
    </div>
  );
};


export default LoginPopup;
