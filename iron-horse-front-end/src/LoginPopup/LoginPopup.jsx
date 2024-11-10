/* eslint-disable react/prop-types */
import { useState } from 'react';
import './LoginPopup.css';
import showPasswordIcon from '../img/Visualização_Permitida.png';
import hidePasswordIcon from '../img/Visualizar.png';
import googleLogo from '../img/Logotipo_Google.png';

const LoginPopup = ({ onClose, openForgotPassword, openSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'popup') {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOutsideClick}>
      <div className="popup-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
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
          <button type="submit" className="login-btn">Entrar</button>
        </form>
        <p>
          <a href="#" onClick={openForgotPassword}>Esqueceu a senha?</a>
        </p>
        <button className="google-login">
          <div className="google-logo-container">
            <img src={googleLogo} alt="Google logo" className="google-icon" />
          </div>
          Login com o Google
        </button>
        <p>
          Não possui conta? <b href="#" onClick={openSignUp}>Cadastre-se</b>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
