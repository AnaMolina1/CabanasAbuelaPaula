// src/pages/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore'; // 🔹 Firestore
import { db } from '../firebase/firebaseConfig'; 
import { Reserva } from '../types/reserva'; // 🔹 Importa tu tipo
import { Card, CardContent } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


const AdminPanel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 🔹 Estado para las reservas pendientes
  const [pendientes, setPendientes] = useState<number>(0);

useEffect(() => {
  const fetchPendientes = async () => {
    try {
      const reservasCollection = collection(db, 'reserva');
      const snapshot = await getDocs(reservasCollection);

      const reservas = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Reserva, 'id'>;
        return {
          id: doc.id,
          ...data,
          estado: data.estado ? String(data.estado) : '', // ✅ sin toLowerCase
        } as Reserva;
      });

const pendientesCount = reservas.filter(
  (r) => r.estado !== 'Confirmada' // todo lo demás cuenta como pendiente
).length;

      setPendientes(pendientesCount);
    } catch (error) {
      console.error('Error al obtener reservas pendientes:', error);
    }
  };

  fetchPendientes();
}, []);


  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: isMobile ? '0rem' : '0rem', // un poco más arriba
        padding: isMobile ? '0.5rem' : '1rem',
      }}
    >
     
     {/* 📌 Cartel principal */}
<Paper
  sx={{
    padding: { xs: '1.5rem', md: '3rem' }, // 🔹 más padding en desktop
    backgroundColor: '#aba38dff',
    color: '#14180eff',
    //borderRadius: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    mb: 3,
    textAlign: 'center', // 🔹 centra todo el texto
  }}
>
 

  <Typography
  variant={isMobile ? 'body1' : 'h4'}
  sx={{
    display: 'block',
    fontSize: { xs: '1.8rem', sm: '1rem', md: '2rem' }, 
  }}
>
  Aquí puedes gestionar los clientes, reservas y cabañas.
</Typography>
</Paper>


      {/* 📊 Card de estadísticas de reservas pendientes */}
      <Card
        className="mx-auto"
          sx={{
      width: 160,
    height: 180,
    //marginLeft: 'auto',
    //marginRight: { xs: 7, md: 21 }, // 🔹 distinto según tamaño
   
    borderRadius: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center', // 🔹 centra el texto horizontal
  }}
      >
        <CardContent>
          <Typography
  variant="h6"
  sx={{
    fontWeight: 600,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 🔹 centra ícono y texto juntos
    gap: 1, // 🔹 espacio entre ícono y texto
  }}
>
  <WarningAmberIcon
    sx={{ color: theme.palette.warning.main, fontSize: 28 }}
  />
  Reservas pendientes
</Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', color: theme.palette.warning.main, mt: 1 }}
          >
            {pendientes}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminPanel;
