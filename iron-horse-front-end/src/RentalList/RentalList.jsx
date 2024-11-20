import { useState, useEffect } from "react";
//import api from "../utils/api";
import NavigationBar from "../components/NavigationBar";
import '../components/Home/Home.css';
import './RentalList.css'


function translateStatus(status) {
    const translations = {
        ACTIVE: "Ativo",
        EXPIRED: "Expirado",
        PENDING: "Pendente",
        FINISHED: "Finalizado",
        FINISHED_LATE: "Finalizado com Atraso",
        CANCELED: "Cancelado"
    };

    return translations[status] || "Desconhecido";
}

function RentalList() {
    const [data, setData] = useState([]);
    //const token = localStorage.getItem("accessToken");

    /*if (!token) {
        return <div>Token não encontrado. Faça o login novamente.</div>;
    }

    useEffect(() => {
        console.log("componente renderizado!!");
        const fetchRentals = async () => {
            try {
                const response = await api.get("/rentals", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log("Dados retornados:", response.data);
                setData(response);
            } catch (error) {
                console.error("Erro! Dados não localizados", error);
            }
        };
        fetchRentals();
    }, [token]);*/
    // Simulando dados para exibição
    useEffect(() => {
        const mockData = [
            {
                photo: "https://via.placeholder.com/150",
                id: 1,
                status: "ACTIVE",
                startDate: "2024-07-08",
                expectedEndDate: "2024-07-10",
                realEndDate: null,
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 2,
                status: "FINISHED",
                startDate: "2024-03-20",
                expectedEndDate: "2024-03-22",
                realEndDate: "2024-03-22",
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 3,
                status: "CANCELED",
                startDate: "2023-09-25",
                expectedEndDate: "2023-09-26",
                realEndDate: null,
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 4,
                status: "ACTIVE",
                startDate: "2024-07-08",
                expectedEndDate: "2024-07-10",
                realEndDate: null,
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 5,
                status: "FINISHED",
                startDate: "2024-03-20",
                expectedEndDate: "2024-03-22",
                realEndDate: "2024-03-22",
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 6,
                status: "CANCELED",
                startDate: "2023-09-25",
                expectedEndDate: "2023-09-26",
                realEndDate: null,
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 7,
                status: "ACTIVE",
                startDate: "2024-07-08",
                expectedEndDate: "2024-07-10",
                realEndDate: null,
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 8,
                status: "FINISHED",
                startDate: "2024-03-20",
                expectedEndDate: "2024-03-22",
                realEndDate: "2024-03-22",
            },
            {
                photo: "https://via.placeholder.com/150",
                id: 9,
                status: "CANCELED",
                startDate: "2023-09-25",
                expectedEndDate: "2023-09-26",
                realEndDate: null,
            },
        ];
        setData(mockData);
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="minhas-viagens">
                <br />
                <h2>Minhas Locações</h2>
                <br />
                <div className="car-list">
                    {data.map((rental) => (
                        <div key={rental.id} className="car-card">
                            {/* Imagem do veículo */}
                            <img
                                src={(rental.photo)}
                                alt={`Veículo ${rental.id}`}
                            />
                            {/* Informações do veículo */}
                            <div className="car-info">
                                <ul>
                                    <li><p className="id">ID Locação: {rental.id}</p></li>
                                    <li><strong>Status:</strong> {translateStatus(rental.status)}</li>
                                    <li><strong>Data Início:</strong> {new Date(rental.startDate).toLocaleDateString()}</li>
                                    <li><strong>Data Final:</strong> {new Date(rental.expectedEndDate).toLocaleDateString()}</li>
                                    <li>
                                        <strong>Data Real de Finalização:</strong>{" "}
                                        {rental.realEndDate
                                            ? new Date(rental.realEndDate).toLocaleDateString()
                                            : "N/A"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RentalList;
