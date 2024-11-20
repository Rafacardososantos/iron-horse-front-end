import { useState } from 'react';
import api from '../utils/api';
import './ForgotPassword.css';
import Modal from '../components/Modal/Modal';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/recovery/', { email });
      setSuccessMessage('Se o e-mail estiver registrado, você receberá um link para redefinir a senha.');
    } catch (error) {
      setError('Ocorreu um erro ao tentar enviar a solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <div className="forgot-password">
          <h2>Esqueceu a senha?</h2>
          <span>Informe o e-mail do qual deseja redefinir sua senha.</span>
          <form className='form-password' onSubmit={handleSubmit}>
            <input
              className="input-forgot-password"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="forgot-btn" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
