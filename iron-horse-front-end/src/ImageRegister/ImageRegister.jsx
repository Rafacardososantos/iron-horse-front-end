import React, { useState, useRef } from 'react';
import Modal from '../components/Modal/Modal';
import api from '../utils/api';
import { useCarContext } from '../context/CarContext';
import './ImageRegister.css';

const ImageRegister = ({ onClose }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const { carData, setCarData } = useCarContext();
  const [isCarDataSubmitted, setCarDataSubmitted] = useState(false);

  const imageData = [
    { label: "Imagem de Capa ou Destaque do Anúncio", placeholder: "../img/carro-ilustracao-de-transporte.png" },
    { label: "Imagem Frontal", placeholder: "../img/vista frontal.png" },
    { label: "Imagem Traseira", placeholder: "../img/vista traseira.png" },
    { label: "Imagem Lateral Direita", placeholder: "../img/vista lateral direita.png" },
    { label: "Imagem Lateral Esquerda", placeholder: "../img/vista lateral esquerda.png" },
    { label: "Número do Chassi", placeholder: "../img/Chassi.png" },
    { label: "Número do Motor", placeholder: "../img/Numero_Motor.png" },
  ];

  const getConsentText = (key) => {
    const consentTexts = {
      checkbox1: 'A documentação do carro está em dia, entendo por como documentos o Licenciamento do Veículo que inclui o  IPVA, o DPVAT e a GRT. ',
      checkbox2: 'Os condutores NÃO podem ser fumantes e/ou NÃO devem fumar dentro de seu veículo.',
      checkbox3: 'Os valores de pedágio caso seu veículo possua Tag DEVEM ser repassados ao condutor. Se não sinalizada está opção, está de acordo com a DESATIVAÇÃO de sua Tag ao disponibilizar seu veículo durante o período de locação!',
      checkbox4: 'As multas contraídas pelos condutores de seu veículo durante a utilização ou vigência do serviço serão transferidas ao infrator respectivo. Processo que é comumente conhecido como transferência de pontuação.  ',
      checkbox5: 'O veículo caso possua modificações, as mesmas se encontram dentro das especificadas pelo fabricante. Não cabendo exceções, voltadas às modificações oriundas de customizações que estrapolam estes limites!   ',
      checkbox6: 'Atesto para os devidos fins legais que todas às informações e/ou conteúdo de imagem fornecidas são verdadeiras, se valendo e fazendo cumprir as normativas da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o Código Civil Brasileiro (Lei nº 10.406/2002) e o previsto pelo Artigo 299 do Código Penal Brasileiro, que tipifica como crime a falsidade ideológica.',
    };
    return consentTexts[key] || '';
  };

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

  const mapCheckboxes = (checkboxes) => {
    return {
      smokersAccepted: checkboxes.checkbox2,
      tagActivated: checkboxes.checkbox3,
      finesBelongToTheOffender: checkboxes.checkbox4,
      veicleModified: checkboxes.checkbox5,
      trueInformation: checkboxes.checkbox6,
      docsUptoDate: checkboxes.checkbox1,//6
    };
  };


  const [uploadedImages, setUploadedImages] = useState(Array(imageData.length).fill(null));
  const [imageIcons, setImageIcons] = useState(Array(imageData.length).fill(null));
  const fileInputRefs = useRef(imageData.map(() => React.createRef()));

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    if (type === 'checkbox') {
      setVehicleData((prevData) => ({
        ...prevData,
        consentCheckboxes: {
          ...prevData.consentCheckboxes,
          [name]: checked,
        },
      }));
    }
  };

  const handleImageClick = (index) => {
    if (fileInputRefs.current[index].current) {
      fileInputRefs.current[index].current.click();
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });

    setImageIcons((prevIcons) => {
      const newIcons = [...prevIcons];
      newIcons[index] = '../img/OK.png';
      return newIcons;
    });
  };

  const handleSubmit = async (e) => {




    e.preventDefault();
    const formData = new FormData();
    
    uploadedImages.forEach((image, index) => {
      if (image) {
        formData.append('files', image); 
      }
    });
    
    const mappedConsentData = mapCheckboxes(vehicleData.consentCheckboxes);

    formData.append('carInfoConsentsDto', JSON.stringify(mappedConsentData));

    const bearerToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch("http://localhost:8080/v1/cars", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData)
      });


      if (response.ok) {

        const data = await response.json();
        const carId = data.id;

        console.log([...formData]);
        const imageResponse = await api.post(`/car_info/image/${carId}`, formData, {
        });

        if (imageResponse.ok) {
          const data = await imageResponse.json();
        }
      } else {
        console.error('Erro ao criar o carro:', response.status, response.statusText);
        alert('Erro ao criar o carro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }

  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <h2>Cadastre seu Veículo</h2>

        {imageData.map((data, index) => (
          <div key={index}>
            <label>{data.label}</label>
            <div className="image-container" onClick={() => handleImageClick(index)}>
              <img
                src={imageIcons[index] || data.placeholder}
                alt={data.label}
                className="upload-icon"
              />
            </div>
            <input
              type="file"
              ref={fileInputRefs.current[index]}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, index)}
            />
          </div>
        ))}

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
          <button id="cancel-button" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button id="register-button" type="submit" onClick={handleSubmit}>
            Prosseguir
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageRegister;