import { useState } from "react";
import "./CreateAccount.css";
import showPasswordIcon from "../img/Visualização_Permitida.png";
import hidePasswordIcon from "/img/Visualizar.png";
import Modal from '../components/Modal/Modal';
import api from "../utils/api";

const CreateAccount = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    zipCode: "",
    street_name: "",
    number: "",
    number_driver_license: "",
    district: "",
    city: "",
    uf: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
    cpf: "",
    checkboxes: {
      acceptComunication: false,
      isTermsUser: true,
      isRealInformation: false,
      isRegularized: false,
    },
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };


  const formatZipCode = (value) => {
    return value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "zipCode") {
      const formattedValue = formatZipCode(value.replace(/\D/g, ""));
      setFormData({
        ...formData,
        zipCode: formattedValue,
      });
      await fetchAddressByZipCode(formattedValue);
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

  const fetchAddressByZipCode = async (zipCode) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (!response.ok) throw new Error("CEP inválido");
      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");

      setFormData((prevData) => ({
        ...prevData,
        street_name: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        uf: data.uf,
      }));
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error.message);
      alert("CEP inválido ou não encontrado");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
  
    setError(null);
  
    try {
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
        });
  
        const accessToken = loginResponse.accessToken;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        } else {
          console.error("Erro ao fazer login");
        }
  
        const bearer = localStorage.getItem('accessToken');
  
        if (bearer !== null) {
          const bodyData = {
            cpf: formData.cpf,
            streetAddress: formData.street_name,
            streetName: formData.street_name,
            streetNumber: formData.number,
            district: formData.district,
            zipcode: formData.zipCode,
            city: formData.city,
            state: formData.uf,
            acceptComunication: formData.checkboxes.acceptComunication,
            isTermsUser: formData.checkboxes.isTermsUser,
            isRealInformation: formData.checkboxes.isRealInformation,
            isRegularized: formData.checkboxes.isRegularized,
            driverLicense: formData.number_driver_license,
          };
  
          try {
            const response = await api.post("/userInfo", 
              bodyData, 
              {
                headers: {
                  "Authorization": `Bearer ${bearer}`,
                  "Content-Type": "application/json",
                }
              }
            );
  
            console.log("Resposta da requisição:", response.data);
  
          } catch (error) {
            console.error("Erro ao chamar o POST de userInfo:", error.response || error);
          }
        }
  
        if (bearer !== null && formData.image !== null) {
          const formDataImage = new FormData();
          formDataImage.append('file', formData.image);
          
          try {
            const uploadResponse = await api.post("/users/upload", 
              formDataImage, 
              {
                headers: {
                  'Authorization': `Bearer ${bearer}`,
                }
              }
            );
  
            console.log(uploadResponse.data);
  
          } catch (error) {
            console.error("Erro ao enviar a imagem:", error.response || error);
          }
        }
  
      } else {
        console.error("Erro na criação do usuário");
      }
  
    } catch (error) {
      console.error("Erro durante a requisição:", error.response || error);
    }
  };


  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <h2>Crie a sua Conta</h2>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="postImage">
          <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
            <img
              src={formData.image ? URL.createObjectURL(formData.image) : "/img/Perfil-Usuario.png"}
              alt="Logo"
              className="modal-image"
            />
            <span>Anexar Imagem</span>
          </div>
          <input
            type="file"
            id="fileInput"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

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
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="two-column-form">
          <div className="form-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CNH</label>
            <input
              type="text"
              name="number_driver_license"
              value={formData.number_driver_license}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="two-column-form">
          <div className="form-group">
            <label>Rua</label>
            <input
              type="text"
              name="street_name"
              value={formData.street_name}
              onChange={handleChange}
              required
            />
          </div>
          <form>
            <div className="form-group">
              <label>Número</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </div>

        <div className="two-column-form">
          <div className="form-group">
            <label>Bairro</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="two-column-form">
          <div className="form-group">
            <label>Estado</label>
            <input
              type="text"
              name="uf"
              value={formData.uf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CEP</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              maxLength="9"
            />
          </div>
        </div>

        <div className="two-column-form">
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

        <div className="checkbox-group">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="acceptComunication"
                checked={formData.checkboxes.acceptComunication}
                onChange={handleChange}
              />
              Aceito receber comunicações via WhatsApp ou qualquer outro meio existente
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isTermsUser"
                checked={formData.checkboxes.isTermsUser}
                onChange={handleChange}
              />
              Aceito os Termos de Uso
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isRealInformation"
                checked={formData.checkboxes.isRealInformation}
                onChange={handleChange}
              />
              Confirmo que as informações fornecidas são verdadeiras
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isRegularized"
                checked={formData.checkboxes.isRegularized}
                onChange={handleChange}
              />
              Declaro que estou regularizado com as condições legais
            </label>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="create-btn" type="submit">Criar Conta</button>
      </form>
    </Modal>
  );
};

export default CreateAccount;
