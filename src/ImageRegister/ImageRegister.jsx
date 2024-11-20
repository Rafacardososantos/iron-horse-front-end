import { useState, useRef } from "react";
import styles from "./ImageRegister.module.css"; 

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

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Cadastre seu Veículo</h2>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <img src="../img/carro-ilustracao-de-transporte.png" alt="Logo" className={styles.modalImage} />
        
            <label>Imagens do Veículo</label>
            <span>Imagem de Capa ou Destaque do Anúncio</span>
            <div className={styles.imageContainer} onClick={handleImageClick}>
              <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className={styles.uploadIcon} />
            </div>

            <span>Imagens que compõem o Anúncio e Protocolares para o Seguro:</span>
            <span>Imagem Frontal</span>
            <img src="../img/vista frontal.png" alt="Vista Frontal" className={styles.carImage} />
            <div className={styles.imageContainer} onClick={handleImageClick}>
              <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className={styles.uploadIcon} />
            </div>

            <span>Imagem Traseira</span>
            <img src="../img/vista traseira.png" alt="Vista Traseira" className={styles.carImage} />
            <div className={styles.imageContainer} onClick={handleImageClick}>
              <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className={styles.uploadIcon} />
            </div>

            <span>Imagem Lateral Direita</span>
            <img src="../img/vista lateral direita.png" alt="Lateral Direita" className={styles.lateralCarImage} />
            <div className={styles.imageContainer} onClick={handleImageClick}>
              <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className={styles.uploadIcon} />
            </div>

            <span>Imagem Lateral Esquerda</span>
            <img src="../img/vista lateral esquerda.png" alt="Lateral Esquerda" className={styles.lateralCarImage} />
            <div className={styles.imageContainer} onClick={handleImageClick}>
              <img src="../img/Nuvem_Upload_Transparente_Seta.png" alt="Upload" className={styles.uploadIcon} />
            </div>
            
            <label>Consentimento</label>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="checkbox1" checked={vehicleData.consentCheckboxes.checkbox1} onChange={handleInputChange} />
                <p className={styles.checkboxText}>A documentação do carro está em dia...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox2" checked={vehicleData.consentCheckboxes.checkbox2} onChange={handleInputChange} />
                <p className={styles.checkboxText}>Os condutores NÃO podem ser fumantes...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox3" checked={vehicleData.consentCheckboxes.checkbox3} onChange={handleInputChange} />
                <p className={styles.checkboxText}>Os valores de pedágio...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox4" checked={vehicleData.consentCheckboxes.checkbox4} onChange={handleInputChange} />
                <p className={styles.checkboxText}>As multas contraídas...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox5" checked={vehicleData.consentCheckboxes.checkbox5} onChange={handleInputChange} />
                <p className={styles.checkboxText}>O veículo caso possua modificações...</p>
              </label>
              <label>
                <input type="checkbox" name="checkbox6" checked={vehicleData.consentCheckboxes.checkbox6} onChange={handleInputChange} />
                <p className={styles.checkboxText}>Atesto para os devidos fins legais...</p>
              </label>
            </div>

            <div className={styles.buttonContainer}>
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
