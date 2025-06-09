import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion'; // ✅ importamos framer-motion

// Importa los estilos de slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importa los custom arrows
import { PrevArrow, NextArrow } from '../components/CustomArrow';

const imagenes = [
  '/images/imagen1.jpg',
  '/images/imagen2.jpg',
  '/images/imagen3.jpg',
  '/images/imagen4.jpg',
  '/images/imagen5.jpg',
  '/images/imagen6.jpg',
  '/images/imagen7.jpg',
  '/images/imagen8.jpg',
  '/images/imagen9.jpg',
];

const Galeria: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Container
      maxWidth={false}
      sx={{ marginTop: 0, paddingX: '1rem', paddingBottom: 0 }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontFamily: '"Cinzel", serif',
          fontWeight: 'bold',
        }}
      >
        Galería
      </Typography>

      <Box sx={{ mb: 0, pb: 0 }}>
        <Slider {...settings}>
          {imagenes.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }} // cuando aún no se ve
              whileInView={{ opacity: 1, scale: 1 }} // cuando entra en vista
              viewport={{ once: true, amount: 0.3 }} // dispara solo una vez
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src={src}
                alt={`Cabaña ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px', // opcional, bordes redondeados
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)', // opcional, sombra
                }}
              />
            </motion.div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default Galeria;
