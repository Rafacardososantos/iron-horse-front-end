import { useState } from "react";
import Modal from "react-modal";
import "./MoreInformation.css";

Modal.setAppElement("#root");

const MoreInformation = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isInsuranceActive, setInsuranceActive] = useState(false);
  const [formData, setFormData] = useState({
    carChange: "",
    trunkCapacity: "",
    headlightBulb: "",
    carColor: "",
    modelYear: "",
    transmission: "",
    numDoors: "",
    numSeats: "",
    steeringType: "",
    chassi: "",
    engineNumber: "",
    displacement: "",
    mileage: "",
    fuelType: "",
    renavam: "",
    insurance: false,
    insuranceCompany: "",
    "checkbox-grid": {
      checkboxA: false,
      checkboxB: false,
      checkboxC: false,
      checkboxD: false,
      checkboxE: false,
      checkboxF: false,
      checkboxG: false,
      checkboxH: false,
      checkboxI: false,
      checkboxJ: false,
      checkboxK: false,
      checkboxL: false,
    },
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox5: false,
    },
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const validationRules = {
      chassi: /^[0-9]{0,17}$/,
      engineNumber: /^[0-9]{0,10}$/,
      displacement: /^[0-9.]{0,4}$/,
      mileage: /^[0-9]{0,7}$/,
    };

    if (validationRules[name]) {
      if (!validationRules[name].test(value)) {
        return;
      }
    }

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        checkboxes: {
          ...prevData.checkboxes,
          [name]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      insurance: !prevData.insurance,
    }));
    setInsuranceActive((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Abrir Popup</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        <h2>Cadastre seu Veículo</h2>
        <img src="../img/carro-ilustracao-de-transporte.png" alt="Logo" className="modal-image" />
        <form onSubmit={handleSubmit} className="two-column-form">
          <div className="form-group">
            <label>Cor</label>
            <input
              type="text"
              name="carColor"
              value={formData.carColor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ano Modelo</label>
            <input
              type="text"
              name="modelYear"
              value={formData.modelYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Transmissão</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="manual">Manual</option>
              <option value="automatico">Automático</option>
            </select>
          </div>
          <div className="form-group">
            <label>Número de Portas</label>
            <input
              type="text"
              name="numDoors"
              value={formData.numDoors}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Número de Assentos</label>
            <input
              type="text"
              name="numSeats"
              value={formData.numSeats}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo de Direção</label>
            <select
              name="steeringType"
              value={formData.steeringType}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="hidraulica">Hidráulica</option>
              <option value="eletrica">Elétrica</option>
            </select>
          </div>
          <div className="form-group">
            <label>Chassi</label>
            <input
              type="text"
              name="chassi"
              placeholder="* _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ *"
              value={formData.chassi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Número do Motor</label>
            <input
              type="text"
              name="engineNumber"
              placeholder="_ _ _ _ _ _ _ _ _ _"
              value={formData.engineNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cilindrada</label>
            <input
              type="text"
              name="displacement"
              placeholder="_ . _"
              value={formData.displacement}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Quilometragem</label>
            <input
              type="text"
              name="mileage"
              placeholder="Km"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Combustível</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="gasolina">Gasolina</option>
              <option value="etanol">Etanol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
          <div className="form-group">
            <label>RENAVAM</label>
            <input
              type="text"
              name="renavam"
              value={formData.renavam}
              onChange={handleChange}
              required
            />
          </div>
            <div className="form-group-center">
              <label>Seguro</label>
              <div className="toggle-button" onClick={handleToggle}>
                <input type="checkbox" checked={formData.insurance} readOnly />
                <span className={`slider ${formData.insurance ? 'active' : ''}`}></span>
              </div>
            </div>
            <div className="form-group">
              <label>Informe a Seguradora</label>
              <input
                type="text"
                name="insuranceCompany"
                className="insurance-input"
                value={formData.insuranceCompany}
                onChange={handleChange}
                required={isInsuranceActive}
                disabled={!isInsuranceActive}
              />
            </div>
          <span>
            A exigência de informar seu seguro serve apenas para que não seja
            necessário efetuar uma vistória física de seu veículo. Deixando
            claro que seu seguro particular nunca será acionado em hipótese
            alguma! Todos os veículos são segurados pela nossa seguradora
            parceira, conforme às disposições legais segundo sua utilização
            mediante a plataforma e o serviço prestado.
          </span>
          </form>

          <form onSubmit={handleSubmit} className="three-column-form">
          <div className="form-group3">
            <label>Câmbio</label>
            <select name="carChange" value={formData.carChange} required onChange={handleChange}>
              <option value=""></option>
              <option value="manual">Manual</option>
              <option value="automatico">Automático</option>
            </select>
          </div>
          <div className="form-group3">
            <label>Porta-malas</label>
            <input 
              type="text" 
              name="trunkCapacity" 
              value={formData.trunkCapacity}
              onChange={handleChange}
              placeholder="capacidade em litros" 
              required 
            />
          </div>
          <div className="form-group3">
            <label>Lâmpada do Farol</label>
            <select name="headlightBulb" value={formData.headlightBulb} required onChange={handleChange}>
              <option value=""></option>
              <option value="halogena">Halógena</option>
              <option value="led">LED</option>
              <option value="xenon">Xenon</option>
              <option value="super-branca">Super Branca</option>
            </select>
          </div>
        </form>

        <label>Itens de Conforto e Adicionais</label>
        <div className="checkbox-grid">
          <label>
            <input type="checkbox" name="checkboxA" checked={formData.checkboxA} onChange={handleChange} />
            Isulfim
          </label>
          <label>
            <input type="checkbox" name="checkboxB" checked={formData.checkboxB} onChange={handleChange} />
            Tag - Pedágio
          </label>
          <label>
            <input type="checkbox" name="checkboxC" checked={formData.checkboxC} onChange={handleChange} />
            Segredo Anti Furto
          </label>
          <label>
            <input type="checkbox" name="checkboxD" checked={formData.checkboxD} onChange={handleChange} />
            Multimídia
          </label>
          <label>
            <input type="checkbox" name="checkboxE" checked={formData.checkboxE} onChange={handleChange} />
            Ar condicionado
          </label>
          <label>
            <input type="checkbox" name="checkboxF" checked={formData.checkboxF} onChange={handleChange} />
            Vidros e Travas Elétricas
          </label>
        </div>

        <label>Itens de Segurança</label>
        <div className="checkbox-grid">
          <label>
            <input type="checkbox" name="checkboxG" checked={formData.checkboxG} onChange={handleChange} />
            Triângulo
          </label>
          <label>
            <input type="checkbox" name="checkboxH" checked={formData.checkboxH} onChange={handleChange} />
            Macaco
          </label>
          <label>
            <input type="checkbox" name="checkboxI" checked={formData.checkboxI} onChange={handleChange} />
            Chave de Roda
          </label>
          <label>
            <input type="checkbox" name="checkboxJ" checked={formData.checkboxJ} onChange={handleChange} />
            Estepe
          </label>
          <label>
            <input type="checkbox" name="checkboxK" checked={formData.checkboxK} onChange={handleChange} />
            Extintor de Incêndio
          </label>
          <label>
            <input type="checkbox" name="checkboxL" checked={formData.checkboxL} onChange={handleChange} />
            Alarme
          </label>
        </div>

          <button id="cancel-button" type="submit">Cancelar</button>
          <button id="register-button" type="submit">Prosseguir</button>
      </Modal>
    </div>
  );
};

export default MoreInformation;
