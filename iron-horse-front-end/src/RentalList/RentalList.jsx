import { useState, useEffect } from "react";
import api from "../utils/api";
import NavigationBar from "../components/NavigationBar";
import '../components/Home/Home.css';
import styles from './RentalList.module.css'


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

function RentaList () {
    const [data, setData] = useState([]);
    const token = localStorage.getItem("accessToken");

    if (!token) {
        return <div>Token não encontrado. Faça o login novamente.</div>;
    }

    useEffect(  () => {
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
            }catch (error) {
                console.error("Erro! Dados não localizados", error);
            }
        };
        fetchRentals();
    }, [token]);
    return (
        <>
        <NavigationBar/>
        <div className="home-main-container">
            <table>
                <thead>
                    <tr>
                        <th>ID locação</th>
                        <th>Status</th>
                        <th>Data início locação</th>
                        <th>Data final locação</th>
                        <th>Data real de finalização</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rental) => (
                         <tr key={rental.id}>
                         <td>{rental.id}</td>
                         <td>{translateStatus(rental.status)}</td>
                         <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                         <td>{new Date(rental.expectedEndDate).toLocaleDateString()}</td>
                         <td>
                         {console.log(rental.realEndDate)}
                            {rental.realEndDate ? new Date(rental.realEndDate).toLocaleDateString() : 'N/A'}
                         </td>
                     </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default RentaList;