import React, { useEffect, useState } from 'react';
import NavigationBar from "../components/NavigationBar";
import QRCode from 'qrcode';
import styles from "./QrCodePage.module.css";
import Modal from '../components/Modal/Modal';

function QrCodePage({onClose, rentalId}) {
    const [isModalOpen, setModalOpen] = useState(true);
    const [otp, setOtp] = useState('706973');
    const [qrCodeData, setQrCodeData] = useState('');  
    const [status, setStatus] = useState('ACTIVE');
    const [isFinished, setIsFinished] = useState(false); 
    const [rentalsDetails, setRentalsDetails] = useState();

   const fetchOtp = async () => {
    try {
        // Recupera o token do localStorage
        const token = localStorage.getItem('accessToken'); // ou o nome correto da chave usada para armazenar o token
        
        if (!token) {
            console.error('Token de autenticação não encontrado');
            return;
        }

        // Faz a requisição para obter o OTP com o token no cabeçalho Authorization
        const response = await fetch(`http://localhost:8080/v1/otp/generate/${rentalId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Passando o token no cabeçalho Authorization
                'Content-Type': 'application/json', // Tipo de conteúdo, se necessário
            }
        });

        const data = await response.json();
        
        if (data) {
            setOtp(data); // Atualiza o OTP com o valor retornado
        } else {
            console.error('OTP não encontrado na resposta');
        }
    } catch (error) {
        console.error('Erro ao obter OTP:', error);
    }
};

const fetchRentalStatus = async () => {
    try {
        // Recupera o token do localStorage
        const token = localStorage.getItem('accessToken'); // ou o nome correto da chave usada para armazenar o token
        
        if (!token) {
            console.error('Token de autenticação não encontrado');
            return;
        }

        // Faz a requisição para obter o status da locação com o token no cabeçalho Authorization
        const response = await fetch(`http://localhost:8080/v1/rentals/${rentalId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Passando o token no cabeçalho Authorization
                'Content-Type': 'application/json', // Tipo de conteúdo, se necessário
            }
        });

        const data = await response.json();
        setRentalsDetails(data);

        if (data.status === "FINISHED" || data.status === "FINISHED_LATE") {
            setIsFinished(true); // Atualiza o estado para indicar que a locação foi finalizada
        } else {
            setIsFinished(false); // Caso contrário, marca como não finalizada
        }

        setStatus(data.status); // Atualiza o status da locação
    } catch (error) {
        console.error('Erro ao buscar status da locação', error);
    }
};


    useEffect(() => {
        fetchOtp();
    }, [rentalId]);

    useEffect(() => {
        fetchRentalStatus();
        console.log(rentalsDetails);
        const intervalId = setInterval(fetchRentalStatus, 10000); 

        return () => clearInterval(intervalId); 
    }, [rentalId]);

    useEffect(() => {
        if (otp) {
            QRCode.toDataURL(`http://localhost:8080/v1/rentals/finish?rentalId=${rentalId}&otp=${otp}`).then(url => {
                setQrCodeData(url);
            }).catch(err => {
                console.error('Erro ao gerar QR Code:', err);
            });
        }
    }, [otp, rentalId]);

    return (
        <Modal isOpen={isModalOpen} onClose={onClose}>
        <div className={styles.pageContainer}>
        <div className={styles.confirmationContainer}>
        {isFinished && (<div className={styles.confirmationContent}>
                <h1 className={styles.confirmationTitle}>Devolvido com sucesso! <br></br> Obrigado</h1>
                <div className={styles.confirmationIcon}>
                    <img src="./img/OK.png" alt="Ícone de Confirmação" />
                </div>
            </div>  )}
            
            {!isFinished && (<div className={styles.verificationContainer}>
                    <h2 className={styles.verificationTitle}>Verificação</h2>
                    {qrCodeData ? (
                        <div className={styles.qrcodeContainer}>
                            <img src={qrCodeData} alt="QR Code de Verificação" />
                        </div>
                    ) : (
                        <p>Carregando OTP...</p>
                    )}
                    <p className={styles.qrcodeDescription}>Escaneie o QR Code para confirmar a locação</p>
                </div>
            )}
        </div>
    </div>
    </Modal>
    );
}

export default QrCodePage;
