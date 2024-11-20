import { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar';
import CarOverview from "../CarOverview/CarOverview";
import styles from './AllRentals.module.css';
import api from "../utils/api";

function AllRentals() {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [carData, setCarData] = useState([]);
  const [error, setError] = useState("");


  const carData = [
    {
      id: 1,
      name: "BYD Dolphin 2024",
      rating: 5.7,
      trips: 2,
      location: "Porto Alegre, RS",
      price: 276.0,
      image: "/img/Hatch background4.jpg",
      status: "cancelado"
    },
    {
      id: 2,
      name: "Honda City Hatchback 2023",
      rating: 4.7,
      trips: 2,
      location: "Porto Alegre, RS",
      price: 576.0,
      image: "/img/Hatch background3.jpg",
      status: "finalizado"
    },
    {
      id: 3,
      name: "Dodge Charger R/T V8 2021",
      rating: 8.5,
      trips: 5,
      location: "Porto Alegre, RS",
      price: 1543.0,
      image: "/img/Hatch background2.jpg",
      status: "expirado"
    },
    {
      id: 4,
      name: "Renault Kwid 2022",
      rating: 3.2,
      trips: 5,
      location: "Porto Alegre, RS",
      price: 259.0,
      image: "/img/Hatch background1.jpg",
      status: "ativo"
    },
    {
      id: 5,
      name: "BYD SEAL 2023",
      rating: 9.5,
      trips: 5,
      location: "Porto Alegre, RS",
      price: 1759.0,
      image: "/img/oculos-de-sol-rayban-aviador-preto-polarizado-cristal.jpg",
      status: "ativo"
    },
    {
      id: 6,
      name: "Citroën C3 2023",
      rating: 7.2,
      trips: 5,
      location: "Porto Alegre, RS",
      price: 472.0,
      image: "/img/2021 dodge-charger-rt.jpg",
      status: "ativo"
    },
  ];

    // Função para buscar carros da API
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await api.get("/car/list"); // Substitua pelo endpoint correto
          if (response.data && response.data.length > 0) {
            setCarData(response.data);
          } else {
            setCarData([]); // Se não houver carros, mantém a lista vazia
          }
        } catch (error) {
          console.error("Erro ao buscar carros", error);
          setError("Houve um erro ao carregar os carros.");
        }
      };
      fetchCars();
    }, []);

  const handleOpenModal = (carId) => {
    setSelectedCarId(carId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCarId(null);
  }

  return (
    <>
      <NavigationBar />
      <div className={styles.mainContainer}>
        <h2>Meus carros anunciados</h2>
        
        {carData.length === 0 ? (
          <p className={styles.noCarsMessage}>Você não possui carros registrados.</p>
        ) : (
          <div className={styles.cardsContainer}>
            {carData.map((car) => (
              <div key={car.id} className={styles.carCard}>
                <img src={car.image} alt={car.name} className={styles.carImage} />
                <div className={styles.carInfo}>
                  <h3>{car.name}</h3>
                  <p>
                    {car.rating} ★ ({car.trips} viagens)
                  </p>
                  <p>{car.location}</p>
                  <p>R$ {car.price.toFixed(2)}</p>
                </div>

                <div className={styles.iconContainer}>
                  <img
                    src="/img/Car-devolution.png"
                    alt="Devolver"
                    className={`${styles.icon} ${car.status !== "ativo" ? styles.disabledIcon : ""} `}
                    style={{ cursor: car.status === "ativo" ? "pointer" : "not-allowed", opacity: car.status !== "ativo" ? 0.5 : 1 }}
                    title="Devolver"
                    onClick={() => handleOpenModal(car.id)}
                  />
                  <img
                    src="/img/icon.png"
                    alt="Editar"
                    className={styles.icon}
                    title="Editar"
                    onClick={() => handleOpenModal(car.id)} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isModalOpen && (
        <CarOverview onClose={handleCloseModal} carId={selectedCarId} />
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
}

export default AllRentals;
