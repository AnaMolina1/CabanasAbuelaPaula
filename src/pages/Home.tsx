import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../styles/home.css';



const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Box id="hero">
  <div className="hero-overlay">
    <Typography variant="h2" className="hero-title">
      Cabañas Abuela Paula
    </Typography>
  </div>
</Box>


      {/* Sección dividida en dos columnas */}
      <Box className="about-section">
        {/* Lado izquierdo */}
        <Box className="about-left">
          <Typography
  className="about-title"
  sx={{
    fontSize: { xs: '2rem', sm: '2rem', md: '2.5rem' }, // se adapta
    lineHeight: 1.2,
    fontWeight: 400, // más liviano que el título principal
    textAlign: 'center',
    overflowWrap: 'break-word',   // ✅ estándar moderno
    wordBreak: 'break-word',      // fallback
    hyphens: 'auto',              // corta con guiones si hace falta
  }}
>
  Sobre Abuela Paula...
</Typography>
        </Box>

        {/* Lado derecho */}
        <Box className="about-right">
          <Typography className="about-text">
            Descubre la magia de nuestras cabañas en Tanti, donde la
            tranquilidad se une con el encanto de las sierras. Reserva ahora y
            vive una experiencia inolvidable en medio de la naturaleza.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
