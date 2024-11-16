import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <AuthContext.Provider value={{ formSubmitted, setFormSubmitted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
