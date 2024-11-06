// Unauthorized.js
import React from 'react';
import ErrorPage from './ErrorPageComponent';

const Unauthorized = () => (
  <ErrorPage
    statusCode="401"
    title="Sem privilégios necessários para o acesso"
    description="Você não possui as permissões necessárias para acessar este recurso."
  />
);

export default Unauthorized;
