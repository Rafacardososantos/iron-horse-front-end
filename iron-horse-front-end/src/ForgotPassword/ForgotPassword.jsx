import { useState } from 'react';
import styles from './ForgotPassword.module.css';

const ForgotPassword = ({ onClose, openForgotPassword, openSignUp }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError('');
    } else {
      setError('Por favor, insira um e-mail válido.');
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === styles.popup) {
      onClose();
    }
  };

  return (
    <div className={styles.popup} onClick={handleOutsideClick}>
      <div className={styles.popupContent}>
        <h2>Esqueceu a senha?</h2>
        <span>Informe o e-mail do qual deseja redefinir sua senha.</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.forgotBtn}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;