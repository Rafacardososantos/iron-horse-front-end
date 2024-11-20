import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ResetPassword.module.css';


const ResetPassword = ({ onClose }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/v1/recovery/reset?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao redefinir senha');
      }
      toast.success('Senha redefinida com sucesso! ');

      setTimeout(() => {
        navigate('/', {
          state: { openLoginModal: true },
        });
      }, 2000);

    } catch (error) {
      toast.error('Falha ao redefinir senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
       <ToastContainer />
      <div className={styles.resetPassword}>
        <h2 className={styles.title}>Redefinir Senha</h2>
        <span className={styles.description}>
          Digite sua nova senha e confirme-a abaixo.
        </span>
        <form className={styles.form} onSubmit={handlePasswordReset}>
          <input
            className={styles.input}
            type="password"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Redefinir'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default ResetPassword;
