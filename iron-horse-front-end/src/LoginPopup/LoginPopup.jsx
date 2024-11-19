/* eslint-disable react/prop-types */
import { useState } from "react";
import "./LoginPopup.css";
import showPasswordIcon from "../img/Visualização_Permitida.png";
import hidePasswordIcon from "/img/Visualizar.png";
import Modal from '../components/Modal/Modal';
import api from "../utils/api";

const LoginPopup = ({ onClose, openForgotPassword, openSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {email, password});

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        alert("Usuario logado com sucesso");
        onClose(); 
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
    <>
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className="login-page">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input className="login-input"
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
          <br />
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
    </Modal>
    </>
  );
};


export default LoginPopup;
