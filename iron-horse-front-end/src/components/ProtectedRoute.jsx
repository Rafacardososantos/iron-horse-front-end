import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPopup from "../LoginPopup/LoginPopup";

const ProtectedRoute = ({ children, onClose }) => {
  const [activePopup, setActivePopup] = useState(null);
  const token = localStorage.getItem('accessToken');
  const closePopup = () => {
    setActivePopup(null);
  };

  const openPopup = (popupType) => {
    setActivePopup(popupType);
    setIsMenuOpen(false);
  };

  if (!token) {
    return <>
    <LoginPopup
      onClose={closePopup}
      openSignUp={() => openPopup("signUp")}
      openForgotPassword={() => openPopup("forgotPassword")}
    />;
      {activePopup === "signUp" && <CreateAccount onClose={closePopup} />}

      {activePopup === "forgotPassword" && <ForgotPassword onClose={closePopup} />}
      </>
  }


  return children;
};

export default ProtectedRoute;
