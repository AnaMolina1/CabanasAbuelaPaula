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
        marginTop: isMobile ? '0.5rem' : '1rem', 
        padding: isMobile ? '0.5rem' : '1rem' 
      }}
    >
      <Paper sx={{ padding: isMobile ? '1rem' : '2rem' }}>
        <Typography variant="h5" gutterBottom>
          Panel de Administración
        </Typography>
        <Typography variant="body1">
          Aquí puedes gestionar reservas y cabañas.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AdminPanel;
