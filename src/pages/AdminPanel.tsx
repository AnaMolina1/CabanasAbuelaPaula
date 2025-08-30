// src/pages/AdminPanel.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from '@mui/material';

const AdminPanel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: isMobile ? '5rem' : '7rem', // 👈 suficiente espacio
        padding: isMobile ? '0.5rem' : '1rem',
      }}
    >
      <Paper
        sx={{
          padding: isMobile ? '1rem' : '2rem',
          backgroundColor: '#df977fff', // rojo oscuro como tu navbar
          color: '#fff', // texto blanco
          borderRadius: '12px', // bordes redondeados
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)', // sombra más marcada
          textAlign: 'center', // centra el contenido
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, fontFamily: '"Fredoka", sans-serif' }}
        >
          Panel de Administración
        </Typography>
        <Typography variant="body1">
          Aquí puedes gestionar los clientes, reservas y cabañas.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AdminPanel;
