import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

// Importa los estilos de slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importa los custom arrows
import { PrevArrow, NextArrow } from '../components/CustomArrow';

// Importa estilos de galería
import '../styles/gallery.css';

const imagenes = [
  '/images/imggaleria/imagen1.jpg',
  '/images/imggaleria/imagen2.jpg',
  '/images/imggaleria/imagen3.jpg',
  '/images/imggaleria/imagen4.jpg',
  '/images/imggaleria/imagen5.jpg',
  '/images/imggaleria/imagen6.jpg',
  '/images/imggaleria/imagen7.jpg',
  '/images/imggaleria/imagen8.jpg',
  '/images/imggaleria/imagen9.jpg',
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
          centerMode: true,
          arrows: true,
        },
      },
    ],
  };

  return (
    <Box
      id="galeria"
      component="section"
      sx={{
        backgroundColor: 'var(--color-crema)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
       <Typography
  variant="h3"
  className="galeria-title"
  sx={{
    fontSize: { xs: "2.2rem", md: "2.7rem" }, // responsive directo
    fontFamily: "var(--font-section)",
    fontWeight: "bold",
    color: "var(--color-terracota)",
  }}
>
  Galería
</Typography>


        <Slider {...settings}>
          {imagenes.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="gallery-item"
            >
              <img src={src} alt={`Cabaña ${index + 1}`} />
              <div className="gallery-overlay">
                🔍
              </div>
            </motion.div>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Galeria;
