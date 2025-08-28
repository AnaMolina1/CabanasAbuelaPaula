import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+5493541673122';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola, quiero más información!')}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 9999,
      }}
    >
      {/* Botón de WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#25D366',
          borderRadius: '50%',
          padding: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{
            width: '50px',
            height: '50px',
          }}
          className="whatsapp-icon"
        />
      </a>

      {/* Cartel clickeable debajo */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#ffffffee',
          color: '#0d6c30ff',
          padding: '6px 14px',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          fontWeight: 'bold',
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '1rem',
          textDecoration: 'none',
          textAlign: 'center',
          maxWidth: '100%',
        }}
        className="reserva-label"
      >
        Reservá acá
      </a>

      {/* Estilos responsivos embebidos */}
      <style>
        {`
          @media (max-width: 600px) {
            .whatsapp-icon {
              width: 40px !important;
              height: 40px !important;
            }
            .reserva-label {
              font-size: 0.8rem !important;
              padding: 4px 10px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default WhatsAppButton;
