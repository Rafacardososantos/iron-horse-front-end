import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./RentPopup.module.css";

Modal.setAppElement("#root");

const RentPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    birthday: "",
    cnh: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
    cpf: "",
    numeroCartao: "",
    nomeCartao: "",
    validade: "",
    cvv: "",
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
    },
  });

  const [isRenting, setIsRenting] = useState(true);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleToggle = (isRent) => {
    setIsRenting(isRent);
  };

  const getCardType = (number) => {
    const cardTypes = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6/,
    };

    for (const [card, pattern] of Object.entries(cardTypes)) {
      if (pattern.test(number)) return card;
    }
    return "default";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend ou processá-los conforme necessário.
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Abrir Popup</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.reactModalContent} 
        overlayClassName={styles.reactModalOverlay} 
      >
        <h2>Crie a Sua Conta</h2>
        <div className={styles.toggleButtons}>
          <button
            onClick={() => handleToggle(true)}
            className={isRenting ? styles.active : ""}
          >
            Alugar
          </button>
          <button
            onClick={() => handleToggle(false)}
            className={!isRenting ? styles.active : ""}
          >
            Anunciar
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Dados Pessoais</label>
            <input
              type="date"
              name="birthday"
              placeholder="Data de Nascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="number_driver_license"
              placeholder="CNH"
              value={formData.cnh}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Endereço:</label>
            <input
              type="text"
              name="street_name"
              placeholder="Rua"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="number"
              placeholder="Número"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="district"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="zipcode"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>CPF do Titular:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          {isRenting && (
            <div className={styles.creditCard}>
              <div className={styles.creditCardNumber}>
                <label>Número do Cartão:</label>
                <div className={styles.creditCardInput}>
                  <input
                    type="text"
                    name="numeroCartao"
                    value={formData.numeroCartao}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className={`${styles.cardFlag} ${styles[getCardType(formData.numeroCartao)]}`}
                  ></div>
                </div>
              </div>
              <div className={styles.creditCardName}>
                <label>Nome no Cartão:</label>
                <input
                  type="text"
                  name="nomeCartao"
                  value={formData.nomeCartao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.creditCardValidity}>
                <label>Validade:</label>
                <input
                  type="text"
                  name="validade"
                  value={formData.validade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.creditCardCvv}>
                <label>CVV:</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="checkbox1"
                checked={formData.checkboxes.checkbox1}
                onChange={handleChange}
              />
              <span>Aceita receber comunicações via WhatsApp</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox2"
                checked={formData.checkboxes.checkbox2}
                onChange={handleChange}
              />
              <span>Aceita os Termos de Uso</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox3"
                checked={formData.checkboxes.checkbox3}
                onChange={handleChange}
              />
              <span>Aceita a Política de Privacidade</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox4"
                checked={formData.checkboxes.checkbox4}
                onChange={handleChange}
              />
              <span>
                Estou devidamente regularizado e sem nenhuma pendência nos
                órgãos de trânsito (DETRAN e DENATRAN).
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox5"
                checked={formData.checkboxes.checkbox5}
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
          <button id="register-button" type="submit">
            Registrar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default RentPopup;
