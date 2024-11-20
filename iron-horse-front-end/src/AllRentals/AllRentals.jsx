import { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar';
import CarOverview from "../CarOverview/CarOverview";
import styles from './AllRentals.module.css';
import QrCodePage from '../Confirmation/QrCodePage';
import api from "../utils/api";

function AllRentals() {
  const [isCarOverviewModalOpen, setIsCarOverviewModalOpen] = useState(false); 
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); 
  const [carId, setCarId] = useState(null);
  const [rentalId, setRentalId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(carData);
  }, [carData]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars/my-cars");
        if (response) {
          setCarData(response);
        } else {
          setCarData([]);
        }
      } catch (error) {
        console.error("Erro ao buscar carros", error);
        setError("Houve um erro ao carregar os carros.");
      }
    };
    fetchCars();
  }, []);

  const handleOpenModal = (id) => {
    setCarId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCarId(null);
  }

  const handleOpenConfirmationModal = (car) => {
    if (car.status === "ACTIVE") {
      setRentalId(car.rentalId);
      setIsConfirmationModalOpen(true);
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

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
                <img
                  src={car.image || '/img/2021 dodge-charger-rt.jpg'}
                  alt={car.name || 'Carro'}
                  className={styles.carImage}
                />
                <div className={styles.carInfo}>
                  <h3>{car.brand + ' ' + car.model + ' ' + car.manufactureYear || 'Nome do Carro'}</h3>
                  <p>
                    {car.rating} ★ ({car.trips} viagens)
                  </p>
                  <p>{car.location}</p>
                  <p>R$ {car.price?.toFixed(2)}</p>
                </div>

                <div className={styles.iconContainer}>
                  <img
                    src="/img/Car-devolution.png"
                    alt="Devolver"
                    className={`${styles.icon} ${car.status !== "ACTIVE" ? styles.disabledIcon : ""}`}
                    style={{
                      cursor: car.status === "ACTIVE" ? "pointer" : "not-allowed",
                      opacity: car.status !== "ACTIVE" ? 0.5 : 1
                    }}
                    title="Devolver"
                    onClick={() => handleOpenConfirmationModal(car)} 
                  />
                  <img
                    src="/img/icon.png"
                    alt="Editar"
                    className={styles.icon}
                    title="Editar"
                    onClick={() => handleOpenModal(car)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CarOverview onClose={handleCloseModal} car={carId} />
      )}
        {isConfirmationModalOpen && (
                <QrCodePage onClose={handleCloseConfirmationModal} rentalId={rentalId} />
            )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
}

export default AllRentals;
