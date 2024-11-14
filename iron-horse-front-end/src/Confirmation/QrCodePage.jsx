import NavigationBar from "../components/NavigationBar";
import "./QrCodePage.css";

function Confirmation() {
    return (
        <div className="confirmation-container">
            <NavigationBar />
            <h1 className="confirmation-title">Viagem Confirmada!</h1>
            <div className="confirmation-content">
                <div className="confirmation-icon">
                    <img src="../img/Check_img.png" alt="Ícone de Confirmação" />
                </div>
                <p className="confirmation-date">09 de Outubro de 2024</p>
                <p className="confirmation-time">20:35</p>
                <button className="confirmation-button">Avançar</button>
            </div>
            <div className="verification-container">
                <h2 className="verification-title">Verificação</h2>
                <img src="../img/QR_code_img.png" alt="QR Code" className="qrcode-image" />
            </div>
        </div>
    );
}

export default Confirmation;
