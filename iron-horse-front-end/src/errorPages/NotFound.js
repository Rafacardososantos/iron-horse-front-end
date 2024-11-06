// NotFound.js
import React from 'react';
import ErrorPage from './ErrorPageComponent';

const NotFound = () => (
  <ErrorPage
    statusCode="404"
    title="Recurso não encontrado"
    description="O recurso que você está procurando não foi encontrado."
  />
);

export default NotFound;
