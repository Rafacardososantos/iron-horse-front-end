import NavigationBar from "../components/NavigationBar";
import "./Confirmation.css";

function Confirmation() {
    return (
            <div className="container">
                <NavigationBar />
                <h2 className="confirmation-title">Confirmação</h2>
                <div className="confirmation-modal">
                    <div className="trip-details">
                        <h3>Dados da Viagem</h3>
                        <p><span className="highlight">• 10 de Outubro de 2024</span></p>
                        <p>Veículo: <em>Dodge Charger R/T V8 2021</em></p>
                        <p>Faixa Determinada: 08:00 – 16:50</p>
                        <p>Duração: 0 dias 08h 50 min</p>
                        <p>Local de Retirada: Cais do Porto - Largo do Trabalho, 46</p>
                        
                        <h4>Forma de Pagamento</h4>
                        <p>Cartão de Crédito: 6 x 279,16</p>
                        <p>Total: <span className="highlight">R$ 1675,00</span></p>
                        <p>CPF: 572.430.710-31</p>
                    </div>
                    <div className="buttons">
                        <button className="cancel-button">Cancelar</button>
                        <button className="confirm-button">Confirmar</button>
                    </div>
                </div>
            </div>
    );
}

export default Confirmation;
