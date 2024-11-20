/* eslint-disable react/prop-types */
import { useState } from "react";
import "./CarOverview.module.css";
import Modal from "../components/Modal/Modal";
import api from "../utils/api";

const CarOverview = ({ onClose }) => {
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(true);
  const [carValue, setCarValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/car/add", { carValue, description });

      if (response.success) {
        alert("Informações do carro salvas com sucesso");
        onClose();
      } else {
        console.error("Erro ao salvar informações do carro");
      }
    } catch (error) {
      console.error("Erro ao enviar dados do carro", error);
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
          <input
            type="number"
            placeholder="Valor da diária do carro"
            value={carValue}
            onChange={(e) => setCarValue(e.target.value)}
            className={styles.carInput}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.descriptionInput}
          />
          <button type="submit" className={styles.saveBtn}>
            Salvar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CarOverview;
