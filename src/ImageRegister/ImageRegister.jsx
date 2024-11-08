import { useState, useRef } from "react";
import Modal from "react-modal";
import "./ImageRegister.css";

Modal.setAppElement("#root");

const VehicleRegistrationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [vehicleData, setVehicleData] = useState({
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

        <button id="cancel-button" type="submit">Cancelar</button>
        <button id="register-button" type="submit">Prosseguir</button>
      </Modal>
    </div>
  );
};

export default VehicleRegistrationModal;