import React from 'react';
import { motion } from 'framer-motion';
//import Container from '@mui/material/Container';
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
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '40%',
            background:
              'linear-gradient(to bottom, #4A341F, rgba(74,52,31,0) 100%)',
            zIndex: 1,
          }}
        />

        {/* Texto “Cabañas Abuela Paula” en el margen superior centrado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '2rem', // distancia desde arriba
            left: 0,
            width: '100%',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#FFFFFF',
              fontFamily: '"Dancing Script", cursive',
              fontSize: { xs: '3.0rem', md: '5rem' },
              fontWeight: 9000,
              textShadow: '0 0 8px rgba(0,0,0,0.6)',
              lineHeight: 1.1,
            }}
          >
            Cabañas
            <br />
            Abuela Paula
          </Typography>
        </motion.div>

        {/* Reservá hoy (se mantiene centrado, más abajo en el hero) 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '0 rem', // margen inferior
            left: 0,
            width: '100%',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#FFFFFF',
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 750,
              textShadow: `
      -1px -1px 2px #000,
      1px -1px 2px #000,
      -1px 1px 2px #000,
      1px 1px 2px #000
    `,
            }}
          >
            Reservá hoy
          </Typography>
        </motion.div> */}
      </Box>

      {/* Sección dividida en dos columnas */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '40vh',
          marginTop: '2rem',
        }}
      >
        {/* Lado izquierdo: color durazno claro */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            backgroundColor: '#33460ee0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            clipPath: {
              xs: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
              md: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 700,
              textAlign: 'center',
              color: '#c7bfbbff',
            }}
          >
            Sobre Abuela Paula...
          </Typography>
        </Box>

        {/* Lado derecho: texto actual con fondo parallax */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            justifyContent: 'center', // 🔑 centra horizontalmente dentro del Box
            padding: '2rem',
            marginLeft: { xs: '-1.5rem', md: 0 }, // 🔑 corrección horizontal solo en mobile
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 500,
              color: '#252525ff',
              textShadow: '0 0 5px rgba(0,0,0,0.5)',
              textAlign: 'center',
              width: '100%', // 🔑 ocupa todo el ancho
              maxWidth: '600px', // 🔑 opcional: límite para no quedar demasiado ancho en desktop
              margin: '0 auto', // 🔑 asegura que quede centrado en el padre
            }}
          >
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
