import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './errorPages/ErrorPageComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your application routes here */}
        
        {/* Error routes */}
        <Route
          path="/404"
          element={<ErrorPage statusCode="404" title="Recurso não encontrado" description="O recurso que você está procurando não foi encontrado." />}
        />
        <Route
          path="/409"
          element={<ErrorPage statusCode="409" title="Dados duplicados" description="Os dados enviados estão em conflito com os dados existentes." />}
        />
        <Route
          path="/401"
          element={<ErrorPage statusCode="401" title="Sem privilégios necessários para o acesso" description="Você não possui as permissões necessárias para acessar este recurso." />}
        />
        
        {/* Catch-all route for 404 */}
        <Route
          path="*"
          element={<ErrorPage statusCode="404" title="Recurso não encontrado" description="O recurso que você está procurando não foi encontrado." />}
        />
      </Routes>
    </Router>
  );
};

export default App;
