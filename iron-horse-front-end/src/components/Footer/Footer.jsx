import React from 'react';
import './Footer.css';

const Footer = ({ onOpenModal }) => {
  const footerItems = [
    { label: 'Termos de Uso', id: 'termos' },
    { label: 'Política de Privacidade', id: 'privacidade' },
    { label: 'Avisos Legais', id: 'avisos' },
    { label: 'Suporte', id: 'suporte' },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-items">
        {footerItems.map((item) => (
          <span
            key={item.id}
            className="footer-item"
            onClick={() => onOpenModal(item.id)}
          >
            {item.label}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
