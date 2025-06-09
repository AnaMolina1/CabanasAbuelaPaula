import React from 'react';
import { motion } from 'framer-motion';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const heroImage = '/images/hero.jpg';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '50vh', md: '70vh' },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Evita que el contenido se salga
          paddingX: { xs: '1rem', md: '0' }, // Añade margen en móviles
        }}
      >
        {/* Capa de overlay para oscurecer la imagen */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(146, 127, 98, 0.31)',
          }}
        />

        {/* Título con animación de entrada lenta y efecto de brillo */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          style={{ width: '100%', textAlign: 'center' }}
        >
          {/* Primera línea - "CABAÑAS" */}
          <Typography
  variant="h2"
  sx={{
    position: 'relative',
    color: 'rgba(255,255,255,0.8)', // un poco más visible pero elegante
    textAlign: 'center',
    fontWeight: 300, // más fino
    textShadow:
      '0 0 6px rgba(0,0,0,0.5)', // sombra más sutil y elegante
    fontFamily: '"Playfair Display", serif', // más elegante
    fontSize: { xs: '3rem', md: '5rem' },
    maxWidth: '90%',
    marginX: 'auto',
  }}
>
  Cabañas
</Typography>


          {/* Segunda línea - "ABUELA PAULA" */}
          <Typography
  variant="h2"
  sx={{
    position: 'relative',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: 300, // más fino
    textShadow:
      '0 0 6px rgba(0,0,0,0.5)',
    fontFamily: '"Playfair Display", serif',
    fontSize: { xs: '2.5rem', md: '4.5rem' },
    maxWidth: '90%',
    marginX: 'auto',
    marginTop: '6.5rem',
  }}
>
  Abuela Paula
</Typography>

        </motion.div>
      </Box>

      {/* Sección de presentación */}
      <Container maxWidth="lg" sx={{ marginTop: '2rem', padding: '1rem' }}>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 2, ease: 'easeOut' }}
>
  <Typography
    variant="h3"
    sx={{
      fontFamily: '"Dancing Script", cursive',
      fontWeight: 400,
      fontSize: '3rem',
      textAlign: 'center',
      color: '#444',
    }}
    gutterBottom
  >
    Descubre la magia de nuestras cabañas en Tanti, donde la tranquilidad
    se une con el encanto de las sierras. Reserva ahora y vive una
    experiencia inolvidable en medio de la naturaleza.
  </Typography>
</motion.div>

      </Container>
    </>
  );
};

export default Home;
