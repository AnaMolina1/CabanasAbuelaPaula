// src/pages/Contacto.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contacto: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'grey.100',
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontFamily: '"Cinzel", serif',

            fontWeight: 'bold',
          }}
        >
          Contacto
        </Typography>

        <Grid container spacing={2}>
  {/* Dirección arriba en toda la fila */}
  <Grid
    item
    xs={12}
    sm={12}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // centrar el contenido
      textAlign: 'center',
    }}
  >
    <LocationOnIcon sx={{ mr: 1 }} />
    <Typography variant="body1">
      Dirección: Calle 123, Tanti, Córdoba, Argentina
    </Typography>
  </Grid>

  {/* WhatsApp */}
  <Grid
    item
    xs={12}
    sm={6}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // centrar el contenido
      textAlign: 'center',
    }}
  >
    <WhatsAppIcon sx={{ mr: 1 }} />
    <Typography variant="body1">
      WhatsApp:{' '}
      <Link
        href="https://wa.me/541234567890"
        color="inherit"
        underline="hover"
      >
        +54 123 456 7890
      </Link>
    </Typography>
  </Grid>

  {/* Instagram */}
  <Grid
    item
    xs={12}
    sm={6}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // centrar el contenido
      textAlign: 'center',
    }}
  >
    <InstagramIcon sx={{ mr: 1 }} />
    <Typography variant="body1">
      Instagram:{' '}
      <Link
        href="https://www.instagram.com/abuelapaulatanti/?hl=es-la"
        color="inherit"
        underline="hover"
      >
        @abuelapaulatanti
      </Link>
    </Typography>
  </Grid>
</Grid>

      </Container>
    </Box>
  );
};

export default Contacto;
