import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { formSubmitted } = useAuth();

  // Se o formulário foi enviado, renderiza o conteúdo da rota
  return formSubmitted ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
