import React, { useEffect, useState } from 'react';
import Home from './Home';
import Galeria from './Galeria';
import Cabañas from './Cabañas';
import Ubicacion from './Ubicacion';
import Contacto from './Contacto';
import Box from '@mui/material/Box';
import WhatsAppButton from '../components/WhatsAppButton';
import Loader from '../components/Loader';
import '../styles/onepage.css';
import '../styles/contacto.css';
import '../styles/footer.css';



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
          '⚠️ La carga ha sido lenta, revisa Firebase, imágenes o scripts externos.'
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ backgroundColor: 'var(--color-crema)', width: '100%' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Hero */}
          <section id="inicio" className="section-light">
            <Home />
          </section>

          {/* Galería */}
          <section id="galeria" className="section-dark">
            <Galeria />
          </section>

          {/* Nuestras Cabañas */}
          <section id="cabañas" className="section-light">
            <Cabañas />
          </section>

          {/* Ubicación */}
          <section id="ubicacion" className="section-dark">
            <Ubicacion />
          </section>

          {/* Contacto + Footer */}
        {/* Contacto */}
<section id="contacto" className="contacto-wrapper">
  <Box className="contacto-box">
    <Contacto />
  </Box>
</section>

{/* Footer */}
<Box component="footer" className="footer">
  © Cabañas Abuela Paula, 2025.{' '}
  <a href="/privacidad" className="footer-link">
    Política de privacidad
  </a>
</Box>
          {/* WhatsApp flotante */}
          <WhatsAppButton />
        </>
      )}
    </Box>
  );
};

export default OnePage;
