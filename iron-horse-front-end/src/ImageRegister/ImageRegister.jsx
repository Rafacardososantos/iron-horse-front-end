import { useState, useRef } from 'react';
import Modal from '../components/Modal/Modal';
import { useCarContext } from '../context/CarContext';
import './ImageRegister.css';

const VehicleRegistrationModal = ({ onClose }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const fileInputRef = useRef(null);
  const { carData, setCarData } = useCarContext();
  const [images, setImages] = useState([]);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setVehicleData((prevData) => ({
        ...prevData,
        consentCheckboxes: {
          ...prevData.consentCheckboxes,
          [name]: checked,
        },
      }));
    } else {
      setVehicleData({ ...vehicleData, [name]: value });
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    Object.keys(vehicleData.consentCheckboxes).forEach((key) => {
      formData.append(key, vehicleData.consentCheckboxes[key]);
    });

    const bearerToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:8080/v1/car_info/image/1', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Carro cadastrado com sucesso!');
        setVehicleData({
          consentCheckboxes: {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
          },
        });
      } else {
        console.error('Erro ao cadastrar o carro:', response.status, response.statusText);
        alert('Erro ao cadastrar o carro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro inesperado. Tente novamente.');
    }
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
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
          {Object.keys(vehicleData.consentCheckboxes).map((key, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name={key}
                checked={vehicleData.consentCheckboxes[key]}
                onChange={handleInputChange}
              />
              <p className="checkbox-text">{getConsentText(key)}</p>
            </label>
          ))}
        </div>

        <div className="button-container">
          <button id="cancel-button" type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
          <button id="register-button" type="submit" onClick={handleSubmit}>Prosseguir</button>
        </div>
      </Modal>
    </div>
  );
};

const getConsentText = (key) => {
  switch (key) {
    case 'checkbox1':
      return 'A documentação do carro está em dia, entendo por como documentos o Licenciamento do Veículo que inclui o IPVA, o DPVAT e a GRT.';
    case 'checkbox2':
      return 'Os condutores NÃO podem ser fumantes e/ou NÃO devem fumar dentro de seu veículo.';
    case 'checkbox3':
      return 'Os valores de pedágio caso seu veículo possua Tag DEVEM ser repassados ao condutor. Se não sinalizada esta opção, está de acordo com a DESATIVAÇÃO de sua Tag ao disponibilizar seu veículo durante o período de locação!';
    case 'checkbox4':
      return 'As multas contraídas pelos condutores de seu veículo durante a utilização ou vigência do serviço serão transferidas ao infrator respectivo. Processo que é comumente conhecido como transferência de pontuação.';
    case 'checkbox5':
      return 'O veículo caso possua modificações, as mesmas se encontram dentro das especificadas pelo fabricante. Não cabendo exceções, voltadas às modificações oriundas de customizações que extrapolam estes limites!';
    case 'checkbox6':
      return 'Atesto para os devidos fins legais que todas às informações e/ou conteúdo de imagem fornecidas são verdadeiras, se valendo e fazendo cumprir as normativas da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o Código Civil Brasileiro (Lei nº 10.406/2002) e o previsto pelo Artigo 299 do Código Penal Brasileiro, que tipifica como crime a falsidade ideológica.';
    default:
      return '';
  }
};

export default VehicleRegistrationModal;
