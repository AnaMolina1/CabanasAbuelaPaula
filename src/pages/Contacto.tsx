import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

import '../styles/contacto.css'; // 👈 importa tu CSS nuevo

const Contacto: React.FC = () => {
  return (
    <section className="contacto-wrapper">
      <Box className="contacto-box">
       
          <Typography variant="h2" className="contacto-title">
            Contacto
          </Typography>

          <Grid container spacing={2}>
            {/* Dirección */}
            <Grid item xs={12} sm={12} className="contacto-item">
              <LocationOnIcon className="contacto-icon" />
              <Typography variant="h6">
                Dirección: Calle 123, Tanti, Córdoba, Argentina
              </Typography>
            </Grid>

            {/* WhatsApp */}
            <Grid item xs={12} sm={12} className="contacto-item">
              <WhatsAppIcon className="contacto-icon" />
              <Typography variant="h6">
                WhatsApp:{' '}
                <Link
                  href="https://wa.me/541234567890"
                  className="contacto-link"
                >
                  +54 123 456 7890
                </Link>
              </Typography>
            </Grid>

            {/* Instagram */}
            <Grid item xs={12} sm={12} className="contacto-item">
              <InstagramIcon className="contacto-icon" />
              <Typography variant="h6">
                Instagram:{' '}
                <Link
                  href="https://www.instagram.com/abuelapaulatanti/?hl=es-la"
                  className="contacto-link"
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
