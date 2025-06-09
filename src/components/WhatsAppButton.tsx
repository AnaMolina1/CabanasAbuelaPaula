import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+5493541673122'; // Reemplázalo con tu número de WhatsApp
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola, quiero más información!')}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        padding: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'background 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={{ width: '50px', height: '50px' }}
      />
    </a>
  );
};

export default WhatsAppButton;
