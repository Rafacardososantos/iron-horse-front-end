/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./MoreInformation.css";
import Modal from '../components/Modal/Modal';

const MoreInformation = ({ onClose }) => {
  const [isInsuranceActive, setInsuranceActive] = useState(false);
  const [otherBrand, setOtherBrand] = useState("");
  const [isOtherBrand, setIsOtherBrand] = useState(false);

  const [isModalOpen, setModalOpen] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    anoFabricacao: "",
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
    onClose();
  };
  const handleOutsideClick = (e) => {
    if (e.target.className === "popup") {
      onClose();
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
      <h2>Cadastre seu Veículo</h2>
      <img
        src="../img/carro-ilustracao-de-transporte.png"
        alt="Logo"
        className="modal-image"
      />
      <form onSubmit={handleSubmit} className="two-column-form">
        <div className="form-group">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Marca</label>
              <select
                name="marca"
                value={isOtherBrand ? "outra" : formData.marca}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecione uma marca
                </option>
                <option value="alfa-romeo">Alfa Romeo</option>
                <option value="aston-martin">Aston Martin</option>
                <option value="audi">Audi</option>
                <option value="bentley">Bentley</option>
                <option value="bmw">BMW</option>
                <option value="chery">Chery</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="chrysler">Chrysler</option>
                <option value="citroen">Citroën</option>
                <option value="dodge">Dodge</option>
                <option value="ferrari">Ferrari</option>
                <option value="fiat">Fiat</option>
                <option value="ford">Ford</option>
                <option value="geely">Geely</option>
                <option value="honda">Honda</option>
                <option value="hyundai">Hyundai</option>
                <option value="jac">JAC</option>
                <option value="jaguar">Jaguar</option>
                <option value="jeep">Jeep</option>
                <option value="kia">Kia</option>
                <option value="lamborghini">Lamborghini</option>
                <option value="land-rover">Land Rover</option>
                <option value="lexus">Lexus</option>
                <option value="lifan">Lifan</option>
                <option value="maserati">Maserati</option>
                <option value="mazda">Mazda</option>
                <option value="mclaren">McLaren</option>
                <option value="mercedes">Mercedes-Benz</option>
                <option value="mini">Mini</option>
                <option value="mitsubishi">Mitsubishi</option>
                <option value="nissan">Nissan</option>
                <option value="peugeot">Peugeot</option>
                <option value="porsche">Porsche</option>
                <option value="ram">Ram</option>
                <option value="renault">Renault</option>
                <option value="rolls-royce">Rolls-Royce</option>
                <option value="smart">Smart</option>
                <option value="subaru">Subaru</option>
                <option value="suzuki">Suzuki</option>
                <option value="tesla">Tesla</option>
                <option value="toyota">Toyota</option>
                <option value="troller">Troller</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="volvo">Volvo</option>
                <option value="outra">Outra (digite)</option>
              </select>
              {isOtherBrand && (
                <input
                  type="text"
                  name="otherBrand"
                  value={otherBrand}
                  onChange={(e) => setOtherBrand(e.target.value)}
                  required
                  className="other-brand-input"
                />
              )}
            </div>
            <div>
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="year">Ano de Fabricação</label>
              <input
                type="text"
                name="anoFabricacao"
                value={formData.anoFabricacao}
                onChange={handleChange}
                required
              />
            </div>
          </form>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="checkbox1"
                checked={formData.checkboxes.checkbox1}
                onChange={handleChange}
              />
              <span>
                Atesto para os devidos fins legais que todas às informações
                fornecidas são verdadeiras, se valendo e fazendo cumprir as
                normativas da Lei Geral de Proteção de Dados (LGPD - Lei nº
                13.709/2018), o Código Civil Brasileiro (Lei nº 10.406/2002) e o
                previsto pelo Artigo 299 do Código Penal Brasileiro, que
                tipifica como crime a falsidade ideológica.
              </span>
            </label>
          </div>

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
            <span
              className={`slider ${formData.insurance ? "active" : ""}`}
            ></span>
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
          necessário efetuar uma vistória física de seu veículo. Deixando claro
          que seu seguro particular nunca será acionado em hipótese alguma!
          Todos os veículos são segurados pela nossa seguradora parceira,
          conforme às disposições legais segundo sua utilização mediante a
          plataforma e o serviço prestado.
        </span>
      </form>
      <form onSubmit={handleSubmit} className="three-column-form">
        <div className="form-group3">
          <label>Câmbio</label>
          <select
            name="carChange"
            value={formData.carChange}
            required
            onChange={handleChange}
          >
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
          <select
            name="headlightBulb"
            value={formData.headlightBulb}
            required
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="halogena">Halógena</option>
            <option value="led">LED</option>
            <option value="xenon">Xenon</option>
            <option value="super-branca">Super Branca</option>
          </select>
        </div>
      </form>
      <h5>Itens de Conforto e Adicionais</h5>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="checkboxA"
            checked={formData.checkboxA}
            onChange={handleChange}
          />
          Isulfim
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxB"
            checked={formData.checkboxB}
            onChange={handleChange}
          />
          Tag - Pedágio
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxC"
            checked={formData.checkboxC}
            onChange={handleChange}
          />
          Segredo Anti Furto
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxD"
            checked={formData.checkboxD}
            onChange={handleChange}
          />
          Multimídia
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxE"
            checked={formData.checkboxE}
            onChange={handleChange}
          />
          Ar condicionado
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxF"
            checked={formData.checkboxF}
            onChange={handleChange}
          />
          Vidros e Travas Elétricas
        </label>
      </div>
      <h5>Itens de Segurança</h5>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="checkboxG"
            checked={formData.checkboxG}
            onChange={handleChange}
          />
          Triângulo
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxH"
            checked={formData.checkboxH}
            onChange={handleChange}
          />
          Macaco
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxI"
            checked={formData.checkboxI}
            onChange={handleChange}
          />
          Chave de Roda
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxJ"
            checked={formData.checkboxJ}
            onChange={handleChange}
          />
          Estepe
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxK"
            checked={formData.checkboxK}
            onChange={handleChange}
          />
          Extintor de Incêndio
        </label>
        <label>
          <input
            type="checkbox"
            name="checkboxL"
            checked={formData.checkboxL}
            onChange={handleChange}
          />
          Alarme
        </label>
      </div>
      <button id="register-button" type="submit">
        Registrar
      </button>
      </Modal>
    </div>
  );
};

export default MoreInformation;
