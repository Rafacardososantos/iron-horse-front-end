import { useState } from "react";
import Modal from "react-modal";
// import "./MoreInformation.css";

Modal.setAppElement("#root");

const MoreInformation = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isInsuranceActive, setInsuranceActive] = useState(false);
  const [formData, setFormData] = useState({
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
          <span>
            As informações acima requisitadas são tratadas com sigilo e
            segurança, utilizadas apenas com a finalidade de segurança ao próprio
            proprietário do veículo e aos órgãos competentes associados ao setor
            público, bem como os órgãos públicos de mobilidade urbana e do
            trânsito.
          </span>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="checkbox1"
                checked={formData.checkboxes.checkbox1}
                onChange={handleChange}
              />
              A documentação do carro está em dia, entendo por como documentos o
              Licenciamento do Veículo que inclui o IPVA, o DPVAT e a GRT
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox2"
                checked={formData.checkboxes.checkbox2}
                onChange={handleChange}
              />
              O proprietário deste veículo está devidamente regularizado e sem
              nenhuma pendência nos órgãos de trânsito (DETRAN, DENATRAN, DER e
              DNIT).
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox5"
                checked={formData.checkboxes.checkbox5}
                onChange={handleChange}
              />
              Atesto para os devidos fins legais que todas às informações
              fornecidas são verdadeiras, se valendo e fazendo cumprir as
              normativas da Lei Geral de Proteção de Dados (LGPD - Lei nº
              13.709/2018), o Código Civil Brasileiro (Lei nº 10.406/2002) e o
              Código de Defesa do Consumidor (Lei nº 8.078/1990).
            </label>
          </div>
          <button id="register-button" type="submit">Cadastrar Veículo</button>
        </form>
      </Modal>
    </div>
  );
};

export default MoreInformation;
