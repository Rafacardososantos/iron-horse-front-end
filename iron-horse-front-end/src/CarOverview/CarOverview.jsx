/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./CarOverview.module.css";
import Modal from "../components/Modal/Modal";
import api from "../utils/api";

const CarOverview = ({ onClose, carId, carName }) => {
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(true);
  const [carValue, setCarValue] = useState("");
  const [description, setDescription] = useState("");

  const formatCurrency = (value) => {
    if (!value) return "";
    const number = parseFloat(value.replace(/\D/g, "")) / 100; // Remove não-numéricos e ajusta para decimal
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const numberValue = parseFloat(rawValue) / 100;

    if (numberValue < 0) {
      setError("O valor não pode ser negativo!");
    } else {
      setError("");
      setCarValue(rawValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/car-overviews/${carId}`, { carValue, description });

      if (response.success) {
        alert("Informações do carro salvas com sucesso");
        onClose();
      } else {
        console.error("Erro ao salvar informações do carro", carName);
      }
    } catch (error) {
      console.error("Erro ao enviar dados do carro", carName);
      setError(
        "Erro ao salvar informações do carro: " + error.response?.data?.title
      );
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className={styles.CarOverview}>
        <h2>Informações do Carro</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="text"
            placeholder="Valor da diária do carro"
            value={formatCurrency(carValue)} // Exibe o valor formatado
            onChange={handleChange} // Manipula a entrada e validação
            className={styles.carInput}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
            className={styles.descriptionInput}
          />

          <p>{description.length}/255 caracteres</p>
          <button type="submit" className={styles.saveBtn}>
            Salvar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CarOverview;
