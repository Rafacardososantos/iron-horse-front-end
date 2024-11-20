import NavigationBar from "../components/NavigationBar";
import styles from "./QrCodePage.module.css";

function Confirmation() {
    return (
        <div className={styles.pageContainer}>
            <NavigationBar />
            <div className={styles.confirmationContainer}>
                <div className={styles.confirmationContent}>
                    <h1 className={styles.confirmationTitle}>Viagem Confirmada!</h1>
                    <div className={styles.confirmationIcon}>
                        <img src="../img/Check_img.png" alt="Ícone de Confirmação" />
                    </div>
                    <p className={styles.confirmationDate}>09 de Outubro de 2024</p>
                    <p className={styles.confirmationTime}>20:35</p>
                    <button className={styles.confirmationButton}>Avançar</button>
                </div>
                <div className={styles.verificationContainer}>
                    <h2 className={styles.verificationTitle}>Verificação</h2>
                    <img src="../img/QR_code_img.png" alt="QR Code" className={styles.qrcodeImage} />
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
