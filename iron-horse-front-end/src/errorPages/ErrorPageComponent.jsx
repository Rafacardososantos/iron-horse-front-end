import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ statusCode, title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>{statusCode}</h1>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => navigate('/')}>Voltar para a página inicial</button>
    </div>
  );
};

export default ErrorPage;
