import { useState } from "react";
import NavigationBar from "../NavigationBar";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import './Home.css';
import Carousel from "../Carousel/Carousel";
import Modal from "../Modal/Modal"; // Certifique-se de que o Modal está sendo importado corretamente
import TermsOfUse from "../Footer/Options/TermsOfUse"; // Certifique-se de importar os componentes de cada modal
import PrivacyPolicy from "../Footer/Options/PrivacyPolicy"; // Importando o componente de Política de Privacidade
import LegalNotice from "../Footer/Options/LegalNotice";
import Support from "../Footer/Options/Support";


function Home() {
    const [activePopup, setActivePopup] = useState(null);

    const openPopup = (popupType) => {
        setActivePopup(popupType);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    return (
        <>
            <div className="home-main-container">
                 <NavigationBar />
                <main>
                    <SearchBar />
                    <Carousel />
                    <h2>Alugue praticamente qualquer carro, em qualquer lugar!</h2>
                </main>

                <Footer onOpenModal={openPopup} />
            </div>

            {activePopup === "termos" && (
                <Modal isOpen={true} onClose={closePopup}>
                    <TermsOfUse />
                </Modal>
            )}

            {activePopup === "privacidade" && (
                <Modal isOpen={true} onClose={closePopup}>
                    <PrivacyPolicy />
                </Modal>
            )}

            {activePopup === "avisos" && (
                <Modal isOpen={true} onClose={closePopup}>
                    <LegalNotice />
                </Modal>
            )}

            {activePopup === "suporte" && (
                <Modal isOpen={true} onClose={closePopup}>
                    <Support />
                </Modal>
            )}
        </>
    );
}

export default Home;
