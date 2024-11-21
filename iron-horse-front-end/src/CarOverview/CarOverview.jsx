/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./CarOverview.module.css";
import Modal from "../components/Modal/Modal";
import api from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarOverview = ({ onClose, car }) => {
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(true);
  const [carValue, setCarValue] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await fetch(`http://localhost:8080/v1/car-overviews/${car.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os detalhes do carro');
        }

        const carData = await response.json();
        console.log(carData);
        setDescription(carData.description || "sem nada");
        setCarValue(carData.price || "");
        setIsActive(carData.isActive);
        setIsAvailable(true);

        console.log(carData.description, carData.price, carData.isActive, true);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do carro", error);
        setError("Erro ao carregar os detalhes do carro.");
      }
    };

    if (car.id) {
      fetchCarDetails();
    }
  }, [car]);


  useEffect(() => {
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const price = carValue ? parseFloat(carValue) : null;

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch(`http://localhost:8080/v1/car-overviews/${car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          description,
          isActive,
          isAvailable,
          price,
        }),
      });

      if (response.ok) {
        toast.success('Dados modificados com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

    } catch (error) {
      console.error("Erro ao enviar dados do carro", error);
      setError("Erro ao salvar informações do carro: " + error.message);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    const number = parseFloat(value) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setCarValue(rawValue);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <ToastContainer />
      <div className={styles.CarOverview}>
        <h2>Informações do Carro</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.toggleContainer}>
            <label className={`${styles.toggleButton} ${isActive ? styles.active : styles.inactive}`}>
              {isActive ? "Ativo" : "Inativo"}
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className={styles.hiddenCheckbox}
              />
            </label>
          </div>

          <input
            type="number"
            placeholder="Valor da diária do carro"
            value={carValue}
            onChange={handleChange}
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
