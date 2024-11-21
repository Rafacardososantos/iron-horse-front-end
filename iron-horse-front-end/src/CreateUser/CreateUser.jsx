import { useState } from "react";
import "./CreateUser.css";
import showPasswordIcon from "../img/Visualização_Permitida.png";
import hidePasswordIcon from "/img/Visualizar.png";
import Modal from '../components/Modal/Modal';
import api from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [isModalOpen, setModalOpen] = useState(true);
  const [error, setError] = useState(null);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const formatZipCode = (value) => {
    return value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
  
    if (name === "zipCode") {
      const formattedValue = formatZipCode(value.replace(/\D/g, ""));
      setFormData({
        ...formData,
        zipCode: formattedValue,
      });
  
      // Valida o CEP ao sair do campo
      if (formattedValue.length === 9) {
        await fetchAddressByZipCode(formattedValue);
      } else {
        toast.error("CEP inválido ou incompleto.");
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (name === "zipCode") {
      const formattedValue = formatZipCode(value.replace(/\D/g, ""));
      setFormData({
        ...formData,
        zipCode: formattedValue,
      });
      return;
    }
  
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        checkboxes: {
          ...prevData.checkboxes,
          [name]: checked,
        },
      }));
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError(null);

    const personalInfoResponse = await api.post("/users", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });
    
    if (personalInfoResponse !== null) { 
      const loginResponse = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Authorization': '',
        }
      });

      const accessToken = loginResponse?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        console.error("Erro ao fazer login");
      }
    } else {
      console.error("Erro na criação do usuário");
    }

  };

  return (
    <>
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <ToastContainer />
      <h2>Crie a sua Conta</h2>

      <form onSubmit={handleSubmit} className="registration-form">


        <div className="two-column-form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span>Será enviado um e-mail de confirmação</span>
          </div>
        </div>

        <div className="form-group">
          <label>Celular</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="two-column-form">
          <div className="form-group">
            <label>Senha</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="password-register"
                required
              />
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt="Ícone de visualização"
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="password-register"
                required
              />
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Criar Conta</button>
      </form>
    </Modal>
    </>
  );
};

export default CreateUser;
