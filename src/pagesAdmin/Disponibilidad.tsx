import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { FormControl, Select, MenuItem } from '@mui/material';
import '../components/CalendarStyles.css';

interface Cabana {
  id: string;
  nombre: string;
}

interface Reserva {
  id: string;
  fechaEntrada: Date;
  fechaSalida: Date;
}

const Disponibilidad: React.FC = () => {
  const [cabanas, setCabanas] = useState<Cabana[]>([]);
  const [cabanaSeleccionada, setCabanaSeleccionada] = useState<string>('');
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const obtenerCabanas = async () => {
      const cabanasRef = collection(db, 'cabanas');
      const querySnapshot = await getDocs(cabanasRef);
      const cabanasData: Cabana[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre || 'Sin Nombre',
      }));
      console.log('Cabañas obtenidas:', cabanasData);
      setCabanas(cabanasData);
    };
    obtenerCabanas();
  }, []);

  useEffect(() => {
    const obtenerReservas = async () => {
      if (!cabanaSeleccionada) return;

      const reservasRef = collection(db, 'reserva');
      const q = query(reservasRef, where('cabanaId', '==', cabanaSeleccionada));
      const querySnapshot = await getDocs(q);

      const reservasData: Reserva[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          fechaEntrada: data.fechaEntrada
            ? data.fechaEntrada.toDate()
            : new Date(),
          fechaSalida: data.fechaSalida
            ? data.fechaSalida.toDate()
            : new Date(),
        };
      });

      console.log(
        'Reservas obtenidas para',
        cabanaSeleccionada,
        ':',
        reservasData,
      );
      setReservas(reservasData);
    };

    obtenerReservas();
  }, [cabanaSeleccionada]);

  const eventos = reservas.map((reserva) => {
    console.log('Procesando evento:', reserva);
    return {
      title: 'Reservado',
      start: reserva.fechaEntrada.toISOString().split('T')[0],
      end: reserva.fechaSalida.toISOString().split('T')[0],
      color: 'red',
      allDay: true,
    };
  });

  console.log('Eventos generados:', eventos);

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          textDecoration: 'underline',
          color: '#4c473aff',
          marginTop: '-45px',
        }}
      >
        Disponibilidad de Cabañas
      </Typography>
      <Box mt={3}>
        <FormControl
          margin="normal"
          variant="outlined"
          sx={{
            width: '300px',
            mx: 'auto',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <Select
            value={cabanaSeleccionada}
            onChange={(e) => setCabanaSeleccionada(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span
                    style={{
                      color: '#211d1dff',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    Selecciona una cabaña
                  </span>
                );
              }
              const cabana = cabanas.find((c) => c.id === selected);
              return cabana ? cabana.nombre : '';
            }}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: '#fdf7f2',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              '& .MuiSelect-select': {
                padding: '10px 14px',
              },
              '& fieldset': {
                border: 'none',
              },
              '&:hover': {
                borderColor: '#888',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#f8eedfff',
                },
              },
            }}
          >
            {cabanas.map((cabana) => (
              <MenuItem key={cabana.id} value={cabana.id}>
                {cabana.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {cabanaSeleccionada && (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            height="auto"
          />
        </div>
      )}
    </div>
  );
};

export default Disponibilidad;
