import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

import '../styles/contacto.css'; // 👈 importa tu CSS nuevo
import Link from '@mui/material/Link';

const Contacto: React.FC = () => {
  return (
    <section className="contacto-wrapper">
      <Box className="contacto-box">
       
          <Typography
  variant="h3"
  className="galeria-title"
  sx={{
    fontSize: { xs: "2.2rem", md: "2.7rem" }, // responsive directo
    fontFamily: "var(--font-section)",
    fontWeight: "bold",
    color: "var(--color-terracota)",
    marginBottom: { xs: '1.5rem', md: '2.5rem' }, // 👈 separación extra
  }}
>
            Contacto
          </Typography>

         <Grid container spacing={1}>
  {/* Dirección (texto plano) */}
<Grid item xs={12} sm={12} className="contacto-item">
  <LocationOnIcon sx={{ fontSize: 36 }} className="contacto-icon" />
  <Typography
    variant="h6"
    sx={{
      fontFamily: 'var(--font-section)',
      color: 'var(--color-oliva-oscuro)',
      fontWeight: 550,
      fontSize: { xs: '0.95rem', md: '1.1rem' }, // 📱 mobile / 💻 desktop
      lineHeight: 1.4,
    }}
  >
    Calle 123, Tanti, Córdoba, Argentina
  </Typography>
</Grid>

{/* WhatsApp */}
<Grid item xs={12} sm={12} className="contacto-item">
  <WhatsAppIcon sx={{ fontSize: 36 }} className="contacto-icon" />
  <Typography
    variant="h6"
    sx={{
      fontFamily: 'var(--font-section)',
      color: 'var(--color-oliva-oscuro)',
      fontWeight: 550,
      fontSize: { xs: '0.95rem', md: '1.1rem' },
      lineHeight: 1.4,
    }}
  >
    <Link
      href="https://wa.me/541234567890"
      className="contacto-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      +54 123 456 7890
    </Link>
  </Typography>
</Grid>

{/* Instagram */}
<Grid item xs={12} sm={12} className="contacto-item">
  <InstagramIcon sx={{ fontSize: 36 }} className="contacto-icon" />
  <Typography
    variant="h6"
    sx={{
      fontFamily: 'var(--font-section)',
      color: 'var(--color-oliva-oscuro)',
      fontWeight: 550,
      fontSize: { xs: '0.95rem', md: '1.1rem' },
      lineHeight: 1.4,
    }}
  >
    <Link
      href="https://www.instagram.com/abuelapaulatanti/?hl=es-la"
      className="contacto-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      @abuelapaulatanti
    </Link>
  </Typography>
</Grid>
</Grid>


        
      </Box>
    </section>
  );
};

export default Contacto;
