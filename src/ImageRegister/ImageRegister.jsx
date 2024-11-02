import { useState, useRef } from "react";
import Modal from "react-modal";
import "./ImageRegister.css";

Modal.setAppElement("#root");

const VehicleRegistrationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [vehicleData, setVehicleData] = useState({
    carChange: "",
    trunkCapacity: "",
    headlightBulb: "",
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
    consentCheckboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setVehicleData((prevData) => ({
        ...prevData,
        consentCheckboxes: {
          ...prevData.consentCheckboxes,
          [name]: checked,
        },
      }));
    } else {
      setVehicleData({
        ...vehicleData,
        [name]: value,
      });
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleData);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Abrir Popup</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        <h2>Cadastre seu Veículo</h2>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <img src="../img/carro-ilustracao-de-transporte.png" alt="Logo" className="modal-image" />
        <form onSubmit={handleSubmit} className="three-column-form">
          <div className="form-group">
            <label>Câmbio</label>
            <select name="carChange" value={vehicleData.carChange} onChange={handleInputChange} required>
              <option value=""></option>
              <option value="manual">Manual</option>
              <option value="automatico">Automático</option>
            </select>
          </div>
          <div className="form-group">
            <label>Porta-malas</label>
            <input 
              type="text" 
              name="trunkCapacity" 
              value={vehicleData.trunkCapacity} 
              onChange={handleInputChange} 
              placeholder="capacidade em litros" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Lâmpada do Farol</label>
            <select name="headlightBulb" value={vehicleData.headlightBulb} onChange={handleInputChange} required>
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
            <input type="checkbox" name="checkboxA" checked={vehicleData.consentCheckboxes.checkboxA} onChange={handleInputChange} />
            Isulfim
          </label>
          <label>
            <input type="checkbox" name="checkboxB" checked={vehicleData.consentCheckboxes.checkboxB} onChange={handleInputChange} />
            Tag - Pedágio
          </label>
          <label>
            <input type="checkbox" name="checkboxC" checked={vehicleData.consentCheckboxes.checkboxC} onChange={handleInputChange} />
            Segredo Anti Furto
          </label>
          <label>
            <input type="checkbox" name="checkboxD" checked={vehicleData.consentCheckboxes.checkboxD} onChange={handleInputChange} />
            Multimídia
          </label>
          <label>
            <input type="checkbox" name="checkboxE" checked={vehicleData.consentCheckboxes.checkboxE} onChange={handleInputChange} />
            Ar condicionado
          </label>
          <label>
            <input type="checkbox" name="checkboxF" checked={vehicleData.consentCheckboxes.checkboxF} onChange={handleInputChange} />
            Vidros e Travas Elétricas
          </label>
        </div>

        <label>Itens de Segurança</label>
        <div className="checkbox-grid">
          <label>
            <input type="checkbox" name="checkboxG" checked={vehicleData.consentCheckboxes.checkboxG} onChange={handleInputChange} />
            Triângulo
          </label>
          <label>
            <input type="checkbox" name="checkboxH" checked={vehicleData.consentCheckboxes.checkboxH} onChange={handleInputChange} />
            Macaco
          </label>
          <label>
            <input type="checkbox" name="checkboxI" checked={vehicleData.consentCheckboxes.checkboxI} onChange={handleInputChange} />
            Chave de Roda
          </label>
          <label>
            <input type="checkbox" name="checkboxJ" checked={vehicleData.consentCheckboxes.checkboxJ} onChange={handleInputChange} />
            Estepe
          </label>
          <label>
            <input type="checkbox" name="checkboxK" checked={vehicleData.consentCheckboxes.checkboxK} onChange={handleInputChange} />
            Extintor de Incêndio
          </label>
          <label>
            <input type="checkbox" name="checkboxL" checked={vehicleData.consentCheckboxes.checkboxL} onChange={handleInputChange} />
            Alarme
          </label>
        </div>

        <label>Imagens do Veículo</label>
        <span>Imagem de Capa ou Destaque do Anúncio</span>
        <div className="image-container" onClick={handleImageClick}>
          <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className="upload-icon" />
        </div>

        <span>Imagens que compõem o Anúncio e Protocolares para o Seguro:</span>
        <span>Imagem Frontal</span>
          <img src="../img/vista frontal.png" alt="Vista Frontal" className="car-image" />
          <div className="image-container" onClick={handleImageClick}>
          <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className="upload-icon" />
        </div>

        <span>Imagem Traseira</span>
          <img src="../img/vista traseira.png" alt="Vista Traseira" className="car-image" />
          <div className="image-container" onClick={handleImageClick}>
          <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className="upload-icon" />
        </div>

        <span>Imagem Lateral Direita</span>
          <img src="../img/vista lateral direita.png" alt="Lateral Direita" className="lateral-car-image" />
          <div className="image-container" onClick={handleImageClick}>
          <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className="upload-icon" />
        </div>

        <span>Imagem Lateral Esquerda</span>
          <img src="../img/vista lateral esquerda.png" alt="Lateral Esquerda" className="lateral-car-image" />
          <div className="image-container" onClick={handleImageClick}>
          <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className="upload-icon" />
        </div>
        
        <label>Consentimento</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="checkbox1" checked={vehicleData.consentCheckboxes.checkbox1} onChange={handleInputChange} />
            Os condutores NÃO podem ser fumantes e/ou NÃO devem fumar dentro de seu veículo.
          </label>
          <label>
            <input type="checkbox" name="checkbox2" checked={vehicleData.consentCheckboxes.checkbox2} onChange={handleInputChange} />
            Os valores de pedágio caso seu veículo possua Tag DEVEM ser repassados ao condutor. Se não sinalizada está opção, está de acordo com a DESATIVAÇÃO de sua Tag ao disponibilizar seu veículo durante o período de locação!
          </label>
          <label>
            <input type="checkbox" name="checkbox3" checked={vehicleData.consentCheckboxes.checkbox3} onChange={handleInputChange} />
            As multas contraídas pelos condutores de seu veículo durante a utilização ou vigência do serviço serão transferidas ao infrator respectivo. Processo que é comumente conhecido como transferência de pontuação.  
          </label>
          <label>
            <input type="checkbox" name="checkbox4" checked={vehicleData.consentCheckboxes.checkbox4} onChange={handleInputChange} />
            Atesto para os devidos fins legais que todas às informações e/ou conteúdo de imagem fornecidas são verdadeiras, se valendo e fazendo cumprir as normativas da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o Código Civil Brasileiro (Lei nº 10.406/2002) e o previsto pelo Artigo 299 do Código Penal Brasileiro, que tipifica como crime a falsidade ideológica.
          </label>
        </div>
        <button id="register-button" type="submit">Prosseguir</button>
      </Modal>
    </div>
  );
};

export default VehicleRegistrationModal;