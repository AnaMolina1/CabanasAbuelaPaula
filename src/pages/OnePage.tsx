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
        backgroundImage: 'url(/images/parallax.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
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

          <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }} />

          <section
            id="galeria"
            style={{
              padding: '2rem 0',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <Galeria />
          </section>

          <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }} />

          <section
            id="cabañas"
            style={{
              padding: '2rem 0',
              backgroundColor: 'rgba(255, 250, 250, 0.7)',
            }}
          >
            <Cabañas />
          </section>

          <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }} />

          <section
            id="ubicacion"
            style={{
              padding: '2rem 0',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <Ubicacion />
          </section>

          <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }} />

          <section
            id="contacto"
            style={{
              padding: '2rem 0',
              backgroundColor: 'rgba(255,255,255,0.5)',
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
