import { useState } from 'react';
import './ForgotPassword.css';

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
    if (e.target.className === 'popup') {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOutsideClick}>
      <div className="popup-content">
        <h2>Esqueceu a senha?</h2>
        <span>Informe o e-mail do qual deseja redefinir sua senha.</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="forgot-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
