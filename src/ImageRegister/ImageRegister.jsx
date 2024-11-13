import { useState, useRef } from "react";
import "./ImageRegister.css";

const VehicleRegistrationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [vehicleData, setVehicleData] = useState({
    consentCheckboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
      checkbox6: false,
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
                <p className="checkbox-text">A documentação do carro está em dia...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox2" checked={vehicleData.consentCheckboxes.checkbox2} onChange={handleInputChange} />
                <p className="checkbox-text">Os condutores NÃO podem ser fumantes...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox3" checked={vehicleData.consentCheckboxes.checkbox3} onChange={handleInputChange} />
                <p className="checkbox-text">Os valores de pedágio...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox4" checked={vehicleData.consentCheckboxes.checkbox4} onChange={handleInputChange} />
                <p className="checkbox-text">As multas contraídas...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox5" checked={vehicleData.consentCheckboxes.checkbox5} onChange={handleInputChange} />
                <p className="checkbox-text">O veículo caso possua modificações...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox6" checked={vehicleData.consentCheckboxes.checkbox6} onChange={handleInputChange} />
                <p className="checkbox-text">Atesto para os devidos fins legais...</p>
              </label>
            </div>

            <div className="button-container">
              <button id="cancel-button" type="button" onClick={closeModal}>Cancelar</button>
              <button id="register-button" type="submit" onClick={handleSubmit}>Prosseguir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleRegistrationModal;
