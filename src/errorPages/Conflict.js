// Conflict.js
import React from 'react';
import ErrorPage from './ErrorPageComponent';

const Conflict = () => (
  <ErrorPage
    statusCode="409"
    title="Dados duplicados"
    description="Os dados enviados estão em conflito com os dados existentes."
  />
);

export default Conflict;
