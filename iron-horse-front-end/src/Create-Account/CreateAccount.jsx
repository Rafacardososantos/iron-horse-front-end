import { useState } from "react";
import "./CreateAccount.css";
import showPasswordIcon from "../img/Visualização_Permitida.png";
import hidePasswordIcon from "/img/Visualizar.png";
import Modal from '../components/Modal/Modal';


const CreateAccount = ({ onClose }) => { 
  const [password, setPassword] = useState("");
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
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
    },
  }); 
  const [isModalOpen, setModalOpen] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const formatZipCode = (value) => {
    return value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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
      const formattedValue =
        name === "zipCode" ? formatZipCode(value.replace(/\D/g, "")) : value;

      setFormData({
        ...formData,
        [name]: formattedValue,
      });

      if (name === "zipCode" && formattedValue.length === 9) {
        fetchAddressByZipCode(formattedValue.replace("-", ""));
      }
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
      }));
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error.message);
      alert("CEP inválido ou não encontrado");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "popup-create-account") {
      onClose();
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
    <h2>Crie a sua Conta</h2>
    
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="postImage">
        <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
          <img
            src={
              formData.image
                ? URL.createObjectURL(formData.image)
                : "/img/Perfil-Usuario.png"
            }
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
          onChange={handleChange}
        />
      </div>

      <div className="form-group full-width">
        <label>Nome Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-register"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-register"
      />
      <img
        src={showPassword ? hidePasswordIcon : showPasswordIcon}
        alt="Ícone de visualização"
        className="password-icon"
        onClick={togglePasswordVisibility}
      />
    </div>
  </div>
</div>
      
      <span>
        A senha deve conter pelo menos 12 caracteres, incluindo uma letra maiúscula, um número e um símbolo.
      </span>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="checkbox1"
            checked={formData.checkboxes.checkbox1}
            onChange={handleChange}
          />
          Aceita receber comunicações via WhatsApp
        </label>
        <label>
          <input
            type="checkbox"
            name="checkbox2"
            checked={formData.checkboxes.checkbox2}
            onChange={handleChange}
          />
          Aceita os Termos de Uso
        </label>
        <label>
          <input
            type="checkbox"
            name="checkbox3"
            checked={formData.checkboxes.checkbox3}
            onChange={handleChange}
          />
          Aceita a Política de Privacidade
        </label>
        <label>
          <input
            type="checkbox"
            name="checkbox4"
            checked={formData.checkboxes.checkbox4}
            onChange={handleChange}
          />
          Estou devidamente regularizado e sem pendências nos órgãos de trânsito (DETRAN, DENATRAN).
        </label>
        <label>
          <input
            type="checkbox"
            name="checkbox5"
            checked={formData.checkboxes.checkbox5}
            onChange={handleChange}
          />
          Atesto que todas as informações fornecidas são verdadeiras e concordo com as leis vigentes.
        </label>
      </div>

      <button id="register-button" type="submit">
        Registrar
      </button>
    </form>
  </Modal>
  );
};

export default CreateAccount;
