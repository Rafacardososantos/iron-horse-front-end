import { useState} from "react";
import "./CarRegister.css";

const CarRegister = ({onClose}) => {
  const [otherBrand, setOtherBrand] = useState("");
  const [isOtherBrand, setIsOtherBrand] = useState(false);
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    anoFabricacao: "",
    checkboxes: {
      checkbox1: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        checkboxes: {
          ...prevData.checkboxes,
          [name]: checked,
        },
      }));
    } else if (name === "marca") {
      if (value === "outra") {
        setIsOtherBrand(true);
        setFormData({ ...formData, [name]: "" });
      } else {
        setIsOtherBrand(false);
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'popup') {
      onClose();
    }
  };

  return (
    <div className="create-account-content" onClick={handleOutsideClick}>
     <div className="react-modal-content">  
        <h2>Cadastre seu veículo</h2>
        <img
          src="../img/carro-ilustracao-de-transporte.png"
          alt="Logo"
          className="modal-image"
        />
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Marca</label>
            <select
              name="marca"
              value={isOtherBrand ? "outra" : formData.marca}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione uma marca</option>
              <option value="audi">Audi</option>
              <option value="bmw">BMW</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="chrysler">Chrysler</option>
              <option value="citroen">Citroën</option>
              <option value="dodge">Dodge</option>
              <option value="fiat">Fiat</option>
              <option value="ford">Ford</option>
              <option value="honda">Honda</option>
              <option value="hyundai">Hyundai</option>
              <option value="jaguar">Jaguar</option>
              <option value="jeep">Jeep</option>
              <option value="kia">Kia</option>
              <option value="lexus">Lexus</option>
              <option value="mazda">Mazda</option>
              <option value="mercedes">Mercedes-Benz</option>
              <option value="nissan">Nissan</option>
              <option value="peugeot">Peugeot</option>
              <option value="renault">Renault</option>
              <option value="subaru">Subaru</option>
              <option value="toyota">Toyota</option>
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
          <label htmlFor="modelo">Ano de Fabricação</label>
            <input
              type="text"
              name="anoFabricacao" 
              value={formData.anoFabricacao}
              onChange={handleChange}
              required
            />
          </div>
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
                previsto pelo Artigo 299 do Código Penal Brasileiro, que tipifica
                como crime a falsidade ideológica.
              </span>
            </label>
          </div>
          <button id="register-button" type="submit">
            Prosseguir
          </button>
        </form>
     </div>
    </div>
  );
}

export default CarRegister;
