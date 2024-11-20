import { useState } from 'react';
import styles from './LoginPopup.module.css';
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
    if (e.target.className === styles.popup) {
      onClose();
    }
  };

  return (
    <div className={styles.popup} onClick={handleOutsideClick}>
      <div className={styles.popupContent}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.inputContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
            />
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt="Ícone de visualização"
              className={styles.passwordIcon}
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit" className={styles.loginBtn}>Entrar</button>
        </form>
        <p>
          <a href="#" onClick={openForgotPassword}>Esqueceu a senha?</a>
        </p>
        <button className={styles.googleLogin}>
          <div className={styles.googleLogoContainer}>
            <img src={googleLogo} alt="Google logo" className={styles.googleIcon} />
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
