import React, { useEffect, useState } from 'react';
import Home from './Home';
import Galeria from './Galeria';
import Cabañas from './Cabañas';
import Ubicacion from './Ubicacion';
import Contacto from './Contacto';
import Box from '@mui/material/Box';
import WhatsAppButton from '../components/WhatsAppButton';
import Loader from '../components/Loader';

const OnePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = performance.now();

    const timer = setTimeout(() => {
      setLoading(false);
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log(`⏱️ Página cargada en ${loadTime.toFixed(2)} ms`);

      if (loadTime > 2000) {
        console.warn(
          '⚠️ La carga ha sido lenta, revisa Firebase, imágenes o scripts externos.',
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/parallax1.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // minHeight: '100vh',
        width: '100%',
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <section
            id="inicio"
            style={{
              padding: '2rem 0',
              backgroundColor: 'rgba(255,255,255,0.5)', // fondo semitransparente
            }}
          >
            <Home />
          </section>

          <Box
            sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }}
          />

          <Box
            id="galeria"
            component="section"
            sx={{
              py: '0,5rem',
              //backgroundColor: '#eeaf42ff',
              //backgroundColor: '#2b440aff',
              //backgroundImage:
              //'linear-gradient(to bottom, #304713ff, #5b7542ff)',
              backgroundImage:
                'linear-gradient(to bottom, #de9312ff, #f2ecc8ff)',
            }}
          >
            <Galeria />
          </Box>

          <Box
            sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }}
          />

          <section
            id="cabañas"
            style={{
              padding: '0rem 0',
              //backgroundColor: '#f6f0a2f0',
              backgroundImage:
                'linear-gradient(to bottom, #b36422ff, rgba(189, 109, 43, 1))',
            }}
          >
            <Cabañas />
          </section>

          <Box
            sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }}
          />

          <section
            id="ubicacion"
            style={{
              padding: '2rem 0',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <Ubicacion />
          </section>

          <section
            id="contacto"
            style={{
              padding: '2rem 0 0 0',
              justifyContent: 'space-between', // para mantener todo centrado pero pegado abajo
              backgroundColor: '#222a1eff',
            }}
          >
            <Contacto />
          </section>

          <WhatsAppButton />
        </>
      )}
    </Box>
  );
};

export default OnePage;
