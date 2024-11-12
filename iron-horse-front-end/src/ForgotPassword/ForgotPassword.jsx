import { useState } from 'react';
import './ForgotPassword.css';
import Modal from '../components/Modal/Modal';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
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
      </Modal>
    </div>
  );
};

export default ForgotPassword;
