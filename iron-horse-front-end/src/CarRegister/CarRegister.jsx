import { createContext, useContext, useState, useEffect } from "react";
import { useCarContext } from "../context/CarContext";
import ImageRegister from "../ImageRegister/ImageRegister"
import "./CarRegister.css";
import Modal from "../components/Modal/Modal"

const CarContext = createContext();

const CarRegister = ({ onClose }) => {
  const [otherBrand, setOtherBrand] = useState("");
  const [isOtherBrand, setIsOtherBrand] = useState(false);
  const [isInsuranceActive, setInsuranceActive] = useState(false);
  const { carData, setCarData } = useCarContext();
  const [isFirstModalOpen, setFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [carDataExist, setCarDataExist] = useState();

  const openFirstModal = () => {
    setFirstModalOpen(true);
  };


  const openSecondModal = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(true);
    if (!carDataExist) {
      onClose(null);
    }
  };

  useEffect(() => {
    if (carDataExist) {
      openSecondModal();
    }
  }, [carDataExist]); 

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    manufactureYear: 2010,
    carInfoDto: {
      insurance: true,
      insuranceName: 'Não possui',
      renavam: '',
      licensePlate: '',
      transmission: '',
      directionType: '',
      chassi: 'xyzadqae',
      engineNumber: '',
      cylinderDisplacement: '',
      mileage: '',
      fuelType: '',
      color: "",
      numDoors: 4,
      numSeats: 4,
      headlightBulb: "",
      trunkCapacity: '',
      carFeaturesDto: {
        insulfilm: false,
        tagPike: false,
        antiTheftSecret: false,
        multimedia: false,
        airConditioner: false,
        electricWindowsAndLocks: false,
        triangle: false,
        jack: false,
        wheelWrench: false,
        spareTire: false,
        fireExtinguisher: false,
        alarm: false,
      },
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const validationRules = {
      engineNumber: /^[A-Z0-9]{1,10}$/,
      cylinderDisplacement: /^\d{1,3}(\.\d{1,2})?$/,
      mileage: /^[0-9]{1,7}$/,
    };

    if (validationRules[name] && !validationRules[name].test(value)) return;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        carInfoDto: {
          ...prevData.carInfoDto,
          carFeaturesDto: {
            ...prevData.carInfoDto.carFeaturesDto,
            [name]: checked,
          },
        },
      }));
    } else if (name === "brand") {
      if (value === "outra") {
        setIsOtherBrand(true);
        setFormData((prevData) => ({ ...prevData, brand: "" }));
      } else {
        setIsOtherBrand(false);
        setFormData((prevData) => ({ ...prevData, brand: value }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      insurance: !prevData.insurance,
    }));
    setInsuranceActive((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bearerToken = localStorage.getItem("accessToken");
    if (!bearerToken) {
      console.error("Token de autenticação não encontrado.");
      alert("Você precisa estar autenticado para realizar essa ação.");
      return;
    }

    const requestData = {
      brand: formData.brand,
      model: formData.model,
      manufactureYear: formData.manufactureYear,
      carInfoDto: {
        insurance: formData.insurance,
        insuranceName: formData.insuranceName,
        renavam: formData.renavam,
        licensePlate: formData.licensePlate,
        transmission: formData.transmission,
        directionType: formData.directionType,
        chassi: formData.chassi,
        engineNumber: formData.engineNumber,
        cylinderDisplacement: formData.cylinderDisplacement,
        mileage: formData.mileage,
        fuelType: formData.fuelType,
        color: formData.color,
        numDoors: formData.numDoors,
        numSeats: formData.numSeats,
        headlightBulb: formData.headlightBulb,
        trunkCapacity: formData.trunkCapacity,
        carFeaturesDto: {
          insulfilm: formData.carInfoDto.carFeaturesDto.insulfilm,
          tagPike: formData.carInfoDto.carFeaturesDto.tagPike,
          antiTheftSecret: formData.carInfoDto.carFeaturesDto.antiTheftSecret,
          multimedia: formData.carInfoDto.carFeaturesDto.multimedia,
          airConditioner: formData.carInfoDto.carFeaturesDto.airConditioner,
          electricWindowsAndLocks:
            formData.carInfoDto.carFeaturesDto.electricWindowsAndLocks,
          triangle: formData.carInfoDto.carFeaturesDto.triangle,
          jack: formData.carInfoDto.carFeaturesDto.jack,
          wheelWrench: formData.carInfoDto.carFeaturesDto.wheelWrench,
          spareTire: formData.carInfoDto.carFeaturesDto.spareTire,
          fireExtinguisher: formData.carInfoDto.carFeaturesDto.fireExtinguisher,
          alarm: formData.carInfoDto.carFeaturesDto.alarm,
        },
      },
    };
    setCarData(requestData);
    setCarDataExist(true);
  };

  return (
    <div>
      {isFirstModalOpen && (<Modal isOpen={isFirstModalOpen} onClose={openSecondModal}>
        <h2>Cadastre seu Veículo</h2>
        <img src="../img/carro-ilustracao-de-transporte.png" alt="Logo" className="modal-image" />
        <form onSubmit={handleSubmit} className="two-column-form">

          <div className="form-group">
            <label>Placa</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
            />
          </div>

            <div className="form-group">
              <label>Marca</label>
              <select
                name="brand"
                value={isOtherBrand ? "outra" : formData.brand}
                onChange={handleChange}
                required
              >
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

            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ano Modelo</label>
              <input
                type="text"
                name="manufactureYear"
                value={formData.manufactureYear}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Cor</label>
              <input
                type="text"
                name="color"
                value={formData.color}
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
                name="directionType"
                value={formData.directionType}
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
                name="cylinderDisplacement"
                placeholder="_ . _"
                value={formData.cylinderDisplacement}
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
            <div className="form-group-insurance">
              <div className="form-group3">
                <label>RENAVAM</label>
                <input
                  type="text"
                  name="renavam"
                  value={formData.renavam}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group3-insurance">
                <label>Seguro</label>
                <div className="toggle-button" onClick={handleToggle}>
                  <input
                    type="checkbox"
                    checked={formData.insurance}
                    readOnly
                  />
                  <span
                    className={`slider ${formData.insurance ? "active" : ""}`}
                  ></span>
                </div>
              </div>
              <div className="form-group3">
                <label>Seguradora</label>
                <input
                  type="text"
                  name="insuranceName"
                  className="insurance-input"
                  value={formData.insuranceName}
                  onChange={handleChange}
                  required={isInsuranceActive}
                  disabled={!isInsuranceActive}
                />
              </div>
            </div>
            <span>
              A exigência de informar seu seguro serve apenas para que não seja
              necessário efetuar uma vistória física de seu veículo. Deixando
              claro que seu seguro particular nunca será acionado em hipótese
              alguma! Todos os veículos são segurados pela nossa seguradora
              parceira, conforme às disposições legais segundo sua utilização
              mediante a plataforma e o serviço prestado.
            </span>

            <div className="car-three-column-form">
              <div className="car-form-group3-o">
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
              <div className="car-form-group3">
                <label>Farol tipo</label>
                <select
                  name="headlightBulb"
                  className="car-select"
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
            </div>

          <label>Itens de Conforto e Adicionais</label>
          <div className="car-checkbox-grid">
            <label>
              <input type="checkbox" name="insulfilm" checked={formData.carInfoDto.carFeaturesDto.insulfilm} onChange={handleChange} />
              Isulfim
            </label>
            <label>
              <input type="checkbox" name="tagPike" checked={formData.carInfoDto.carFeaturesDto.tagPike} onChange={handleChange} />
              Tag - Pedágio
            </label>
            <label>
              <input type="checkbox" name="antiTheftSecret" checked={formData.carInfoDto.carFeaturesDto.antiTheftSecret} onChange={handleChange} />
              Segredo Anti Furto
            </label>
            <label>
              <input type="checkbox" name="multimedia" checked={formData.carInfoDto.carFeaturesDto.multimedia} onChange={handleChange} />
              Multimídia
            </label>
            <label>
              <input type="checkbox" name="airConditioner" checked={formData.carInfoDto.carFeaturesDto.airConditioner} onChange={handleChange} />
              Ar condicionado
            </label>
            <label>
              <input type="checkbox" name="electricWindowsAndLocks" checked={formData.carInfoDto.carFeaturesDto.electricWindowsAndLocks} onChange={handleChange} />
              Vidros e Travas Elétricas
            </label>
          </div>

          <label>Itens de Segurança</label>
          <div className="car-checkbox-grid">
            <label>
              <input type="checkbox" name="triangle" checked={formData.carInfoDto.carFeaturesDto.triangle} onChange={handleChange} />
              Triângulo
            </label>
            <label>
              <input type="checkbox" name="jack" checked={formData.carInfoDto.carFeaturesDto.jack} onChange={handleChange} />
              Macaco
            </label>
            <label>
              <input type="checkbox" name="wheelWrench" checked={formData.carInfoDto.carFeaturesDto.wheelWrench} onChange={handleChange} />
              Chave de Roda
            </label>
            <label>
              <input type="checkbox" name="spareTire" checked={formData.carInfoDto.carFeaturesDto.spareTire} onChange={handleChange} />
              Estepe
            </label>
            <label>
              <input type="checkbox" name="fireExtinguisher" checked={formData.carInfoDto.carFeaturesDto.fireExtinguisher} onChange={handleChange} />
              Extintor Incêndio
            </label>
            <label>
              <input type="checkbox" name="alarm" checked={formData.carInfoDto.carFeaturesDto.alarm} onChange={handleChange} />
              Alarme
            </label>
          </div>
          <div className="car-button-container">
            <button id="car-cancel-button" type="submit">Cancelar</button>
            <button id="car-register-button" type="submit">Prosseguir</button>
          </div>
        </form>
      </Modal>)}
      {isSecondModalOpen && (
        <Modal isOpen={isSecondModalOpen} onClose={onClose}>
          <ImageRegister />
        </Modal>
      )}
    </div>
  );
};

export default CarRegister;
